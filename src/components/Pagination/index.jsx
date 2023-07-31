import React from 'react'
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss'


export const Pagination = ({onChangePage}) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            /* onChangePage змінює номер сторінки */
            onPageChange={(event)=>onChangePage(event.selected+1)}
            pageRangeDisplayed={8} /* по 8 на кожнай сторінці */
            pageCount={3} /* кількість сторінок */
            renderOnZeroPageCount={null}
        />
    )
}
