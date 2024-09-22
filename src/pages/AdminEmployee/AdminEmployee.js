import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames/bind';
import AddEmployee from '~/components/AddEmployee';
import CustomToastMessage from '~/components/CustomToastMessage';
import EmployeeDataTable from '~/components/EmployeeDataTable';
import SearchBox from '~/components/SearchBox';
import { request } from '~/utils/request';
import styles from './AdminEmployee.module.scss';

const cx = classNames.bind(styles);

function AdminEmployee() {
    const [searchResult, setSearchResult] = useState(null);
    useEffect(() => {
        document.title = 'Quản lý nhân viên';
    }, []);

    const callApiSearch = async (value) => {
        try {
            const response = await request('get', `employees/search?page=0&size=5&query=${value}`);
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
                <AddEmployee />
                <SearchBox placeholder="Nhập tên nhân viên" apiSearch={callApiSearch} />
            </div>
            <EmployeeDataTable searchData={searchResult} />
            <ToastContainer />
        </>
    );
}

export default AdminEmployee;
