import { NavLink } from 'react-router-dom';

const Header = () => {
    const navLinkStyles = ({ isActive }) => {
        return {
            fontWeight: isActive ? 'bold' : 'normal',
            textDecoration: isActive ? 'none' : 'underline',
        };
    };

    return (
        <nav className="primary-nav">
            <NavLink to="/" style={navLinkStyles}>
                Home
            </NavLink>
            <NavLink to="/products" style={navLinkStyles}>
                Products
            </NavLink>
        </nav>
    );
};

export default Header;
