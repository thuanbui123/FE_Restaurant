import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import style from './TableCartList.module.scss';
import TableCart from '~/components/TableCart';
import { request } from '~/utils/request';
import CustomToastMessage from '~/components/CustomToastMessage';

const cx = classNames.bind(style);

function TableCartList({ urlApi }) {
    useEffect(() => {
        document.title = 'Sơ đồ bàn';
    }, []);

    const [tables, setTables] = useState(null);
    const [locations, setLocations] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('Tầng 1');

    const fetchDataApi = async () => {
        try {
            // Sử dụng urlApi nếu có, nếu không thì dùng URL mặc định
            const response = await request('get', urlApi || `/tables/get-tables-by-location?query=${selectedLocation}`);
            return response.data;
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    };

    const fetchLocationApi = async () => {
        try {
            const response = await request('get', `/tables/locations`);
            return response.data;
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchDataApi();
            if (result) {
                setTables(result);
            }
        };

        fetchData();
    }, [urlApi]);

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
        if (!urlApi) {
            // Chỉ lấy danh sách bàn theo vị trí nếu không có urlApi
            const fetchTableByLocation = async () => {
                const result = await fetchDataApi();
                if (result) {
                    setTables(result);
                }
            };
            fetchTableByLocation();
        }
    }, [selectedLocation, urlApi]);

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
                {tables != null ? (
                    tables.map((table) => <TableCart key={table.id} table={table} className={cx('table-item')} />)
                ) : (
                    <div>Không có bàn ăn nào</div>
                )}
            </div>
        </div>
    );
}

export default TableCartList;
