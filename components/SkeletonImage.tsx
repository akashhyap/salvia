import React from 'react';

const skeletonStyle = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'loading 1.5s infinite',
};

const SkeletonImage = () => (
  <div
    className='relative h-full w-full mb-10 flex'
    style={{ ...skeletonStyle, height: '200px' }}
  ></div>

);

export default SkeletonImage;
