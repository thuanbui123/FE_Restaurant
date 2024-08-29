import { NavLink, Outlet } from 'react-router-dom';

const Products = () => {
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'none' : 'underline',
        };
    };

    return (
        <>
            <div>
                <input type="search" placeholder="Search products" />
            </div>
            <nav>
                <NavLink to="featured-products" style={navLinkStyles}>
                    Featured
                </NavLink>
                <NavLink to="new-products" style={navLinkStyles}>
                    New
                </NavLink>
            </nav>
            <Outlet />
        </>
    );
};

export default Products;
