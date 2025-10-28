import { useMenuByRole } from '../../hooks/useMenuByRole';
import { Link } from 'react-router-dom';
import {LogoutComponent} from "../LogoutComponent/LogoutComponent";

const NavigationComponent = () => {
  const menuItems = useMenuByRole();

  return (
    <div>
        <nav>
            <ul>
                    {menuItems.map(item => (
                    <li key={item.path}>
                    <Link to={item.path}>{item.label}</Link>
            </li>
                    ))}
            </ul>
        </nav>
        <LogoutComponent/>
    </div>
  );
};

export {NavigationComponent};