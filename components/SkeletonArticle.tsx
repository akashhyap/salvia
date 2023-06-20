import React from 'react';

const skeletonStyle = {
  background: 'linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%)',
  backgroundSize: '200% 100%',
  animation: 'loading 1.5s infinite',
};

const SkeletonArticle = () => (
  <section className="text-gray-600 body-font">
    <div className="container mx-auto flex px-5 py-14 items-center justify-center flex-col">
      <div 
        className='relative h-40 md:h-96 w-full mb-10' 
        style={{...skeletonStyle, height: '100%'}}
      ></div>
      <div className="lg:w-2/3 w-full">
        <div 
          className="title-font sm:text-4xl text-3xl mb-4 px-6 xl:px-0 font-medium text-gray-900" 
          style={{...skeletonStyle, height: '20px', width: '50%', margin: '20px 0'}}
        ></div>
        <div style={{...skeletonStyle, height: '15px', margin: '10px 0'}}></div>
        <div style={{...skeletonStyle, height: '15px', margin: '10px 0'}}></div>
        <div style={{...skeletonStyle, height: '15px', margin: '10px 0'}}></div>
      </div>
    </div>
  </section>
);

export default SkeletonArticle;
