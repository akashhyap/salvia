import ArticleTeaser from "./ArticleTeaser";

interface ArticlesListProps {
  loadMore: () => void;
  hasMore: boolean;
  isInitialLoadComplete: boolean;
}

// @ts-ignore
const ArticlesBlock: React.FC<ArticlesListProps> = ({ blok, articles, loadMore, hasMore, isInitialLoadComplete }) => {
  return (
    <div className="max-w-7xl mx-auto py-14 px-6 xl:px-0">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-7">{blok.title}</h1>
      <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-3">
        {/* @ts-ignore */}
        {articles.map((article, index) => (
          <ArticleTeaser key={article.uuid} article={article.content} slug={article.full_slug} isPriority={index === 0} />
        ))}
      </div>

      {isInitialLoadComplete && hasMore && <div className="mt-14 text-center">
        <button onClick={loadMore} className="rounded-full bg-gray-900 px-6 py-2.5 text-sm font-semibold text-gray-200 shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">Load more</button>
      </div>}
    </div>
  );
};

export default ArticlesBlock;
