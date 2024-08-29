import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/Routes';
import { DefaultLayout } from '~/Layouts/DefaultLayout';
import { Fragment } from 'react';
import { AuthProvider } from '~/utils/AuthUtil/Auth';
import { RequireAuth } from '~/utils/AuthUtil/RequireAuth';

function App() {
    const renderRoute = (route, index) => {
        const Page = route.component;
        let Layout = DefaultLayout;

        if (route.layout) {
            Layout = route.layout;
        } else if (route.layout === null) {
            Layout = Fragment;
        }

        const element = route.wrapper ? route.wrapper(Page) : <Page />;

        const routeElement = route.requireAuth ? (
            <RequireAuth>
                <Layout>{element}</Layout>
            </RequireAuth>
        ) : (
            <Layout>{element}</Layout>
        );

        if (route.index) {
            return (
                <Route key={index} index element={routeElement}>
                    {route.children?.map(renderRoute)}
                </Route>
            );
        }

        return (
            <Route key={index} path={route.path} element={routeElement}>
                {route.children?.map(renderRoute)}
            </Route>
        );
    };

    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Public Routes */}
                        {publicRoutes.map(renderRoute)}

                        {/* Private Routes */}
                        {privateRoutes.map(renderRoute)}
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
