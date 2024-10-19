import { request } from '~/utils/request';
import DataTableWithActions from '~/components/DataTableWithActions';
import CustomToastMessage from '../CustomToastMessage';
import { useEffect, useState } from 'react';

function IngredientDataTable({ searchData }) {
    const [tableData, setTableData] = useState(null);

    const labelEditInput = {
        code: 'Mã nguyên liệu',
        name: 'Tên nguyên liệu',
        address: 'Địa chỉ',
        img: 'Ảnh',
        quantity: 'Số lượng',
        type: 'Loại nguyên liệu',
        unit: 'Đơn vị',
        supplierId: 'Nhà cung cấp',
    };

    const excludedKeys = ['supplierName', 'slug', 'createAt', 'updateAt', 'img'];

    const fetchDataApi = async (page, size) => {
        try {
            const response = await request('get', `/ingredients/find-all?page=${page}&size=${size}`);
            const data = response.data.body;
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
        const response = await request('GET', `/ingredients/find-one-by-code?query=${value}`);
        return response.data;
    };

    const customRowAction = (rowData) => {
        console.log('Thông tin nguyên liệu:', rowData);
        CustomToastMessage.info(`Bạn đã chọn nguyên liệu: ${rowData.name}`);
    };

    const columns = [
        {
            name: 'Mã nguyên liệu',
            cell: (row) => row.code,
            width: '100px',
        },
        {
            name: 'Hình ảnh',
            cell: (row) => (
                <img src={row.img} alt={row.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            ),
            width: '70px',
        },
        {
            name: 'Tên nguyên liệu',
            cell: (row) => row.name,
            width: '150px',
            // sortable: true,
        },
        {
            name: 'Loại',
            cell: (row) => row.type,
            width: '150px',
        },
        {
            name: 'Số lượng',
            cell: (row) => row.quantity + row.unit,
            width: '150px',
        },
        {
            name: 'Nhà cung cấp',
            cell: (row) => row.supplierName,
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

    const updateDataApi = async (value) => {
        try {
            const response = await request(
                'PUT',
                `http://localhost:8080/api-restaurant/ingredients/update/${value.code}`,
                value,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteDataApi = async (value) => {
        try {
            const response = await request(
                'delete',
                `http://localhost:8080/api-restaurant/ingredients/delete/${value}`,
            );
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

export default IngredientDataTable;
