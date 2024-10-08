import { ToastContainer } from 'react-toastify';
import SearchBox from '~/components/SearchBox';
import classNames from 'classnames/bind';
import style from './AdminAccount.module.scss';
import { useEffect, useState } from 'react';
import { request } from '~/utils/request';
import CustomToastMessage from '~/components/CustomToastMessage';
import AccountDataTable from '~/components/AccountDataTable';
import AddAccount from '~/components/AddAccount';

const cx = classNames.bind(style);

function AdminAccount() {
    const [searchResult, setSearchResult] = useState(null);
    useEffect(() => {
        document.title = 'Quản lý tài khoản';
    }, []);

    const callApiSearch = async (value) => {
        try {
            const response = await request('get', `account/search?page=0&size=5&query=${value}`);
            const data = await response.data;
            if (data !== null) {
                setSearchResult({
                    data: data.content,
                    totalPage: data.totalPage,
                    totalElements: data.totalElements,
                    pageNumber: data.pageable.pageNumber,
                    pageSize: data.pageable.pageSize,
                });
            }
        } catch (error) {
            CustomToastMessage.error(error.response?.data);
        }
    };

    return (
        <>
            <div className={cx('header')}>
                <AddAccount />
                <SearchBox placeholder="Nhập tên đăng nhập" apiSearch={callApiSearch} />
            </div>
            <AccountDataTable searchData={searchResult} />
            <ToastContainer />
        </>
    );
}

export default AdminAccount;
