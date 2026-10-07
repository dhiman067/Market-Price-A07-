import CategoryProduct from "@/component/Category-Product";
import { Icategories, IcategoryProducts } from "@/type";

const getProductByCategory = async (slug: string) => {
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${slug}`)
    const data: IcategoryProducts[] = await res.json()
    return data

}

const getIndividualCategory = async (slug: string) => {
    const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${slug}`)
    const data = await res.json()
    return data
}

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {

    const { slug } = await params
    const categoryProducts = await getProductByCategory(slug)
    const individualCategory: Icategories = await getIndividualCategory(slug)



    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
            <section className="flex items-center gap-4 rounded-2xl  p-5 shadow-sm bg-white sm:gap-6 sm:p-8">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-4xl shadow-sm ring-1 ring-green-100 sm:h-20 sm:w-20 sm:text-5xl">
                    {individualCategory.icon}
                </div>
                <div className="min-w-0">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        {individualCategory.nameBn}
                    </h1>
                    <p className="mt-2 inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                        {categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </section>
            <div className="flex justify-between p-7 items-center">
                <p className="text-2xl text-gray-500">
                    মোট {categoryProducts.length}টি পণ্য দেখানো হচ্ছে
                </p>
                <select defaultValue="Large" className="rounded-2xl select select-lg">
                    <option disabled={true}>Large</option>
                    <option>Large Apple</option>
                    <option>Large Orange</option>
                    <option>Large Tomato</option>
                </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    categoryProducts.map(cp => <CategoryProduct key={cp.id} categoryProduct={cp}></CategoryProduct>)
                }
            </div>
        </main>
    );
};

export default page;