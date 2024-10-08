import Home from '~/pages/Home';
// import Detail from '~/pages/Detail';
import AdminEmployee from '~/pages/AdminEmployee';
import AdminLayout from '~/Layouts/AdminLayout';
// import Products from '~/pages/Product/Products';
// import React from 'react';
// import Spinner from '~/components/Spinner';
import NoMatch from '~/components/NoMatch';
// import NewProducts from '~/pages/NewProducts';
import LoginRegisterForm from '~/pages/LoginAndRegister/LoginRegisterForm';
import UserProfileUpdate from '~/pages/UserProfileUpdate';
import DefaultLayout from '~/Layouts/DefaultLayout';
import AdminCustomer from '~/pages/AdminCustomer';
import AdminAccount from '~/pages/AdminAccount';
import FoodsList from '~/FoodsList';
import FoodDetail from '~/FoodDetail';
import ComboList from '~/components/ComboList';
import TableCartList from '~/components/TableCartList';
import OrderPage from '~/pages/OrderPage';

// Nạp các component cần thực hiện lazyLoading
// const LazyNewProduct = React.lazy(() => import('~/pages/NewProducts'));

// const LazyFeatureProduct = React.lazy(() => import('~/pages/FeaturedProducts'));

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    // { path: '/detail', component: Detail },
    { path: '/auth', component: LoginRegisterForm, layout: null },
];

//Khi khai báo route nên viết trước route có path '*'

const privateRoutes = [
    {
        path: '/order/:id',
        component: OrderPage,
        layout: AdminLayout,
        allowedRoles: ['ROLE_USER'],
    },
    {
        path: '/tables',
        component: TableCartList,
        layout: AdminLayout,
        allowedRoles: ['ROLE_USER'],
    },
    {
        path: '/foods',
        component: FoodsList,
        layout: AdminLayout,
        allowedRoles: ['ROLE_USER'],
    },
    {
        path: '/combos',
        component: ComboList,
        layout: AdminLayout,
        allowedRoles: ['ROLE_USER'],
    },
    {
        path: '/food/detail/:id', // Dynamic path to get product ID
        component: FoodDetail, // Component to render details
        layout: AdminLayout,
        allowedRoles: ['ROLE_USER'],
    },
    {
        path: '/update-info',
        component: UserProfileUpdate,
        layout: DefaultLayout,
        allowedRoles: ['ROLE_USER'],
    },
    {
        path: '/admin-employee',
        component: AdminEmployee,
        layout: AdminLayout,
        allowedRoles: ['ROLE_EMPLOYEE_ADMIN', 'ROLE_EMPLOYEE'],
    },
    {
        path: '/admin-account',
        component: AdminAccount,
        layout: AdminLayout,
        allowedRoles: ['ROLE_EMPLOYEE_ADMIN', 'ROLE_EMPLOYEE'],
    },
    {
        path: '/admin-customer',
        component: AdminCustomer,
        layout: AdminLayout,
        allowedRoles: ['ROLE_EMPLOYEE_ADMIN', 'ROLE_EMPLOYEE'],
    },
    // {
    //     path: '/products',
    //     component: Products,
    //     layout: AdminLayout,
    //     allowedRoles: ['ROLE_USER'],
    //     children: [
    //         {
    //             index: true,
    //             component: NewProducts,
    //             layout: null,
    //             allowedRoles: ['ROLE_USER'],
    //         },
    //         {
    //             path: 'new-products',
    //             component: LazyNewProduct,
    //             wrapper: (Component) => (
    //                 <React.Suspense fallback={<Spinner />}>
    //                     <Component />
    //                 </React.Suspense>
    //             ),
    //             layout: null,
    //             allowedRoles: ['ROLE_USER'],
    //         },
    //         {
    //             path: 'featured-products',
    //             component: LazyFeatureProduct,
    //             wrapper: (Component) => (
    //                 <React.Suspense fallback={<Spinner />}>
    //                     <Component />
    //                 </React.Suspense>
    //             ),
    //             layout: null,
    //             allowedRoles: ['ROLE_USER'],
    //         },
    //     ],
    // },
    {
        path: '*',
        component: NoMatch,
    },
];

export { publicRoutes, privateRoutes };
