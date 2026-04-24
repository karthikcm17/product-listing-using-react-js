import React from 'react'

function ProductCard({ product, onAdd, onRemove, added }) {
  return (
    <div className="bg-white border border-slate-100 rounded-[24px] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group">

      <div className="relative overflow-hidden bg-slate-50 h-56">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/70 backdrop-blur-md text-[9px] font-black tracking-widest text-slate-800 px-3 py-1 rounded-full shadow-sm uppercase">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className={`text-[9px] font-black mb-1 ${product.inStock ? 'text-emerald-500' : 'text-rose-500'}`}>
          {product.inStock ? 'AVAILABLE' : 'SOLD OUT'}
        </div>

        <h4 className="font-bold text-sm text-slate-800 leading-tight mb-1 h-10 line-clamp-2">
          {product.name}
        </h4>

        <p className="text-indigo-700 font-black text-lg mb-4">
          ₹{product.price}
        </p>

        <div className="mt-auto">
          {added ? (
            <button
              onClick={() => onRemove(product.id)}
              className="w-full py-2.5 bg-slate-100 text-rose-500 text-[10px] font-black rounded-xl hover:bg-rose-500 hover:text-white transition-all tracking-widest"
            >
              REMOVE ITEM
            </button>
          ) : (
            <button
              disabled={!product.inStock}
              onClick={() => onAdd(product)}
              className={`w-full py-2.5 text-[10px] font-black rounded-xl transition-all tracking-widest 
                ${product.inStock
                  ? 'bg-slate-900 text-white hover:bg-indigo-600 active:scale-95'
                  : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
            >
              {product.inStock ? 'ADD TO CART' : 'OUT OF STOCK'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard