import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import { HomePageVideos } from "../Types";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import Cards from "../components/Cards";
import { clearVideos } from "../store";

export default function Home() {
  const dispatch = useAppDispatch();
  const { videos, nextPageToken } = useAppSelector((state) => state.youtubeApp);
  useEffect(() => {
    return () => {
      dispatch(clearVideos());
    };
  }, [dispatch]); 
  useEffect(() => {
    dispatch(getHomePageVideos(false));
  }, [dispatch]);

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <Sidebar />
        {videos.length > 0 ? (
          <InfiniteScroll
          key={nextPageToken}
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 500}
            loader={<Spinner />}
            height={780}
          >
            <div className="grid gap-y-14 gap-x-8 grid-cols-4 p-8">
              {videos.map((item: HomePageVideos) => {
                return <Cards data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
}
