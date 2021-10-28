import React from 'react';
import '../styles/Pagination.css';

export function paginate(data, itemsPerPage, currentPage) {
    return data.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage)
}

export function Pagination({ data,  itemsPerPage, maxPages, verbose, minimal, currentPage, onPageChange }) {

    let pagesToShow = maxPages;

    if (data.length <= itemsPerPage) {return null;}
    const pageNum = Math.ceil(data.length / itemsPerPage);

    if (pagesToShow % 2 === 0) {
        pagesToShow++;
    }
   
    if (pagesToShow > pageNum) {
        pagesToShow = pageNum;
    }

    const getStartPage = (currentPage) => {
        let start = pageNum <= pagesToShow ? 0 : Math.max(currentPage - ((pagesToShow - 1) / 2), 0);
        if (currentPage + ((pagesToShow - 1) / 2) > pageNum - 1) {start = pageNum - pagesToShow};
        return start;
    }
    const pageArray = [...Array(pageNum + 1).keys()].slice(1);

    return (
        <div className="page-button-container" style={minimal ? {width: '100%'} : null}>
            {pageNum > 5 ? <button id="first" disabled={currentPage === 0 ? true : false} className={currentPage === 0 ? "page-button disabled" : "page-button"} onClick={onPageChange}>{verbose === "yes" ? "First Page" : "<<"}</button> : null}
            {pageNum > 1 ? <button id="previous" className={currentPage === getStartPage(currentPage) ? "page-button disabled" : "page-button"} type="button" onClick={onPageChange} disabled={currentPage === getStartPage(currentPage) ? true : false}>{verbose === "yes" ? "Previous Page" : "<"}</button> : null}
            {minimal === false ? pageArray.slice(getStartPage(currentPage), getStartPage(currentPage) + pagesToShow).map((x,i)=><button className={currentPage === Number(x) - 1 ? "page-button disabled current-page" : "page-button"} key={i} onClick={onPageChange} disabled={currentPage === Number(x) - 1 ? true : false}>{x}</button>) : <div style={{minWidth: "40px", flexGrow: 1}}></div>}
            {pageNum > 1 ? <button id="previous" className={currentPage === getStartPage(currentPage) + pagesToShow - 1 ? "page-button disabled" : "page-button"} type="button" onClick={onPageChange} disabled={currentPage === getStartPage(currentPage) + pagesToShow - 1 ? true : false}>{verbose === "yes" ? "Next Page" : ">"}</button> : null}
            {pageNum > 5 ? <button id="last" disabled={currentPage === pageNum - 1 ? true : false} className={currentPage === pageNum - 1 ? "page-button disabled" : "page-button"} onClick={onPageChange}>{verbose === "yes" ? "Last Page" : ">>"}</button> : null}
        </div>
    )

}
