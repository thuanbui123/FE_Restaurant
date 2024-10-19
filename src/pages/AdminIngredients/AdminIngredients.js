import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames/bind';
import CustomToastMessage from '~/components/CustomToastMessage';
import SearchBox from '~/components/SearchBox';
import { request } from '~/utils/request';
import styles from './AdminIngredients.module.scss';
import IngredientDataTable from '~/components/IngredientDataTable';
import AddIngredient from '~/components/AddIngredient';

const cx = classNames.bind(styles);

function AdminIngredients() {
    const [searchResult, setSearchResult] = useState(null);
    useEffect(() => {
        document.title = 'Quản lý nguyên liệu';
    }, []);

    const callApiSearch = async (value) => {
        try {
            const response = await request('get', `ingredients/search?page=0&size=5&query=${value}`);
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
                <AddIngredient />
                <SearchBox placeholder="Nhập tên nguyên liệu" apiSearch={callApiSearch} />
            </div>
            <IngredientDataTable searchData={searchResult} />
            <ToastContainer />
        </>
    );
}

export default AdminIngredients;
