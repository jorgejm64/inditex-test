//Router
import { Link } from "react-router-dom";

//Styles
import styles from "./Header.module.scss";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link to="/">Podcaster</Link>
            </div>
        </header>
    );
};

export default Header;
