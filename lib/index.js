import videoData from "../data/videos.json";

async function getVideos(){
  const youTube_Api = process.env.youTube_Api;

  const response =
    await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=disney%20trailer&key=${youTube_Api}
`);
  const data = await response.json();
  console.log(data);

  return data?.items.map((item) => {
    return {
      title: item.snippet.title,
      imgUrl: item.snippet.thumbnails.high.url,
      id: item?.id?.videoId,
    };
  });
};

export default getVideos;
