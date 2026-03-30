import React from 'react';

export function Skeleton({ className, variant = 'rect' }) {
  const baseStyles = "bg-slate-200 animate-pulse rounded-lg";
  const variants = {
    rect: "h-4 w-full",
    circle: "h-12 w-12 rounded-full",
    text: "h-3 w-3/4",
    title: "h-8 w-1/2"
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 p-4">
      <div className="flex gap-4 items-center">
        <Skeleton variant="circle" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="title" />
          <Skeleton variant="text" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
      <Skeleton className="h-64" />
    </div>
  );
}
