import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './TableSelectionPage.module.scss';
import TableCart from '~/components/TableCart';
import { request } from '~/utils/request';
import CustomToastMessage from '~/components/CustomToastMessage';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(style);

function TableSelection() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tableBookingId = queryParams.get('table-booking-id');
    const [tables, setTables] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState('Tầng 1');
    const [locations, setLocations] = useState(null);

    useEffect(() => {
        document.title = 'Xếp bàn';
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchDataApi = useCallback(async () => {
        try {
            const response = await request('get', `/tables/get-tables-by-location?query=${selectedLocation}`);
            return response.data;
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    });

    async function fetchLocationApi() {
        try {
            const response = await request('get', `/tables/locations`);
            return response.data;
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchDataApi();
            if (result) {
                setTables(result);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchLocation = async () => {
            const result = await fetchLocationApi();
            if (result) {
                setLocations(result);
            }
        };
        fetchLocation();
    }, []);

    useEffect(() => {
        const fetchTableByLocation = async () => {
            const result = await fetchDataApi();
            if (result) {
                setTables(result);
            }
        };
        fetchTableByLocation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedLocation]);

    const handleTableClick = async (table) => {
        if (table.status !== 'Đang phục vụ' && table.status !== 'Khách nhận bàn') {
            const data = {
                customerId: id,
                tableId: table.id,
                tableBookingId: tableBookingId,
            };
            const orderId = await request('post', `/order-table-link/add`, data);
            CustomToastMessage.success('Khách nhận bàn thành công', () => {
                navigate(`/order/${orderId.data}`);
            });
        } else {
            alert('Bàn đang phục vụ khách');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('location-list')}>
                {locations != null ? (
                    locations.map((location) => (
                        <div
                            key={location}
                            className={cx('location-item', `${location === selectedLocation ? 'active' : ''}`)}
                            onClick={() => setSelectedLocation(location)}
                        >
                            <i className="bx bx-map-pin" style={{ marginRight: '8px' }}></i>
                            {location}
                        </div>
                    ))
                ) : (
                    <div>Không có danh sách vị trí nào</div>
                )}
            </div>
            <div className={cx('table-cart-list')}>
                {tables.map((table) => (
                    <div className={cx('table-item')} key={table.id} onClick={() => handleTableClick(table)}>
                        {' '}
                        <TableCart table={table} />
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}

export default TableSelection;
