import Vue from "vue";
import { GetMusicUrl } from "@/axios/data";
import {
  getPlayListSession,
  setPlayListSession,
  getIndexSession,
  setIndexSession,
  getPlayTypeSession,
  setPlayTypeSession,
  getPlayingSession,
  setPlayingSession
} from "@/libs/util";

let playing = getPlayingSession();

const music = {
  namespaced: true,
  state: {
    playList: getPlayListSession(), //播放列表
    playType: getPlayTypeSession(), //播放类型：0.顺序播放，1.列表循环，2.单曲循环，3.随机播放
    index: getIndexSession(), //播放索引 -1表示指针不在播放列表中
    loading: false, //歌曲是否在加载
    state: false, //歌曲是否在播放
    playing: {
      //正在播放歌曲信息
      id: playing.id,
      name: playing.name,
      author: playing.author,
      musicUrl: playing.musicUrl,
      album: playing.album,
      time: { currentTime: 0, duration: 0 }
    }
  },
  getters: {
    state: state => state.state,
    playing: state => state.playing,
    playList: state => state.playList,
    loading: state => state.loading,
    index: state => state.index,
    playType: state => state.playType
  },
  mutations: {
    // 设置正在播放信息
    SET_MEDIA(state, song) {
      state.playing.id = song.id;
      state.playing.musicUrl = song.musicUrl;
      state.playing.name = song.name;
      state.playing.author = song.author;
      state.playing.album = song.album;
      setPlayingSession(song);
    },

    // 设置歌曲状态
    SET_STATE(state, playState) {
      state.state = playState;
    },

    // 设置播放列表指针
    SET_INDEX(state, index) {
      state.index = index;
      setIndexSession(index);
    },

    // 设置播放列表
    SET_PLAY_LIST(state, songs) {
      state.playList = songs;
      setPlayListSession(songs);
    },

    // 设置歌曲加载状态
    SET_LOADING(state, loading) {
      state.loading = loading;
    },

    // 切换播放类型(：0.顺序播放，1.列表循环，2.单曲循环，3.随机播放)
    SET_PLAY_TYPE(state, type) {
      state.playType = type;
      setPlayTypeSession(type);
    },

    // 设置当前播放时间和播放总时间
    SET_TIME(state, data) {
      state.playing.time.currentTime = data.currentTime;
      state.playing.time.duration = data.duration;
    }
  },
  actions: {
    // 加载音频资源且播放
    async _PLAY({ commit }, song) {
      let songUrl = await GetMusicUrl({ id: song.id });
      let { url } = songUrl.data[0];
      commit("SET_MEDIA", { musicUrl: url, ...song });
      Vue.nextTick(() => {
        document.getElementById("media").play();
      });
    }
  }
};
export default music;
