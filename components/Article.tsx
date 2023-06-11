import { StoryblokComponent } from '@storyblok/react';
import Image from 'next/image';
import { render } from 'storyblok-rich-text-react-renderer';

// @ts-ignore
const Article = ({ blok }) => {
  // console.log("article", blok.body);

  return (
    <section className="text-gray-600 body-font">
      <div className="container mx-auto flex px-5 py-14 items-center justify-center flex-col">
        <figure className='relative md:h-96 w-full mb-10'>
          <Image
            alt={blok?.image?.alt}
            src={blok?.image?.filename}
            layout='fill'
            objectFit='cover'
            objectPosition='center top'
          />
        </figure>
        <div className="lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            {blok.title}
          </h1>
          {/* @ts-ignore */}
          {blok?.body?.map((nestedBlok) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
          {/* <div className="mb-8 leading-relaxed text-justify">{render(blok.content)}</div> */}
        </div>
      </div>
    </section>
  );
};
export default Article;