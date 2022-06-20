import Link from 'next/link';
import { range } from '../modules/utils';

export const PER_PAGE = 1;

export const Pagination = ({ totalCount, currentPage }: {totalCount: number, currentPage: number}) => {

    return (
        <ul>
            {
                range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => {
                    if (number === 1) {
                        if (currentPage == 1) {
                            return(
                                <li key={index} className='currentPage'>
                                    <span>{number}</span>
                                </li>
                            )
                        } else {
                            return(
                                <li key={index}>
                                    <Link href={ '/' }>
                                        <a>{number}</a>
                                    </Link>
                                </li>
                            )
                        }
                    } else if (number == currentPage) {
                        return(
                            <li key={index} className='currentPage'>
                                <span>{number}</span>
                            </li>
                        )
                    } else {
                        return(
                            <li key={index}>
                                <Link href={ `/blog/page/${number}`}>
                                <a>{number}</a>
                                </Link>
                            </li>
                        )
                    }
                })
            }
        </ul>
    );
};