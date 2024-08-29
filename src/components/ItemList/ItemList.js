import React, { useState, useEffect } from 'react';
import Pagination from '~/utils/Pagination'; // Đảm bảo đường dẫn đúng
import { request } from '~/utils/request';

const ItemsList = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await request('GET', `products?page=${currentPage}&size=${5}`);
                setItems(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };
        fetchItems();
    }, [currentPage]);

    return (
        <div>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li> // Thay đổi dựa trên cấu trúc dữ liệu của bạn
                ))}
            </ul>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
    );
};

export default ItemsList;
