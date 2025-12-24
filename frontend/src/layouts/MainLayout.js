import { Outlet } from "react-router-dom";
import { NavigationComponent } from "../components/NavigationComponent/NavigationComponent";
import { useMenuByRole } from "../hooks/useMenuByRole";
import {HeaderComponent} from "../components/HeaderComponent/HeaderComponent";
import {FooterComponent} from "../components/FooterComponent/FooterComponent";

const MainLayout = () => {
    const menu = useMenuByRole();

    return (
        <>
            <HeaderComponent/>
            <NavigationComponent menu={menu} />
            <Outlet context={{ menu }} />
            <FooterComponent/>
        </>
    );
};

export { MainLayout };
