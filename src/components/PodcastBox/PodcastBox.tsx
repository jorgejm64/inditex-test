//Router
import { Link } from "react-router-dom";

//Styles
import styles from "./PodcastBox.module.scss";

const PodcastBox = ({ podcast }: any) => {
    return (
        <li className={styles.podcastBox}>
            <article>
                <div className={styles.image}>
                    <img src={podcast["im:image"][2].label} />
                </div>
                <div className={styles.infoWrapper}>
                    <Link to={"podcast/" + podcast.id.attributes["im:id"]}>
                        <div className={styles.title}>
                            <p>{podcast.title.label}</p>
                        </div>
                        <div className={styles.author}>
                            <p>Author: {podcast["im:artist"].label}</p>
                        </div>
                    </Link>
                </div>
            </article>
        </li>
    );
};

export default PodcastBox;
