export const fetchPlaylistVideos = async (playlistId, {
  apiKey = '',
  apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems',
  maxResults = 50,
  pageToken= '',
  order = 'viewCount'
} = {}) => {
try {
  const pagination = pageToken ? `&pageToken=${pageToken}` : '';
  const res = await fetch(encodeURI(`${apiUrl}?key=${apiKey}&part=snippet&type=video%2C%20playlist&maxResults=${maxResults}&playlistId=${playlistId}${pagination}&order=${order}`), {
    "headers": {
        "accept": "application/json"
    },
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
    });
    if(!res.ok) {
      return {
        items: []
      };
    }
    const playlistData = await res.json();
    return {
      items: playlistData.items,
      nextPage: playlistData.nextPageToken,
      prevPage: playlistData.prevPageToken
    }
} catch(e) {
  return {
    items: []
  }
}
}

export const fetchVideoMetaInfo = async (videoIds, {
apiKey = '',
apiUrl = 'https://www.googleapis.com/youtube/v3/videos',
part = 'statistics, contentDetails',
} = {}) => {
try {
  const videos = encodeURIComponent(videoIds.join(','));
  const res = await fetch(`${apiUrl}?key=${apiKey}&part=${encodeURIComponent(part)}&type=video%2C%20playlist&id=${videos}`, {
    "headers": {
        "accept": "application/json"
    },
    "method": "GET",
    "mode": "cors",
    "credentials": "omit"
    });
    if(!res.ok) {
      return {};
    }
    const videoData = await res.json();
    return videoData.items;
} catch(e) {
  return {
  }
}
}

