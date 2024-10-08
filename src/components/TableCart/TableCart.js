import React from 'react';
import classNames from 'classnames/bind';
import style from './TableCart.module.scss';

const cx = classNames.bind(style);

function TableCart({ table }) {
    const isSelect = table.status === 'Đang phục vụ';
    return (
        <div className={cx('card', ` ${isSelect ? 'selected' : ''}`)}>
            <div className={cx('table-number')}>{table.code}</div>
            <div className={cx('table-status')}>{table.status}</div>
            {isSelect && <div className={cx('checkmark')}>✔</div>}
        </div>
    );
}

export default TableCart;
