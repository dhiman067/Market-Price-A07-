import { IcategoryProducts } from '@/type';
import Link from 'next/link';
import React from 'react';

const getProductDetails = async(id:number)=>{
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${id}`)
    const data:IcategoryProducts = await res.json()
    return data
}

const ProductDetailsPage = async({params}:{ params: Promise<{ id: number }> } ) => {
const {id} = await params
const productDetails = await getProductDetails(id)


 const changeDirection = productDetails.change?.dir;
    const changeStyle = changeDirection === 'up'
        ? ' text-red-700'
        : changeDirection === 'down'
            ? 'text-emerald-700'
            : 'bg-gray-100 text-gray-600';
    const changeIcon = changeDirection === 'up'
        ? '▲'
        : changeDirection === 'down'
            ? '▼'
            : '•';


    return (
        <div className='w-full max-w-7xl mx-auto'>
           <div className='py-10'>
             <p>
               <Link href={'/'}>হোম</Link>  {'>'}  <Link href={`/category/${productDetails.category}`}>{productDetails.categoryNameBn}</Link> {'>'} {productDetails.nameBn}
            </p>
           </div>

           <div>
            <div className="w-full bg-[#f8faf8] border border-[#e6ebe6] rounded-2xl p-5 md:p-6 flex items-center justify-between shadow-sm">
      
      {/* Left Section: Icon, Title, Subtitle, & Trend Message */}
      <div className="flex items-center gap-4 md:gap-5">
        {/* Product Emoji / Icon Box */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#edf2ed] rounded-2xl flex items-center justify-center text-3xl md:text-4xl flex-shrink-0">
          {productDetails.image}
        </div>

        {/* Text Information */}
        <div className="flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {productDetails.nameBn}
          </h2>
          
          <span className="text-sm md:text-base text-gray-500 font-medium mt-0.5">
            প্রতি কেজি · {productDetails.categoryNameBn}
          </span>

          <span className="text-xs md:text-sm text-gray-500 font-normal mt-1.5">
            গতকালের তুলনায় আজ দাম <span className='font-bold'>বেড়েছে {productDetails.change?.pct}%</span>
          </span>
        </div>
      </div>

      {/* Right Card: Today's Price Info */}
      <div className="bg-[#edf2ed] rounded-2xl px-6 py-4 flex flex-col items-center justify-center min-w-[130px] md:min-w-[150px]">
        <span className="text-xs md:text-sm font-medium text-gray-600">
          আজকের দাম
        </span>
        
        <span className="text-3xl md:text-4xl font-extrabold text-gray-900 my-1">
          {productDetails.today}
        </span>
        
        <span className="text-xs md:text-sm text-gray-500 font-medium">
          টাকা / কেজি
        </span>

        {/* Dynamic Percentage Indicator */}
        <div className={`flex items-center gap-1 text-xs md:text-sm font-bold mt-1 ${changeStyle}`}>
          <span>{changeIcon}</span>
          {productDetails.change?.pct}%
        </div>
      </div>

    </div>
           </div>
        </div>
    );
};

export default ProductDetailsPage;