//React
import { useEffect, useState } from "react";

//Router
import { useParams } from "react-router-dom";

//Uitls
import { getLocalStorage, setLocalStorageWithExpiry } from "../../utils/localStorage";

//Components
import EpisodesTable from "../../components/EpisodesTable/EpisodesTable";
import PodcastDetailBox from "../../components/PodcastDetailBox/PodcastDetailBox";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";

//Styles
import styles from "./PodcastDetailPage.module.scss";

const PodcastDetailPage = (): any => {
    const params = useParams();

    const [loadingPodcasts, setLoadingPodcasts] = useState(true);
    const [loadingEpisodes, setLoadingEpisodes] = useState(true);

    const [episodeData, setEpisodeData] = useState<any>();
    const [podcastData, setPodcastData] = useState<any>();

    const [error, setError] = useState();

    const apiUrlAllPodcast =
        "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

    const apiUrlAllEpisodes =
        "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/lookup?id=" +
        params.podcastId +
        "&country=US&media=podcast&entity=podcastEpisode";

    useEffect(() => {
        try {
            //Fetching episodes
            setLoadingEpisodes(true);
            if (getLocalStorage(`podcastDetail${params.podcastId}`)) {
                setEpisodeData(getLocalStorage(`podcastDetail${params.podcastId}`));
                setLoadingEpisodes(false);
            } else {
                fetch(apiUrlAllEpisodes)
                    .then((response) => response.json())
                    .then((episodeData) => {
                        setEpisodeData(episodeData);
                        setLocalStorageWithExpiry(
                            `podcastDetail${params.podcastId}`,
                            episodeData,
                            86400000
                        );
                    })
                    .finally(() => setLoadingEpisodes(false));
            }

            //Fetching podcasts
            setLoadingPodcasts(true);
            if (getLocalStorage("podcasts")) {
                setPodcastData(getLocalStorage("podcasts"));
                setLoadingPodcasts(false);
            } else {
                fetch(apiUrlAllPodcast)
                    .then((response) => response.json())
                    .then((podcastData) => {
                        setPodcastData(podcastData);
                        setLocalStorageWithExpiry("podcasts", podcastData, 86400000);
                    })
                    .finally(() => setLoadingPodcasts(false));

            }
        } catch (e: any) {
            setError(e);
            console.log(e);
            setLoadingEpisodes(false);
            setLoadingPodcasts(false);
        }
    }, []);

    if (loadingEpisodes || loadingPodcasts) {
        return <SpinnerLoader />;
    }

    if (error) {
        return (
            <div className={styles.errorWrapper}>
                <p>Sorry! but something went bad fetching the data</p>
            </div>
        );
    }

    if(!loadingEpisodes && !loadingPodcasts && episodeData && podcastData && !error)
    return (
        <section className={styles.podcastDetails}>
                <PodcastDetailBox allPodcast={podcastData?.feed.entry} id={params.podcastId} />
                <div className={styles.episodesWrapper}>
                    <div className={styles.episodeCount}>
                        <span>Episodes: {episodeData.results.length}</span>
                    </div>
                    <EpisodesTable episodeData={episodeData.results} podcastId={params.podcastId} />
                </div>
            </section>
    );
};

export default PodcastDetailPage;
