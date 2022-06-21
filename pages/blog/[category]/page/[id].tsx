import { client } from '../../../../libs/client'
import { PER_PAGE } from '../../../../components/Pagination'
import { PageList } from '../../../../components/PageList'
import { range } from '../../../../modules/utils'
import type { GetStaticProps, GetStaticPaths } from 'next'
import { blogsTypes, categoryType } from '../../../../types/types'

interface props extends blogsTypes {
    totalCount: number
    currentPage: number
}

export default function BlogCategoryPageList({ contents, totalCount, currentPage }: props) {
    return (
    <main>
        <PageList contents={contents} totalCount={totalCount} currentPage={currentPage} />
    </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {    
    const resCategory = await client.get({endpoint: 'categories'})

    const resPaths = await Promise.all(
        resCategory.contents.map((category: categoryType) => {
            const result = client
            .get({
                endpoint: 'blogs',
                queries: {
                    filters: `category[equals]${category.id}`
                }
            })
            .then(({ totalCount }) => {
                return range(1, Math.ceil(totalCount / PER_PAGE)).map((repo) => `/blog/${category.id}/page/${repo}`
                )
            })
    
            return result
        })
    )
    const paths = resPaths.flat()
    return { paths, fallback: false }
}


// データを取得
export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context

    const id = params!.id

    const data = await client.get({
        endpoint: 'blogs',
        queries: { 
            limit: PER_PAGE, 
            offset: (Number(id) - 1) * PER_PAGE,
            filters: `category[equals]${params!.category}`
        }
    })

    return {
        props: {
            contents: data.contents,
            totalCount: data.totalCount,
            currentPage: id,
            currentCategory: params!.category
        }
    }
}
