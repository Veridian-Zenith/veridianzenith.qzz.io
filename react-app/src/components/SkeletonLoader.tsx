import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
  rows?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = '', rows = 3 }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {/* Header Skeleton */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="rounded-full bg-amber-200 h-8 w-8"></div>
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-amber-200 rounded w-3/4"></div>
          <div className="h-3 bg-amber-100 rounded w-1/2"></div>
        </div>
      </div>

      {/* Card Grid Skeleton */}
      <div className="projects-grid">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-glass rounded-lg p-6 border border-amber-200">
            {/* Image Skeleton */}
            <div className="h-48 bg-amber-200 rounded mb-4"></div>

            {/* Tech Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mb-3">
              {[...Array(3)].map((_, tagIndex) => (
                <div key={tagIndex} className="h-6 bg-amber-100 rounded-full w-16"></div>
              ))}
            </div>

            {/* Title Skeleton */}
            <div className="h-6 bg-amber-200 rounded mb-2"></div>

            {/* Description Skeleton */}
            <div className="space-y-2 mb-4">
              {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex} className={`h-4 bg-amber-100 rounded ${rowIndex === rows - 1 ? 'w-3/4' : 'w-full'}`}></div>
              ))}
            </div>

            {/* Meta Skeleton */}
            <div className="flex justify-between items-center">
              <div className="h-5 bg-amber-200 rounded w-20"></div>
              <div className="h-5 bg-amber-100 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
