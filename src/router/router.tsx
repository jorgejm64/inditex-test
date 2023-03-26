//Dependencies
import { createBrowserRouter } from "react-router-dom";

//Layout
import MainLayout from "../layout/MainLayout";
import EpisodeDetailPage from "../pages/EpisodeDetailPage/EpisodeDetailPage";

//Pages
import HomePage from "../pages/HomePage/HomePage";
import PodcastDetailPage from "../pages/PodcastDetailPage/PodcastDetailPage";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        //error: <>,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "podcast/:podcastId",
                element: <PodcastDetailPage />,
            },
            {
                path: "podcast/:podcastId/episode/:episodeId",
                element: <EpisodeDetailPage />
            }
        ]

    }
])