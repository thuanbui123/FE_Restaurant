import classNames from 'classnames/bind';
import style from './Item.module.scss';

const cx = classNames.bind(style);

function Item({ item, onClick }) {
    const handleClick = () => {
        onClick({ id: item.id, name: item.name });
    };
    return (
        <div className={cx('container')} onClick={handleClick}>
            <input type="number" value={item.id} hidden readOnly />
            <img className={cx('img')} src={item.img} alt={item.name} />
            <h3 className={cx('name')}>{item.name}</h3>
        </div>
    );
}

export default Item;
