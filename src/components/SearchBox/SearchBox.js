import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBox.module.scss';
import { debounce } from 'lodash';

const cx = classNames.bind(styles);

function SearchBox({ placeholder, apiSearch, fetchData }) {
    const [isActive, setIsActive] = useState(false);
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.focus();
        setIsActive(!isActive);
    };

    const handleInputChange = debounce((e) => {
        apiSearch(e.target.value);
    }, 300);

    return (
        <div className={cx('search-group')}>
            <div className={cx('search', { active: isActive })}>
                <input
                    type="text"
                    className={cx('input')}
                    placeholder={placeholder}
                    ref={inputRef}
                    onChange={handleInputChange}
                />
                <button className={cx('custom-btn')} onClick={handleClick}>
                    <i className={cx('bx', 'bx-search', 'icon')}></i>
                </button>
            </div>
        </div>
    );
}

export default SearchBox;
