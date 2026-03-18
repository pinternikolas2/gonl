import React from 'react';

// Pulse skeleton block
const Pulse = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
);

// JobCard Skeleton
export function JobCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <Pulse className="h-32 mb-4 rounded-xl" />
      <Pulse className="h-5 w-3/4 mb-2" />
      <Pulse className="h-4 w-1/2 mb-1" />
      <Pulse className="h-4 w-2/5 mb-5" />
      <Pulse className="h-14 rounded-xl mb-4" />
      <Pulse className="h-10 rounded-xl" />
    </div>
  );
}

// Timeline Skeleton
export function TimelineSkeleton() {
  return (
    <div className="relative border-l-2 border-slate-100 ml-5 space-y-8">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="relative pl-10">
          <div className="absolute left-0 top-0 -translate-x-[21px] w-10 h-10 rounded-full bg-slate-200 animate-pulse border-4 border-white" />
          <Pulse className="h-6 w-2/3 mb-2" />
          <Pulse className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}

// Page-level Skeleton: for full-page loading
export function PageSkeleton() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
      <Pulse className="h-10 w-2/5 mb-2" />
      <Pulse className="h-6 w-1/3 mb-16" />
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          <TimelineSkeleton />
        </div>
        <div className="w-full md:w-[320px] lg:w-[440px] space-y-4 shrink-0">
          <Pulse className="h-5 w-1/3 mb-4" />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </div>
      </div>
    </div>
  );
}

// Error Banner
export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <p className="text-sm font-medium">{message || 'Něco se pokazilo. Zkuste to znovu.'}</p>
      </div>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="text-sm font-bold text-rose-700 hover:text-rose-900 underline"
        >
          Zkusit znovu
        </button>
      )}
    </div>
  );
}

export default { JobCardSkeleton, TimelineSkeleton, PageSkeleton, ErrorBanner };
