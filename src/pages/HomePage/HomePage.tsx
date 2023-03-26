//React
import { useEffect, useState } from "react";


//Components
import PodcastBox from "../../components/PodcastBox/PodcastBox";
import SpinnerLoader from "../../components/SpinnerLoader/SpinnerLoader";

//Utils
import { setLocalStorageWithExpiry, getLocalStorage } from "../../utils/localStorage";

//Styles
import styles from "./HomePage.module.scss";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>();
    const [error, setError] = useState();

    const apiUrlAllPodcast =
        "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

    useEffect(() => {
        //Fetching podcasts
        setLoading(true);
        if (getLocalStorage("podcasts")) {
            setData(getLocalStorage("podcasts"));
            setLoading(false);
        } else {
            fetch(apiUrlAllPodcast)
                .then((response) => response.json())
                .then((data) => {
                    setData(data);
                    setLocalStorageWithExpiry("podcasts", data, 86400000);
                })
                .catch((e) => {
                    console.log(e);
                    setError(e);
                })
                .finally(() => setLoading(false));
        }
    }, []);

    function search(data: any) {
        return data.filter(
            (item: any) =>
                item["im:artist"].label.toLowerCase().includes(query) ||
                item.title.label.toLowerCase().includes(query)
        );
    }

    if (loading) {
        return <SpinnerLoader />;
    }

    if (error) {
        return (
            <div className={styles.errorWrapper}>
                <p>Sorry! but something went bad fetching the data</p>
            </div>
        );
    }

    if (!loading && data && !error) {
        return (
            <section className={styles.homePage}>
                <div className={styles.searchWrapper}>
                    <div className={styles.podcastTotal}>
                        <span>{data?.feed.entry.length}</span>
                    </div>
                    <label htmlFor="search-form">
                        <input
                            type="search"
                            name="search-form"
                            placeholder="Filter podcast..."
                            onChange={(e) => setQuery(e.target.value.toLocaleLowerCase())}
                        />
                    </label>
                </div>
                <ul className={styles.podcastWrapper}>
                    {search(data?.feed.entry).map((podcast: any, idx: number) => (
                        <PodcastBox podcast={podcast} key={idx} />
                    ))}
                </ul>
            </section>
        );
    }
};

export default HomePage;
