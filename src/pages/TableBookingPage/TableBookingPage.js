import { useEffect, useState } from 'react';
import { request } from '~/utils/request';
import CustomToastMessage from '~/components/CustomToastMessage';
import TableBooking from '~/components/TableBooking';
import { ToastContainer } from 'react-toastify';
import AddTableBooking from '~/components/AddTableBooking';

function TableBookingPage() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await request('get', `/table-booking/find-by-status?query=Đã đặt bàn`);
            const data = response.data;
            if (data) {
                setData(data);
            }
        } catch (error) {
            CustomToastMessage.error(error.response?.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="wrapper" style={{ margin: '20px' }}>
            <div className="header">
                <div className="header">
                    <AddTableBooking />
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {data && data.length > 0 ? (
                    data.map((tableBooking) => <TableBooking key={tableBooking.id} data={tableBooking} />)
                ) : (
                    <p style={{ textAlign: 'center' }}>No table booking available</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default TableBookingPage;
