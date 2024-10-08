import classNames from 'classnames/bind';
import style from './CartItem.module.scss';
import { useState } from 'react';

const cx = classNames.bind(style);

function CartItem({ id, name, price, quantity, onQuantityChange, onRemove, type }) {
    const [itemQuantity, setItemQuantity] = useState(quantity);
    const handleDecrease = () => {
        if (itemQuantity > 1) {
            setItemQuantity(itemQuantity - 1);
            onQuantityChange(itemQuantity - 1);
        }
    };

    const handleIncrease = () => {
        setItemQuantity(itemQuantity + 1);
        onQuantityChange(itemQuantity + 1);
    };

    const handleRemove = (type) => {
        onRemove({ id, quantity: itemQuantity, type });
    };

    return (
        <div className={cx('cart-item')}>
            <input value={id} hidden readOnly />
            <div className={cx('cart-item-info')}>
                <h4>{name}</h4>
                <p>{price.toLocaleString('vi-VN')} đ</p>
            </div>
            <div className={cx('cart-item-quantity')}>
                <button onClick={handleDecrease}>-</button>
                <input type="text" value={itemQuantity} readOnly />
                <button onClick={handleIncrease}>+</button>
            </div>
            <div className={cx('cart-item-total')}>
                <p>{(price * itemQuantity).toLocaleString('vi-VN')} đ</p>
            </div>
            <button
                className={cx('cart-item-remove')}
                onClick={() => {
                    handleRemove(type);
                }}
            >
                ✖
            </button>
        </div>
    );
}

export default CartItem;
