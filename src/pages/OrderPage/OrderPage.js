import classNames from 'classnames/bind';
import style from './OrderPage.module.scss';
import CategoryFood from '~/components/CategoryFood';
import { useEffect, useState } from 'react';
import { request } from '~/utils/request';
import CustomToastMessage from '~/components/CustomToastMessage';
import CartItem from '~/components/CartItem/CartItem';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const cx = classNames.bind(style);

function OrderPage() {
    const { id } = useParams();

    const [foodOrdered, setFoodOrdered] = useState([]);
    const [comboOrdered, setComboOrdered] = useState([]);

    useEffect(() => {
        document.title = 'Gọi món';
    });

    const fetchDataApi = async () => {
        try {
            const response = await request('get', `/food-order/search?bill-id=${id}`);
            return response.data.responses;
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
            return [];
        }
    };

    const fetchCombosApi = async () => {
        try {
            const response = await request('get', `/combo-ordered/search?bill-id=${id}`);
            return response.data.comboResponses;
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
            return [];
        }
    };

    const handleQuantityChange = (newQuantity) => {
        console.log('New quantity:', newQuantity);
    };

    const handleRemoveItem = async (item) => {
        if (item.type === 'food') {
            const requestData = {
                orderedId: id,
                detailRequests: [
                    {
                        foodId: item.id,
                        quantity: 1,
                    },
                ],
            };
            try {
                await request('post', `/food-order/delete`, requestData);
                CustomToastMessage.success('Xóa món ăn ra khỏi đơn hàng thành công', () => {
                    window.location.reload();
                });
            } catch (error) {
                let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại.';

                if (error.response && error.response.data) {
                    errorMessage = error.response.data;
                }

                CustomToastMessage.error(errorMessage);
            }
        } else if (item.type === 'combo') {
            const requestData = {
                ordered: id,
                requests: [
                    {
                        comboId: item.id,
                        quantity: 1,
                    },
                ],
            };
            try {
                await request('post', `/combo-ordered/delete`, requestData);
                CustomToastMessage.success('Xóa combo món ăn ra khỏi đơn hàng thành công', () => {
                    window.location.reload();
                });
            } catch (error) {
                let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại.';
                if (error.response && error.response.data) {
                    errorMessage = error.response.data; // Lấy thông báo lỗi từ server
                }

                CustomToastMessage.error(errorMessage);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const foodResults = await fetchDataApi();
            if (foodResults) {
                setFoodOrdered(foodResults);
            }

            const comboResults = await fetchCombosApi();
            if (comboResults) {
                setComboOrdered(comboResults);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClick = async (item) => {
        if (item.type === 'food') {
            const requestData = {
                orderedId: id,
                detailRequests: [
                    {
                        foodId: item.id,
                        quantity: 1,
                    },
                ],
            };
            try {
                await request('post', `/food-order/add`, requestData);
                CustomToastMessage.success('Gọi món ăn thành công', () => {
                    window.location.reload();
                });
            } catch (error) {
                let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại.';

                if (error.response && error.response.data) {
                    errorMessage = error.response.data; // Lấy thông báo lỗi từ server
                }

                CustomToastMessage.error(errorMessage);
            }
        } else if (item.type === 'combo') {
            const requestData = {
                ordered: id,
                requests: [
                    {
                        comboId: item.id,
                        quantity: 1,
                    },
                ],
            };
            try {
                await request('post', `/combo-ordered/add`, requestData);
                CustomToastMessage.success('Gọi combo món ăn thành công', () => {
                    window.location.reload();
                });
            } catch (error) {
                let errorMessage = 'Có lỗi xảy ra, vui lòng thử lại.';
                if (error.response && error.response.data) {
                    errorMessage = error.response.data; // Lấy thông báo lỗi từ server
                }

                CustomToastMessage.error(errorMessage);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <div className={cx('left')}>
                <CategoryFood onClick={handleClick} />
            </div>
            <div className={cx('right')}>
                <div className={cx('right-header')}>
                    <div className={cx('header-row')}>
                        <span className={cx('header-item')}>Mặt hàng</span>
                        <span className={cx('header-quantity')}>SL</span>
                        <span className={cx('header-price')}>Thành tiền</span>
                    </div>
                </div>
                <div className={cx('right-content')}>
                    {foodOrdered
                        ? foodOrdered.map((fo) => (
                              <CartItem
                                  key={fo.foodId}
                                  id={fo.foodId}
                                  type="food"
                                  name={fo.foodName}
                                  price={fo.totalPrice / fo.quantity}
                                  quantity={fo.quantity}
                                  onQuantityChange={handleQuantityChange}
                                  onRemove={handleRemoveItem}
                              />
                          ))
                        : ''}
                    {comboOrdered
                        ? comboOrdered.map((co) => (
                              <CartItem
                                  key={co.comboId}
                                  id={co.comboId}
                                  type="combo"
                                  name={co.comboName}
                                  price={co.totalPrice / co.quantity}
                                  quantity={co.quantity}
                                  onQuantityChange={handleQuantityChange}
                                  onRemove={handleRemoveItem}
                              />
                          ))
                        : ''}
                </div>
                <div className={cx('right-footer')}>
                    <button className={cx('custom-btn', 'btn', 'btn-danger')}>
                        <i className={cx('bx', 'bxs-x-circle')}></i>
                        <p>Quay lại</p>
                    </button>
                    <button className={cx('custom-btn', 'btn', 'btn-primary')}>
                        <i className={cx('bx', 'bxs-down-arrow-circle')}></i>
                        <p>Lưu lại</p>
                    </button>
                    <button className={cx('custom-btn', 'btn', 'btn-success')}>
                        <i className={cx('bx', 'bx-money-withdraw')}></i>
                        <p>Thanh toán</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderPage;
