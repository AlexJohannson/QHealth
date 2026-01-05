import {Outlet, useLocation, useNavigate} from "react-router-dom";
import { NavigationComponent } from "../components/NavigationComponent/NavigationComponent";
import { useMenuByRole } from "../hooks/useMenuByRole";
import {HeaderComponent} from "../components/HeaderComponent/HeaderComponent";
import {FooterComponent} from "../components/FooterComponent/FooterComponent";
import {setNavigate} from "../untils/navigation";

const MainLayout = () => {
    const menu = useMenuByRole();
    const location = useLocation();
    const navigate = useNavigate();
    setNavigate(navigate);


     const hideNavigation = location.pathname.startsWith("/users/verify_email");

    return (
        <>
            <HeaderComponent/>
            {!hideNavigation && <NavigationComponent menu={menu} />}
            <Outlet context={{ menu }} />
            <FooterComponent/>
        </>
    );
};

export { MainLayout };

