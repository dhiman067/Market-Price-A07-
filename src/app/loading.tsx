const Loading = () => {
    return (
        <div className="flex min-h-[50vh] w-full flex-col items-center justify-center gap-4 px-4 text-center" role="status" aria-live="polite">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#008a45]/20 border-t-[#008a45]" aria-hidden="true" />
            <p className="text-sm font-medium text-gray-600 sm:text-base">লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</p>
        </div>
    );
};

export default Loading;