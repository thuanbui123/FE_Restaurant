import { request } from '~/utils/request';
import DataTableWithActions from '~/components/DataTableWithActions';
import CustomToastMessage from '../CustomToastMessage';
import { useEffect, useState } from 'react';

function AccountDataTable({ searchData }) {
    const [tableData, setTableData] = useState(null);
    const excludedKeys = ['createAt', 'updateAt', 'password'];
    const labelEditInput = {
        username: 'Tên đăng nhập',
        role: 'Quyền',
        img: 'Ảnh',
        password: 'Mật khẩu',
        createAt: 'Ngày tạo',
        updateAt: 'Ngày sửa',
    };

    const fetchDataApi = async (page, size) => {
        try {
            const response = await request('get', `/account/get-accounts?page=${page}&size=${size}`);
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
        const response = await request('GET', '/account/find-account-by-id?query=' + value);
        return response.data;
    };

    const customRowAction = (rowData) => {
        console.log('Thông tin tài khoản:', rowData);
        CustomToastMessage.info(`Bạn đã chọn tài khoản: ${rowData.name}`);
    };

    const columns = [
        {
            name: 'Mã tài khoản',
            cell: (row) => row.id,
            width: '110px',
        },
        {
            name: 'Tên đăng nhập',
            cell: (row) => row.username,
            width: '150px',
            // sortable: true,
        },
        {
            name: 'role',
            cell: (row) => row.role,
            width: '150px',
        },
        {
            name: 'Ngày tạo',
            cell: (row) => row.createdAt,
            width: '130px',
        },
        {
            name: 'Hành động',
        },
    ];

    const updateDataApi = async (account) => {
        try {
            console.log(account);
            const response = await request(
                'PUT',
                `http://localhost:8080/api-restaurant/account/update/${account.id}`,
                account,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteDataApi = async (value) => {
        try {
            const response = await request('delete', `http://localhost:8080/api-restaurant/account/delete/${value}`);
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
            primaryKey="id"
            labelEditInput={labelEditInput}
            excludedKeys={excludedKeys}
            searchData={tableData}
        />
    );
}

export default AccountDataTable;
