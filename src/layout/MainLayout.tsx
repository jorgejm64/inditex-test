//Router
import { Outlet } from "react-router-dom";

//Components
import Header from "../components/Header/Header";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
