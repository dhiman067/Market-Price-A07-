'use client'
import { Icategories } from '@/type';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const NavCategory = ({category}:{category:Icategories}) => {
    const pathName = usePathname()
    return (
        <Link href={`/category/${category.slug}`}>
        <div>
            <p className={pathName=== `/category/${category.slug}` ? 'text-green-600 font-bold' : 'text-black'}><span>{category.icon}</span>{category.nameBn}</p>
        </div>
        </Link>
    );
};

export default NavCategory;