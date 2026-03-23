import React from 'react';
import { Skeleton } from './ui/skeleton';

interface ProjectSkeletonProps {
  count?: number;
}

const ProjectSkeleton: React.FC<ProjectSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="projects-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="project-card animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <Skeleton className="h-[200px] w-full rounded-t-lg rounded-b-none" />
          <div className="p-6 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-14 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectSkeleton;
