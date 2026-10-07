
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import navLogo from '../assets/logo-icon.png'
import { Icategories, IcategoryProducts } from '@/type';
import NavCategory from './Nav-Category';


import MarqueeText from 'react-marquee-text';


const getAllProducts = async()=>{
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products')
    const data:IcategoryProducts[] = await res.json()
    return data
}


const getCategories =async()=>{
const res = await fetch('https://api.api-store.workers.dev/api/bazardor/categories')
const data:Icategories[] = await res.json()
return data
}


const Navbar = async() => {
    const date =  new Date().toLocaleDateString("bn-BD",{
        dateStyle:"full"
    })

    const catagories = await getCategories()
    const allProducts = await getAllProducts()

    return (
        <div>
            {/*------------ navbar -------------------*/}
            <header className="relative z-20 w-full bg-[#f8faf9] border-b border-gray-100 px-4 py-3 shadow-sm sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo & Title Section */}
       <Link href={'/'}>
        <div className="flex items-center space-x-3">
          {/* Logo Container */}
          <div className="relative w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
            {/* Replace /logo.png with your logo file path */}
            <Image
              src={navLogo}
              alt="বাজার দর"
              width={28}
              height={28}
              className="object-contain"
            />
          </div>

          {/* Title & Date */}
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              বাজার দর
            </h1>
            <span className="text-xs text-gray-500 font-medium mt-0.5">
                {date}
              
            </span>
          </div>
        </div>
       </Link>

        {/* Right Side: Navigation Buttons */}
        <div className="hidden items-center space-x-6 md:flex">
          <Link
            href="/sign-in"
            className="text-gray-900 hover:text-green-700 font-semibold text-sm transition-colors"
          >
            সাইন ইন
          </Link>
          <Link
            href="/sign-up"
            className="bg-[#008a45] hover:bg-[#00753a] text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all"
          >
            সাইন আপ
          </Link>
        </div>

      </div>
      <hr className='text-gray-100 mt-4' />

      {/* ----------------categories------------------- */}
    <div className='hidden md:flex bg-[#f8faf9] gap-5 max-w-7xl mx-auto mt-4 flex-wrap'>
        {
        catagories.map(category => <NavCategory key={category.id} category={category}></NavCategory>)
    }
    </div>

    {/* ----------------mobile navigation------------------- */}
    <div className="mt-4 flex gap-3 md:hidden">
      <details className="relative flex-1">
        <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm">
          অ্যাকাউন্ট
        </summary>
        <div className="absolute left-0 top-full z-50 mt-2 flex w-full min-w-36 flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <Link
            href="/sign-in"
            className="px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            সাইন ইন
          </Link>
          <Link
            href="/sign-up"
            className="px-4 py-3 text-sm font-semibold text-white bg-[#008a45] hover:bg-[#00753a]"
          >
            সাইন আপ
          </Link>
        </div>
      </details>

      <details className="relative flex-1">
        <summary className="flex cursor-pointer list-none items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm">
          ক্যাটাগরি
        </summary>
        <div className="absolute right-0 top-full z-50 mt-2 flex max-h-72 w-full min-w-44 flex-col overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {catagories.map(category => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              <span className="mr-2">{category.icon}</span>
              {category.nameBn}
            </Link>
          ))}
        </div>
      </details>
    </div>
    </header>
    
    {/*------------ marquee ------------------*/}
    <div className="bg-gray-50 border-y border-gray-200 py-2">
  <MarqueeText direction="right" duration={15}>
    <div className="flex items-center gap-6 px-4">
      {allProducts.map((ap) => {
       
        return (
          <div 
            key={ap.id} 
            className="flex items-center gap-2 whitespace-nowrap border-r border-gray-200 pr-6 last:border-r-0"
          >
            {/* Icon/Image */}
            <span className="text-lg">{ap.image}</span>
            
            {/* Maqaa fi Gatii */}
            <span className="font-medium text-gray-800">
              {ap.nameBn} {ap.today} টাকা/{ap.unit}
            </span>

            {/* Jijjiirama (Change Direction & Percentage) */}
            <div className={`flex items-center text-sm font-semibold ${ap.change?.dir ==="up" ? 'text-red-600' : 'text-emerald-600'}`}>
              <span className="mr-1">{ap.change?.dir === "up"? '▲' : ap.change?.dir === "down"? '▼':''}</span>
              <span>{ap.change?.pct}%</span>
            </div>
          </div>
        );
      })}
    </div>
  </MarqueeText>
</div>
        </div>
    );
};

export default Navbar;
