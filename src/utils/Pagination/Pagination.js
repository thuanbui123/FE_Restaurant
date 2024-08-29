import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
        pages.push(i);
    }

    const handlePreviousPage = (e) => {
        e.preventDefault();
        if (currentPage > 0) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = (e) => {
        e.preventDefault();
        if (currentPage < totalPages - 1) {
            onPageChange(currentPage + 1);
        }
    };

    const disabled = cx('disabled');
    const active = cx('active');

    return (
        <div className={cx('center')}>
            <div className={cx('pagination')}>
                <Link to="#" onClick={handlePreviousPage} className={currentPage === 0 ? disabled : ''}>
                    &laquo;
                </Link>
                {pages.map((page) => (
                    <Link
                        to="#"
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={page === currentPage ? active : ''}
                    >
                        {page + 1}
                    </Link>
                ))}

                <Link to="#" onClick={handleNextPage} className={currentPage === totalPages - 1 ? disabled : ''}>
                    &raquo;
                </Link>
            </div>
        </div>
    );
}

export default Pagination;
