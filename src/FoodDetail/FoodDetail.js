import { useEffect, useState } from 'react';
import CustomToastMessage from '~/components/CustomToastMessage';
import { useParams } from 'react-router-dom';
import { request } from '~/utils/request';
import style from './FoodDetail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function FoodDetail() {
    useEffect(() => {
        document.title = 'Chi tiết món ăn';
    }, []);

    const { id } = useParams();
    const [product, setProduct] = useState(null); // Holds product data
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchProductData(); // Await the async function here
            setProduct(data); // Set the product state after fetching data
        };

        fetchData(); // Call the async function
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchProductData = async () => {
        try {
            const response = await request('get', `/foods/find-one-by-id?query=${id}`);
            return response.data; // Return the data directly
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message || 'Failed to fetch product');
            return null; // Return null in case of error
        }
    };

    const incrementQuantity = () => {
        setQuantity((prevQty) => prevQty + 1);
    };

    const decrementQuantity = () => {
        setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : 1));
    };

    if (!product) {
        return <div>Loading...</div>; // Show while loading product data
    }

    return (
        <div className={cx('product-card')}>
            <div className={cx('product-image')}>
                <img src={product.img} alt={product.title} />
            </div>
            <div className={cx('product-details')}>
                <h1 className={cx('product-title')}>{product.title}</h1>
                {/* You can uncomment and update renderStars if needed */}
                {/* <div className="product-rating">
                    {renderStars(product.rating)}
                    <p>
                        ({product.reviewCount} customer review{product.reviewCount > 1 ? 's' : ''})
                    </p>
                </div> */}
                <p className={cx('product-price')}>{product.price?.toFixed(2) || 'N/A'}VNĐ</p>
                <p className={cx('product-description')}>{product.description}</p>
                <div className={cx('product-quantity')}>
                    <button onClick={decrementQuantity}>-</button>
                    <input type="text" value={quantity} readOnly />
                    <button onClick={incrementQuantity}>+</button>
                </div>
                <button className={cx('add-to-cart')}>Thêm vào đơn hàng</button>
                <div className={cx('product-info')}>
                    <p>{product.name || 'N/A'}</p>
                    <p>{product.description || 'N/A'}</p>
                </div>
            </div>
        </div>
    );
}

export default FoodDetail;
