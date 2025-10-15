const ArticleCardSkeleton = ({ className }) => {
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-lg border border-forest-200/30 ${className} animate-pulse bg-white`}
    >
      {/* image */}
      <div className="w-full h-48 md:h-56 lg:h-48 xl:h-60 bg-forest-200" />
      <div className="p-6 space-y-4">
        {/* title */}
        <div className="w-3/4 h-6 rounded-lg bg-forest-200" />
        <div className="w-1/2 h-4 rounded-lg bg-forest-200" />

        {/* caption */}
        <div className="space-y-2">
          <div className="w-full h-4 rounded-lg bg-forest-200" />
          <div className="w-4/5 h-4 rounded-lg bg-forest-200" />
          <div className="w-3/5 h-4 rounded-lg bg-forest-200" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            {/* profile image */}
            <div className="rounded-full w-10 h-10 md:w-12 md:h-12 bg-forest-200" />
            <div className="flex flex-col space-y-2">
              {/* user's name */}
              <div className="w-24 h-3 rounded-lg bg-forest-200" />
              {/* verified status */}
              <div className="w-16 h-3 rounded-lg bg-forest-200" />
            </div>
          </div>

          {/* Like Button & Read Time */}
          <div className="flex items-center gap-3">
            {/* Like Button Skeleton */}
            <div className="w-16 h-8 rounded-xl bg-forest-200" />
            {/* Read Time Skeleton */}
            <div className="w-20 h-8 rounded-xl bg-forest-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCardSkeleton;
