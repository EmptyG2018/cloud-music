import axios_default from "./axios_default";

// 获取歌单 ( 网友精选碟 )
export const GetTopPlayList = form => {
  return axios_default({
    url: "top/playlist",
    method: "GET",
    params: form
  });
};

// 获取歌单详情
export const GetPlaylistDetail = form => {
  return axios_default({
    url: "playlist/detail",
    method: "GET",
    params: form
  });
};

// 获取搜索结果
export const GetSearchResult = form => {
  return axios_default({
    url: "search",
    method: "GET",
    params: form
  });
};

// 获取歌曲资源链接
export const GetMusicUrl = form => {
  return axios_default({
    url: "song/url",
    method: "GET",
    params: form
  });
};

export const GetMV = form => {
  return axios_default({
    url: "mv",
    method: "GET",
    params: form
  });
};
