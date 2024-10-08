import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import CustomToastMessage from '~/components/CustomToastMessage';
import { request } from '~/utils/request';
import Pagination from '~/utils/Pagination';
import style from './ComboList.module.scss';
import SearchBox from '~/components/SearchBox';
import ComboItem from '../ComboItem';
import AddCombo from '../AddCombo';

const cx = classNames.bind(style);

function ComboList() {
    useEffect(() => {
        document.title = 'Danh sách combo món ăn';
    }, []);
    const [data, setData] = useState(null);
    const [totalRows, setTotalRows] = useState(0);
    const perPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const fetchDataApi = async (page, size) => {
        try {
            const response = await request('get', `/combos/find-all?page=${page - 1}&size=${size}`);
            const data = await response.data;
            return {
                data: data.content,
                totalPage: data.totalPage,
                totalElements: data.totalElements,
                currentPage: data.pageable.pageNumber,
                pageSize: data.pageable.pageSize,
            };
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchDataApi(currentPage, perPage); // Thêm await để đợi kết quả từ fetchDataApi
            if (result) {
                setData(result.data || []); // Đặt giá trị mặc định là mảng rỗng
                setTotalRows(result.totalElements || 0);
                setCurrentPage(result.currentPage + 1); // Cộng thêm 1 vì result.currentPage bắt đầu từ 0
            }
        };

        fetchData(); // Gọi hàm async trong useEffect
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const callApiSearch = async (value) => {
        try {
            const response = await request('get', `combos/search?page=0&size=5&query=${value}`);
            const dataResponse = await response.data;
            if (dataResponse !== null) {
                setData(dataResponse.content);
            }
        } catch (error) {
            CustomToastMessage.error(error.response?.data);
        }
    };

    return (
        <div className="container">
            <div className={cx('header')}>
                <AddCombo />
                <SearchBox placeholder="Nhập tên combo món ăn" apiSearch={callApiSearch} />
            </div>
            <div className="row">
                {data != null ? (
                    data.map((combo) => (
                        <div className={`col-md-4 ${data.length < 3 ? 'm-5' : ''}`} key={combo.code}>
                            {' '}
                            {/* Sử dụng code để làm key */}
                            <ComboItem combo={combo} />
                        </div>
                    ))
                ) : (
                    <div>Không có combo món ăn nào</div> // Hiển thị thông báo khi không có dữ liệu
                )}
            </div>
            <Pagination
                currentPage={currentPage - 1}
                totalPages={Math.ceil(totalRows / perPage)}
                onPageChange={(page) => handlePageChange(page + 1)}
            />
        </div>
    );
}

export default ComboList;
