const youTube_Api = process.env.youTube_Api;



async function getVideosSearch(url) {
  try {
    const apiPart = "https://youtube.googleapis.com/youtube/v3";

    const response =
      await fetch(`${apiPart}/${url}&key=${youTube_Api}
`);
    const data = await response.json();
    console.log({ items: data.items });

    data?.error && (console.error("You Tube api Error", data.error) && []);

    return data?.items.map((item ,idx) => {
      return {
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
        id: item?.id?.videoId || idx,
      };
    });
  } catch (error) {
    console.error(`error finding specific category`, error);
    return []; // in case of an error return an empty array , so it does not break the app
  }
}



export async function getVideos(searchInput) {
  const url = `search?part=snippet&maxResults=25&q=${searchInput}`;
  return getVideosSearch(url)
}

export async function getMostPopularVideos(searchInput) {
  const url = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=${searchInput}&regionCode=US`;
  return getVideosSearch(url)
}

// GET https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=[YOUR_API_KEY] HTTP/1.1