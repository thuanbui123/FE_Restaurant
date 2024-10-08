import { useEffect, useState } from 'react';
import CustomToastMessage from '~/components/CustomToastMessage';
import { request } from '~/utils/request';
import classNames from 'classnames/bind';
import style from './CategoryFood.module.scss';
import Item from '~/components/Item';

const cx = classNames.bind(style);

function CategoryFood({ onClick }) {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(1);
    const [foods, setFoods] = useState([]);
    const [combos, setCombos] = useState([]);
    const fetchDataApi = async () => {
        try {
            const response = await request('get', `/food-category/user-find-all`);
            return response.data;
        } catch (error) {
            CustomToastMessage.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchDataApi();
            if (result) {
                setCategories(result);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await request(
                    'get',
                    `/food-category-link/find-foods-by-category-id?categoryId=${selectedCategory}`,
                );
                setFoods(response.data.foodsResponses);
            } catch (error) {
                CustomToastMessage.error(error?.response?.data?.message);
            }
        };
        const fetchCombosData = async () => {
            try {
                const response = await request('get', `/combos/find-all-user`);
                setCombos(response.data);
            } catch (error) {
                CustomToastMessage.error(error?.response?.data?.message);
            }
        };
        if (selectedCategory !== 'combo') {
            setCombos([]);
            fetchData();
        } else {
            setFoods([]);
            fetchCombosData();
        }
    }, [selectedCategory]);

    const handleClick = (item, type) => {
        if (type === 'combo') {
            onClick({ id: item.id, type: type });
        } else {
            onClick({ id: item.id, type: type });
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('category-tabs')}>
                {categories ? (
                    <>
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={cx(selectedCategory === category.id ? 'active' : '')}
                                onClick={() => setSelectedCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                        <button
                            className={cx(selectedCategory === 'combo' ? 'active' : '')}
                            onClick={() => setSelectedCategory('combo')}
                        >
                            Combo
                        </button>
                    </>
                ) : (
                    <div>Không có danh mục món ăn nào</div>
                )}
            </div>
            <div className={cx('item-list')}>
                {foods ? (
                    <>
                        {foods.map((food) => (
                            <Item item={food} key={food.code} onClick={() => handleClick(food, 'food')} />
                        ))}
                    </>
                ) : (
                    ''
                )}
                {combos ? (
                    <>
                        {combos.map((combo) => (
                            <Item item={combo} key={combo.id} onClick={() => handleClick(combo, 'combo')} />
                        ))}
                    </>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
}

export default CategoryFood;
