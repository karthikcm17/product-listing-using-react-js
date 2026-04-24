import React, { useState } from 'react'
import { products } from './data'
import ProductCard from './components/ProductCard'

function App() {
  const [cart, setCart] = useState([])
  const [category, setCategory] = useState("All")
  const [availability, setAvailability] = useState("All")

  const handleAdd = (item) => setCart([...cart, item])
  const handleRemove = (id) => setCart(cart.filter(i => i.id !== id))
  const isInCart = (id) => cart.some(i => i.id === id)

  const filtered = products.filter(p => {
    const categoryMatch = category === "All" || p.category === category;
    const stockMatch = availability === "All" ? true :
      availability === "Available" ? p.inStock : !p.inStock;
    return categoryMatch && stockMatch;
  })

  const totalPrice = cart.reduce((total, item) =>
    total + parseFloat(item.price.replace(/,/g, '')), 0
  ).toLocaleString('en-IN');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-slate-900">

      <nav className="w-full bg-white border-b border-slate-100 px-4 md:px-10 py-4 flex justify-between items-center sticky top-0 z-[60]">
        <div className="flex items-center gap-4 md:gap-10">
          <h1 className="text-lg md:text-2xl font-black tracking-tighter text-indigo-700">MATHURA HYPERMART</h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4 text-l font-bold">
          <a href="#" className="hover:text-indigo-600">Home</a>
          <a href="#shop" className="hover:text-indigo-600">Shop</a>
          <a href="#contact" className="hover:text-indigo-600">Contact</a>
        </div>
      </nav>

      <header className="relative w-full h-[150px] md:h-[300px] bg-slate-900 overflow-hidden flex items-center">
        <div className="absolute inset-0 opacity-40">
          <img src="assets/main.jpg" className="w-full h-full object-cover" alt="Hero" />
        </div>
        <div className="relative z-10 px-6 md:px-20 max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">Upgrade Your <br /> Living</h2>
          <a href="#shop" className="inline-block px-6 py-3 md:px-10 md:py-4 bg-white text-slate-900 font-bold rounded-full text-sm">Shop Now</a>
        </div>
      </header>

      <section id="shop" className="flex flex-col bg-slate-50 border-t border-slate-200">

        <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 md:py-6 sticky top-[53px] md:top-[65px] z-50 shadow-sm">
          <div className="px-4 md:px-10 flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 overflow-x-auto no-scrollbar w-full lg:w-auto shadow-inner">
              <div className="flex flex-nowrap gap-1">
                {["All", "Furniture", "Accessories", "Electronics"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-500 ease-out ${category === cat
                        ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-[0_4px_15px_rgba(79,70,229,0.4)] scale-105"
                        : "text-slate-500 hover:text-indigo-600 hover:bg-white/50"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative group w-full md:w-64">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Filter</span>
              </div>
              <select
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full pl-16 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[11px] font-bold text-slate-700 outline-none appearance-none cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all shadow-sm"
              >
                <option value="Available"></option>
                <option value="Available">✓ In Stock</option>
                <option value="SoldOut">✕ Out of Stock</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-auto lg:h-[800px] overflow-hidden">

          <aside className="w-full lg:w-80 bg-white border-b lg:border-r border-slate-200 flex flex-col order-2 lg:order-1">
            <div className="p-6 border-b sticky top-0 bg-white z-10">
              <button disabled={cart.length === 0} className="w-full py-4 bg-slate-900 text-white text-sm font-black rounded-2xl uppercase tracking-[0.2em]">
                Pay : ₹{totalPrice}
              </button>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
              <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest">Bag ({cart.length})</h3>
            </div>
            <div className="flex-1 lg:overflow-y-auto px-6 pb-6 space-y-4 max-h-[300px] lg:max-h-full">
              {cart.length === 0 ? (
                <div className="h-20 flex flex-col items-center justify-center opacity-50"><p className="text-sm font-bold uppercase">Empty</p></div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center bg-slate-50 border border-slate-100 p-3 rounded-2xl">
                    <p className="text-sm font-black text-slate-600 ">{item.name}</p>
                    <button onClick={() => handleRemove(item.id)} className="h-6 w-6 flex items-center justify-center rounded-lg text-bold">❌</button>
                  </div>
                ))
              )}
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-4 md:p-10 order-1 lg:order-2">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={handleAdd} onRemove={handleRemove} added={isInCart(p.id)} />
                ))}
              </div>
            </div>
          </main>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-10 px-6 md:px-20">
          <p className="text-l text-slate-500 font-bold tracking-widest">© 2026 Mathura Hypermart Collections.</p>
      </footer>

    </div>
  )
}

export default App