'use client';

import React from 'react';
import ContentLoader from 'react-content-loader';

export const SkeletonCarousel: React.FC = ({}) => {
  return (
    <div className="slider__skeleton">
      {Array.from({ length: 3 }).map((_, index) => (
        <ContentLoader
          key={index}
          speed={2}
          backgroundColor="#292929"
          foregroundColor="#333333"
          width="100%"
          height="500px">
          <rect x="0" y="0" rx="3" ry="3" height="500px" width="100%" />
        </ContentLoader>
      ))}
    </div>
  );
};
