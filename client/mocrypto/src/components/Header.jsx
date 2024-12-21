import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

function Header(props) {
    const getNavItems = (name) => {
        switch (name) {
            case 'Main':
                return [
                    { path: '/log-in', label: 'Log In' },
                    { path: '/sign-up', label: 'Sign Up' },
                    { path: '/contact-us', label: 'Contact' }
                ];
            // case 'User':
            //     return [
            //         { path: '/home', label: 'Home' },
            //         { path: '/profile', label: 'Profile' },
            //         { path: '/help', label: 'Help' }
            //     ];
            default:
                return [
                    { path: '/home', label: 'Home' },
                    { path: '/about', label: 'About' },
                    { path: '/contact-us', label: 'Contact Us' }
                ];
        }
    };

    const navItems = getNavItems(props.name);

    return (
        <header className="header">
            <h1 className="h1">{props.name}</h1>
            <nav>
                <ul className="navlist">
                    {navItems.map((item, index) => (
                        <Link key={index} to={item.path} style={{ textDecoration: 'none' }}>
                            <li className="list-elem">
                                <a className="navlink" href={item.path}>{item.label}</a>
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

Header.propTypes = {
    name: propTypes.string,
};

Header.defaultProps = {
    name: 'Ad Astra',
};

export default Header;