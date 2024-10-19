import { useEffect, useState } from 'react';
import { request } from '~/utils/request';
import CustomToastMessage from '~/components/CustomToastMessage';
import BillOrderNow from '~/components/BillOrderNow';
import { ToastContainer } from 'react-toastify';
import AddBillOrder from '~/components/AddBillOrder';

function BillOrderPage() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await request('get', `/order/get-order-now`);
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
        <div className="wrapper">
            <div className="header">
                <div className="header">
                    <AddBillOrder />
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {data ? (
                    data.map((order) => <BillOrderNow key={order.orderId} data={order} />)
                ) : (
                    <p>No orders available</p>
                )}
            </div>

            <ToastContainer />
        </div>
    );
}

export default BillOrderPage;
