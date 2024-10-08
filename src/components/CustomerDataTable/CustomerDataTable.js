import { request } from '~/utils/request';
import DataTableWithActions from '~/components/DataTableWithActions';
import CustomToastMessage from '../CustomToastMessage';
import { useEffect, useState } from 'react';

function CustomerDataTable({ searchData }) {
    const [tableData, setTableData] = useState(null);

    const labelEditInput = {
        code: 'Mã khách hàng',
        name: 'Họ tên',
        email: 'Email',
        phoneNumber: 'Số điện thoại',
        address: 'Địa chỉ',
        img: 'Ảnh',
        accountId: 'Mã tài khoản',
        createAt: 'Ngày tạo',
        updateAt: 'Ngày sửa',
    };

    const excludedKeys = ['accountId', 'createAt', 'updateAt', 'img'];

    const fetchDataApi = async (page, size) => {
        try {
            const response = await request('get', `/customers/find-all?page=${page}&size=${size}`);
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

    const fetchRowDataApi = async (value) => {
        const response = await request('GET', '/customers/find-one-by-code?query=' + value);
        return response.data;
    };

    const customRowAction = (rowData) => {
        console.log('Thông tin khách hàng:', rowData);
        CustomToastMessage.info(`Bạn đã chọn khách hàng: ${rowData.name}`);
    };

    const columns = [
        {
            name: 'Mã khách hàng',
            cell: (row) => row.code,
            width: '110px',
        },
        {
            name: 'Hình ảnh',
            cell: (row) => (
                <img src={row.img} alt={row.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            ),
            width: '70px',
        },
        {
            name: 'Họ tên',
            cell: (row) => row.name,
            width: '150px',
            // sortable: true,
        },
        {
            name: 'Số điện thoại',
            cell: (row) => row.phoneNumber,
            width: '150px',
        },
        {
            name: 'Email',
            cell: (row) => row.email,
            width: '250px',
        },
        {
            name: 'Địa chỉ',
            cell: (row) => row.address,
            width: '150px',
        },
        {
            name: 'Ngày tạo',
            cell: (row) => row.createAt,
            width: '130px',
        },
        {
            name: 'Hành động',
        },
    ];

    const updateDataApi = async (customer) => {
        try {
            const response = await request(
                'PUT',
                `http://localhost:8080/api-restaurant/customers/update/${customer.code}`,
                customer,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteDataApi = async (value) => {
        try {
            const response = await request('delete', `http://localhost:8080/api-restaurant/customers/delete/${value}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    useEffect(() => {
        if (searchData) {
            setTableData({
                data: searchData.data,
                totalElements: searchData.totalElements,
                currentPage: searchData.pageNumber,
                pageSize: searchData.pageSize,
            });
        }
    }, [searchData]);

    return (
        <DataTableWithActions
            columns={columns}
            fetchDataApi={fetchDataApi}
            fetchRowDataApi={fetchRowDataApi}
            updateDataApi={updateDataApi}
            deleteDataApi={deleteDataApi}
            customRowAction={customRowAction}
            primaryKey="code"
            labelEditInput={labelEditInput}
            excludedKeys={excludedKeys}
            searchData={tableData}
        />
    );
}

export default CustomerDataTable;
