import Home from '~/pages/Home';
import Detail from '~/pages/Detail';
import AdminEmployee from '~/pages/AdminEmployee';
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
    {
        path: '/admin-employee',
        component: AdminEmployee,
        layout: AdminLayout,
        allowedRoles: ['ROLE_EMPLOYEE_ADMIN', 'ROLE_EMPLOYEE'],
    },
    {
        path: '/products',
        component: Products,
        layout: AdminLayout,
        allowedRoles: ['ROLE_USER'],
        children: [
            {
                index: true,
                component: NewProducts,
                layout: null,
                allowedRoles: ['ROLE_USER'],
            },
            {
                path: 'new-products',
                component: LazyNewProduct,
                wrapper: (Component) => (
                    <React.Suspense fallback={<Spinner />}>
                        <Component />
                    </React.Suspense>
                ),
                layout: null,
                allowedRoles: ['ROLE_USER'],
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
                allowedRoles: ['ROLE_USER'],
            },
        ],
    },
    {
        path: '*',
        component: NoMatch,
    },
];

export { publicRoutes, privateRoutes };
