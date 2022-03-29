import videoDummyData from "../data/videos.json";
import { getWatchedVideos, getMyListVideos } from "../lib/db";

async function getAllVideos(url) {
  const youTube_Api = process.env.youTube_Api;
  const apiPart = "https://youtube.googleapis.com/youtube/v3";

  const response = await fetch(`${apiPart}/${url}&key=${youTube_Api}
`);
  return await response.json();
}

async function getVideosSearch(url) {
  try {

    const data = await getAllVideos(url);

    data?.error && console.error("You Tube api Error", data.error) && [];

    return data?.items.map((item, idx) => {
      const id = item.id.videoId ? item.id.videoId : item.id; 
      return {
        title: item.snippet.title,
        imgUrl: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        id: id,
        description: item.snippet.description,
        channelTitle: item.snippet.channelTitle,
        viewCount: item?.statistics?.viewCount ? item.statistics.viewCount : 0,
        publishTime: new Date(item.snippet.publishedAt).toTimeString(),
      };
    });
  } catch (error) {
    console.error(`error finding specific category`, error);
    return []; // in case of an error return an empty array , so it does not break the app
  }
}

export async function getVideos(searchInput) {
  const url = `search?part=snippet&maxResults=25&q=${searchInput}`;
  return getVideosSearch(url);
}

export async function getMostPopularVideos() {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&maxResults=25&chart=mostPopular&regionCode=US`;
  return getVideosSearch(url);
}

export async function getYouTubeVideoById(videoId) {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
  return getVideosSearch(url);
}

export async function watchItAgainVideos(userId, token) {
  const videos = await getWatchedVideos(userId, token);

  return videos.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
}

export async function myFavoriteVideos(userId, token) {
  const videos = await getMyListVideos(userId, token);

  return videos.map((video) => {
    return {
      id: video.videoId,
      imgUrl: `https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`,
    };
  });
}