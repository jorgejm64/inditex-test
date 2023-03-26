//Router
import { Link } from "react-router-dom";
import { convertToFormatDate, milisecToFormat } from "../../utils/utilsFunctions";

//Styles
import styles from "./EpisodesTable.module.scss";

const EpisodesTable = ({ episodeData, podcastId }: any) => {
    return (
        <table className={styles.episodesTable}>
            <thead>
                <tr>
                    <th style={{ width: "70%" }}>Title</th>
                    <th>Date</th>
                    <th>Duration</th>
                </tr>
            </thead>
            <tbody>
                {episodeData.map((episode: any, idx: number) =>
                    // idx === 0 ? (
                    //     ""
                    // ) : (
                        <tr key={idx}>
                            <td className={styles.episodeTitle} style={{ width: "70%" }}>
                                <Link to={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                                    {episode.trackName}
                                </Link>
                            </td>
                            <td>{convertToFormatDate(episode.releaseDate)}</td>
                            <td>{milisecToFormat(episode.trackTimeMillis)}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    );
};

export default EpisodesTable;
