const fetch = require("node-fetch");
const Cache = require("@11ty/eleventy-cache-assets");

const apiKey = process.env.YT_API_KEY;

const getPlaylistItem = async (playlistId) => {
    const apiUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
    const maxResults = 50;
    const order = 'viewCount';
    const url = `${apiUrl}?key=${apiKey}&part=${encodeURIComponent('snippet,contentDetails')}&type=video%2C%20playlist&maxResults=${maxResults}&playlistId=${playlistId}&order=${order}`;

    console.log(`Fetching YouTube videos for playlist: ${playlistId}`);
    const videos = await Cache(url, {
        duration: "1d", // 1 day
        type: "json" // also supports "text" or "buffer"
     });

    const videoIds = videos.items.map(({contentDetails}) => contentDetails.videoId);
    const  metaInfo = await fetchMetaInfo(videoIds);
    return {
        videos: videos.items.map(({snippet, contentDetails}) => {
            const  hqThumbnail =  snippet.thumbnails.maxres || snippet.thumbnails.high || snippet.thumbnails.medium || snippet.thumbnails.default;
            const  smallThumbnail = snippet.thumbnails.medium || snippet.thumbnails.default;
            const defaultThumbnail = snippet.thumbnails.high;
            const extract = (values, name = '') => {
                return  Object.keys(values).reduce((acc, curr) => {
                    const  capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1)
                     return {
                        ...acc,
                        [`${name}${capitalize(curr)}`] : values[curr]
                    }
                }, {});
            };
            return {
                ...extract(hqThumbnail, 'hqThumbnail'),
                ...extract(smallThumbnail, 'smallThumbnail'),
                ...extract(defaultThumbnail, 'defaultThumbnail'),
                channelTitle: snippet.channelTitle,
                channelId: snippet.channelId,
                title: snippet.title,
                id: contentDetails.videoId,
                ...(metaInfo[contentDetails.videoId] || {}),
            }
        }),
        hasMore: Boolean(videos.nextPageToken)
    }
};

const fetchMetaInfo = async (videoIds) => {
    const part = 'statistics, contentDetails';
    const metadataApi = 'https://www.googleapis.com/youtube/v3/videos';
    const videos = encodeURIComponent(videoIds.join(','));
    const metadataUrl = `${metadataApi}?key=${apiKey}&part=${encodeURIComponent(part)}&type=video%2C%20playlist&id=${videos}`
    try {
        const metaInfo = await Cache(metadataUrl, {
            duration: "1d", // 1 day
            type: "json" // also supports "text" or "buffer"
        })
        return videoIds.reduce((vids, current, index) => {
            const data =  metaInfo.items[index];
            const metadata = {
                duration: data.contentDetails.duration,
                views: data.statistics.viewCount
            }
            return {
                ...vids,
                [current]:metadata
            }
        }, {});
    } catch(e) {
        console.error(e);
        return {}
    }
p
}

module.exports.getPlaylists = async (playlists) => {
    if(!playlists) {
        return [];
    }
    const lists = await Promise.all(playlists.map((async ({id, title, description}) => {
        const content = await getPlaylistItem(id);
        return {
            title,
            id,
            description,
            link: `https://www.youtube.com/playlist?list=${id}`,
            ...(content || {}),
        };
    })));
    return lists;
}