import Link from "next/link";

const NotFound = () => {
    return (
        <main className="flex min-h-[60vh] w-full items-center justify-center px-4 py-12 sm:px-6">
            <section className="w-full max-w-xl rounded-3xl border border-[#e1e9e2] bg-white px-6 py-10 text-center shadow-lg shadow-green-950/5 sm:px-12 sm:py-14">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#008a45]">ত্রুটি ৪০৪</p>
                <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">পাতাটি খুঁজে পাওয়া যায়নি</h1>
                <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
                    আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, নাম পরিবর্তন করা হয়েছে, অথবা ঠিকানাটি ভুল।
                </p>
                <Link
                    href="/"
                    className="mt-8 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#008a45] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#00763b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008a45]"
                >
                    হোম পেজে ফিরে যান
                </Link>
            </section>
        </main>
    );
};

export default NotFound;