//React
import { useEffect, useState } from "react";

//Styles
import styles from "./HomePage.module.scss";

const HomePage = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>();
    const [error, setError] = useState();

    const apiUrlAllPodcast =
        "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

    useEffect(() => {
        setLoading(true);
        fetch(apiUrlAllPodcast)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((e) => {
                console.log(e);
                setError(e);
            })
            .finally(() => setLoading(false));
    }, []);

    if (!loading) {
        console.log(data);
    }

    return (
        <section className={styles.homePage}>
            <h1>HomePage</h1>
        </section>
    );
};

export default HomePage;
