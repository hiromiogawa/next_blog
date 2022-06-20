import { client } from "../../../libs/client";
import { PER_PAGE } from '../../../components/Pagination';
import { PageList } from '../../../components/PageList';
import { range } from '../../../modules/utils';
import type { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import { blogsTypes } from '../../../types/types';

interface props extends blogsTypes {
    totalCount: number
    currentPage: number
}

// pages/blog/[id].js
export default function BlogPageId({ contents, totalCount, currentPage }: props) {
    return (
    <main>
        <PageList contents={contents} totalCount={totalCount} currentPage={currentPage} />
    </main>
    );
}

interface paramsTypes extends ParsedUrlQuery {
    id: string
}


// 動的なページを作成
export const getStaticPaths = async () => {
    const repos = await client.get({ endpoint: "blogs" });

    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);

    return { paths, fallback: false };
};

// データを取得
export const getStaticProps: GetStaticProps<blogsTypes, paramsTypes> = async (context) => {
    const id = context.params!.id;

    const data = await client.get({ endpoint: "blogs", queries: { offset: (Number(id) - 1) * PER_PAGE, limit: PER_PAGE } });

    return {
        props: {
            contents: data.contents,
            totalCount: data.totalCount,
            currentPage: id
        },
    };
};