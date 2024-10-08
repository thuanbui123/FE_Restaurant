import { ToastContainer } from 'react-toastify';
import AddCustomer from '~/components/AddCustomer';
import CustomerDataTable from '~/components/CustomerDataTable';
import SearchBox from '~/components/SearchBox';
import classNames from 'classnames/bind';
import style from './AdminCustomer.module.scss';
import { useEffect, useState } from 'react';
import { request } from '~/utils/request';
import CustomToastMessage from '~/components/CustomToastMessage';

const cx = classNames.bind(style);

function AdminCustomer() {
    const [searchResult, setSearchResult] = useState(null);
    useEffect(() => {
        document.title = 'Quản lý khách hàng';
    }, []);

    const callApiSearch = async (value) => {
        try {
            const response = await request('get', `customers/search?page=0&size=5&query=${value}`);
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
                <AddCustomer />
                <SearchBox placeholder="Nhập tên khách hàng" apiSearch={callApiSearch} />
            </div>
            <CustomerDataTable searchData={searchResult} />
            <ToastContainer />
        </>
    );
}

export default AdminCustomer;
