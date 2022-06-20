import Link from "next/link";
import { client } from "../libs/client";
import { PageList } from "../components/PageList";
import { blogsTypes } from '../types/types'
import { PER_PAGE } from '../components/Pagination';

interface props extends blogsTypes{
  totalCount: number
  categories: [{
    id: number
    name: string
  }]
} 


export default function Home({contents, totalCount, categories}: props) {
  
  return (
    <main>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <Link href={`/blog/${category.id}/page/1`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <PageList contents={contents} totalCount={totalCount} currentPage={1} />
    </main>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ 
    endpoint: 'blogs',
    queries: {limit: PER_PAGE}
  });
  const categoryData = await client.get({endpoint: 'categories'})

  return {
    props: {
      contents: data.contents,
      totalCount: data.totalCount,
      categories: categoryData.contents
    },
  };
};
