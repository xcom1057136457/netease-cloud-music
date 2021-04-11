import request from "./request";

// 获取Banner
export function getBannerData(params) {
  return request({
    url: "/banner",
    method: "GET",
    params
  });
}

// 推荐歌单
export function getPersonalized(params) {
  return request({
    url: "/personalized",
    method: "GET",
    params
  });
}

// 新碟上架
export function getNews() {
  return request({
    url: "/album/newest",
    method: "GET"
  });
}

// 入驻歌手
export function getArtistList(params) {
  return request({
    url: "/artist/list",
    method: "GET",
    params
  });
}

// 热门歌手
export function getDjPopular(params) {
  return request({
    url: "/dj/toplist/popular",
    method: "GET",
    params
  });
}

// 榜单
export function getToplist() {
  return request({
    url: "/toplist",
    method: "GET"
  });
}

// 获取歌单详情
export function getPlayList(params) {
  return request({
    url: "/playlist/detail",
    method: "GET",
    params
  });
}

// 获取音乐URL
export function getSongURL(params) {
  return request({
    url: "/song/url",
    method: "GET",
    params
  });
}

// 音乐是否可用
export function checkMusic(params) {
  return request({
    url: "/check/music",
    method: "GET",
    params
  });
}

// 歌单 ( 网友精选碟 )
export function topPlaylist(params) {
  return request({
    url: "/top/playlist",
    method: "GET",
    params
  });
}

// 歌单分类
export function playlistCatlist() {
  return request({
    url: "/playlist/catlist",
    method: "GET"
  });
}

// 歌单收藏者
export function playlistSubscribers(params) {
  return request({
    url: "/playlist/subscribers",
    method: "GET",
    params
  });
}

// 获取相似歌单
export function simiPlaylist(params) {
  return request({
    url: "/related/playlist",
    method: "GET",
    params
  });
}

// 歌单评论
export function commentPlaylist(params) {
  return request({
    url: "/comment/playlist",
    method: "GET",
    params
  });
}

// 数字专辑详情
export function albumDetail(params) {
  return request({
    url: "/album",
    method: "GET",
    params
  });
}

// 专辑评论
export function commentAlbum(params) {
  return request({
    url: "/comment/album",
    method: "GET",
    params
  });
}

// 专辑动态信息
export function albumDetailDynamic(params) {
  return request({
    url: "/album/detail/dynamic",
    method: "GET",
    params
  });
}

// 获取歌手专辑
export function artistAlbum(params) {
  return request({
    url: "/artist/album",
    method: "GET",
    params
  });
}

// 获取歌词
export function lyric(params) {
  return request({
    url: "/lyric",
    method: "GET",
    params
  });
}

// 电台个性推荐
export function djPersonalizeRecommend(params) {
  return request({
    url: "/dj/personalize/recommend",
    method: "GET",
    params
  });
}

// 电台 - 分类
export function djCatelist(params) {
  return request({
    url: "/dj/catelist",
    method: "GET",
    params
  });
}

// 电台 - 推荐
export function djRecommend(params) {
  return request({
    url: "/dj/recommend",
    method: "GET",
    params
  });
}

// 电台 - 节目榜
export function djProgramToplist(params) {
  return request({
    url: "/dj/program/toplist",
    method: "GET",
    params
  });
}

// 推荐节目
export function programRecommend() {
  return request({
    url: "/program/recommend",
    method: "GET"
  });
}
