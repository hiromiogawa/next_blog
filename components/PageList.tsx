import Link from 'next/link';
import { Pagination } from './Pagination';
import { blogsTypes } from '../types/types';
interface props extends blogsTypes {
    totalCount: number
    currentPage: number
}

export const PageList = ({ contents, totalCount, currentPage }: props) => {

    return(
        <>
            <ul>
                {contents.map(blog => (
                    <li key={blog.id}>
                    <Link href={`/blog/${blog.category.id}/${blog.id}`}>
                        <a>
                            
                            {blog.title}
                        </a>
                    </Link>
                    </li>
                ))}
            </ul>
            <Pagination totalCount={totalCount} currentPage={currentPage} />
        </>
    )
}