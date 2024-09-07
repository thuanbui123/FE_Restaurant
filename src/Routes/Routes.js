import Home from '~/pages/Home';
import Detail from '~/pages/Detail';
import Admin from '~/pages/Admin';
import AdminLayout from '~/Layouts/AdminLayout';
import Products from '~/pages/Product/Products';
import React from 'react';
import Spinner from '~/components/Spinner';
import NoMatch from '~/components/NoMatch';
import NewProducts from '~/pages/NewProducts';
import LoginRegisterForm from '~/pages/LoginAndRegister/LoginRegisterForm';

// Nạp các component cần thực hiện lazyLoading
const LazyNewProduct = React.lazy(() => import('~/pages/NewProducts'));

const LazyFeatureProduct = React.lazy(() => import('~/pages/FeaturedProducts'));

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/detail', component: Detail },
    { path: '/auth', component: LoginRegisterForm, layout: null },
];

//Khi khai báo route nên viết trước route có path '*'

const privateRoutes = [
    { path: '/admin', component: Admin, layout: AdminLayout },
    {
        path: '/products',
        component: Products,
        // requireAuth: true này thể hiện route đó cần phải đăng nhập trước rồi mới được phép truy cập
        requireAuth: true,
        layout: AdminLayout,
        // Children này thể hiện các route con. Ví dụ: route new-products là con của route products. Khi gọi đến route này là: http://localhost:3000/products/new-products
        children: [
            // Giao diện con mặc định không sử dụng lazyLoading được
            // layout của route con nên để là null để nó ăn theo layout của route cha
            { index: true, component: NewProducts, layout: null }, // Hiển thị UI con mặc định của Route cha
            {
                path: 'new-products',
                component: LazyNewProduct,
                wrapper: (Component) => (
                    // Tạo cơ chế lazyLoading
                    <React.Suspense fallback={<Spinner />}>
                        <Component />
                    </React.Suspense>
                ),
                layout: null,
            },
            {
                path: 'featured-products',
                component: LazyFeatureProduct,
                wrapper: (Component) => (
                    <React.Suspense fallback={<Spinner />}>
                        <Component />
                    </React.Suspense>
                ),
                layout: null,
            },
        ],
    },
    {
        path: '*',
        component: NoMatch,
    },
];

export { publicRoutes, privateRoutes };
