//Styles
import styles from "./EpisodeDetailBox.module.scss";

const EpisodeDetailBox = ({ allEpisode, id }: any) => {
    
    var episode = allEpisode.find((item: any) => item.trackId == Number(id));
    console.log(episode)
    return (
        <div className={styles.episodeDetail}>
            <div className={styles.title}>
                <p>{episode.trackName}</p>
            </div>
            <div className={styles.description}>
                <p>{episode.description}</p>
            </div>
            <audio controls src={episode.previewUrl}>
                Your browser does not support the <code>audio</code> element.
            </audio>
        </div>
    );
};

export default EpisodeDetailBox;
