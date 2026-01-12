import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {NavigationComponent} from "../components/NavigationComponent/NavigationComponent";
import {useMenuByRole} from "../hooks/useMenuByRole";
import {HeaderComponent} from "../components/HeaderComponent/HeaderComponent";
import {FooterComponent} from "../components/FooterComponent/FooterComponent";
import {setNavigate} from "../untils/navigation";
import './MainLayout.css';

const MainLayout = () => {
    const menu = useMenuByRole();
    const location = useLocation();
    const navigate = useNavigate();
    setNavigate(navigate);


    const hideNavigation = location.pathname.startsWith("/users/verify_email");

    return (
        <div className="main-layout">
            <HeaderComponent/>
            {!hideNavigation && <NavigationComponent menu={menu}/>}
            <div className="layout-content-wrapper">
                <Outlet context={{menu}}/>
                <FooterComponent/>
            </div>
        </div>
    );
};

export {MainLayout};

