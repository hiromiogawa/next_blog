import { client } from "../../../libs/client";
import type { GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'node:querystring'
import { blogTypes, blogsTypes } from '../../../types/types'

interface props extends blogTypes {}

export default function BlogId({ blog }: props) {
    return (
    <main>
        <h1>{blog.title}</h1>
        <p>{blog.publishedAt}</p>
        <div
        dangerouslySetInnerHTML={{
            __html: `${blog.content}`,
        }}
        />
    </main>
    );
}

interface paramsTypes extends ParsedUrlQuery {
    id: string
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
    const data: blogsTypes = await client.get({ endpoint: 'blogs' })
    const paths = data.contents.map((content) => `/blog/${content.category.id}/${content.id}`)
    return { paths, fallback: false }
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps: GetStaticProps<blogTypes, paramsTypes> = async (context) => {
    const data = await client.get({ endpoint: 'blogs', contentId: context.params!.id });
    return {
        props: {
            blog: data,
        },
    };
};