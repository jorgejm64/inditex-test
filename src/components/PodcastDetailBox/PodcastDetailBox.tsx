//Router
import { Link } from "react-router-dom";

//Styles
import styles from "./PodcastDetailBox.module.scss";

const PodcastDetailBox = ({ allPodcast, id }: any) => {
    var podcast = allPodcast.find((item: any) => item.id.attributes["im:id"].includes(id));

    return (
        <div className={styles.podcastDetail}>
            <img src={podcast["im:image"][2].label} alt={podcast.title.label} />

            <div className={styles.title}>
                <p>
                    <Link to={"/podcast/" + id}>{podcast.title.label}</Link>
                </p>
                <p>
                    <Link to={"/podcast/" + id}>{podcast["im:artist"].label}</Link>
                </p>
            </div>
            <div className={styles.description}>
                <span>Description</span>
                <p>{podcast.summary.label}</p>
            </div>
        </div>
    );
};

export default PodcastDetailBox;
