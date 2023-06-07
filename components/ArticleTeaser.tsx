import Image from "next/image";
import Link from "next/link";
import { render } from 'storyblok-rich-text-react-renderer';

// @ts-ignore
const ArticleTeaser = ({ article, slug }) => {
  console.log("article", article);

  return (
    <div className="column feature">
      <Link href={slug} legacyBehavior>
        <a>
          <figure className="relative overflow-hidden rounded-xl mb-4">
            <Image
              src={article.image.filename}
              alt={article.title}
              layout="responsive"
              width={11}
              height={6}
              objectFit="cover"
              className="object-center"
            />
          </figure>
        </a>
      </Link>
      <h2 className="mx-auto mb-6 text-xl font-semibold leading-snug tracking-tighter">
        {article.title}
      </h2>
      <div>
        {render(article?.metatags?.description)}
      </div>
      <div>
        <Link href={slug}>
          <a
            className="inline-flex items-center mt-4 font-semibold border-b border-gray-900 text-gray-900 lg:mb-0 hover:text-gray-700"
            title="read more"
          >
            Read More »
          </a>
        </Link>
      </div>
    </div>
  )
};
export default ArticleTeaser;