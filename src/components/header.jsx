import { Link, useLocation } from "react-router-dom";
import { Typography } from 'antd';
const { Text } = Typography;

const Header = () => {

    const location = useLocation();

    return <div className="header">
        <div className="header__content">
            <Link to={'/'}>Databases</Link>
            <Text> / </Text>
            {
                (location.pathname.includes('devby')) && <Link to={'/devby'}>Dev.by</Link>
            }
            {
                (location.pathname.includes('my')) && <Link to={'/my'}>My</Link>
            }

        </div>
            
    </div>

} 

export default Header;