import {Outlet, useLocation} from "react-router-dom";
import { NavigationComponent } from "../components/NavigationComponent/NavigationComponent";
import { useMenuByRole } from "../hooks/useMenuByRole";
import {HeaderComponent} from "../components/HeaderComponent/HeaderComponent";
import {FooterComponent} from "../components/FooterComponent/FooterComponent";

const MainLayout = () => {
    const menu = useMenuByRole();
    const location = useLocation();

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

