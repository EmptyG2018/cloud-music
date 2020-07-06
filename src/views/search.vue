<template>
  <div class="search">
    <div class="search-top">
      <div class="back" @click="$router.back()">
        <mu-icon value="chevron_left"></mu-icon>
      </div>
      <div class="search">
        <div class="icon"><mu-icon size="16" value="search"></mu-icon></div>
        <input
          class="search-controls"
          @keyup.enter="getSearchResult"
          @keyup="handleUpSongLen"
          v-model.trim="val"
          placeholder="这里有你爱听的歌，快搜索吧！"
          type="text"
        />
      </div>
    </div>
    <div class="section songs-result">
      <div class="songs-len" v-show="songLenShow">
        关于"<span style="color: #F14F48">{{ val }}</span
        >"的歌曲，共{{ data.count }}首歌曲
      </div>
      <div class="">
        <song-item
          v-for="item in dataList"
          :key="item.id"
          :item="item"
          @clickAction="clickAction"
        ></song-item>
      </div>
    </div>

    <mu-bottom-sheet :open.sync="open">
      <mu-list @item-click="open = false">
        <mu-sub-header>Select One</mu-sub-header>
        <mu-list-item button @click="play">
          <mu-list-item-action>
            <mu-icon value="play_arrow" color="orange"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>播放</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button @click="addPlayList">
          <mu-list-item-action>
            <mu-icon value="playlist_add" color="blue"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>添加至播放列表</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="vertical_align_bottom" color="green"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>下载</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-action>
            <mu-icon value="share" color="cyan"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>分享</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-bottom-sheet>
  </div>
</template>
<script>
import { GetSearchResult } from "@/axios/data";
import { mapGetters } from "vuex";
import { findPlayListsIndex, authors } from "@/libs/util";
import SongItem from "@/components/song-item.vue";

export default {
  name: "Search",
  components: {
    SongItem
  },
  data() {
    return {
      songLenShow: false,
      open: false,
      offsetSelectSong: null,
      val: "",
      fruits: ["Apple", "Apricot", "Avocado"],
      data: {
        count: null,
        list: []
      }
    };
  },
  computed: {
    ...mapGetters("music", ["playList", "index"]),
    dataList() {
      let list = this.data.list;
      let arr = [];
      for (let i = 0, j = list.length; i < j; i++) {
        let { id, name } = list[i];
        let author = authors(list[i].artists);
        let album = list[i].album.name;
        arr.push({ id: id, name: name, author: author, album: album });
      }
      return arr;
    }
  },
  methods: {
    async getSearchResult() {
      let searchResult = await GetSearchResult({ keywords: this.val });
      [this.data.count, this.data.list] = [
        searchResult.result.songCount,
        searchResult.result.songs
      ];
      this.songLenShow = true;
    },

    play() {
      let song = this.offsetSelectSong;
      let { playList, delIndex } = findPlayListsIndex(
        this.playList,
        song,
        this.index
      );
      if (playList.length > 0) {
        if (delIndex === -1) {
          if (this.index > 0) {
            playList.splice(this.index, 0, song);
            this.$store.commit("music/SET_PLAY_LIST", playList);
          } else {
            playList.unshift(song);
            this.$store.commit("music/SET_PLAY_LIST", playList);
            this.$store.commit("music/SET_INDEX", 0);
          }
        } else if (delIndex === 0) {
          playList.splice(this.index + 1, 0, song);
          this.$store.commit("music/SET_PLAY_LIST", playList);
          this.$store.commit("music/SET_INDEX", this.index + 1);
        } else {
          playList.splice(this.index, 0, song);
          this.$store.commit("music/SET_PLAY_LIST", playList);
        }
      } else {
        this.$store.commit("music/SET_PLAY_LIST", [song]);
        this.$store.commit("music/SET_INDEX", 0);
      }
      this.$store.dispatch("music/_PLAY", song);
    },

    addPlayList() {
      let song = this.offsetSelectSong;
      let { playList, delIndex } = findPlayListsIndex(
        this.playList,
        song,
        this.index
      );
      if (playList.length > 0) {
        playList.push(song);
        this.$store.commit("music/SET_PLAY_LIST", playList);
        if (delIndex === -1) {
          this.$store.commit("music/SET_INDEX", playList.length - 1);
        } else {
          this.$store.commit("music/SET_INDEX", this.index - delIndex);
        }
      } else {
        this.$store.commit("music/SET_PLAY_LIST", [song]);
      }
    },

    handleUpSongLen() {
      this.songLenShow = false;
    },

    clickAction(song) {
      this.offsetSelectSong = song;
      this.open = true;
    }
  }
};
</script>
<style lang="less" scoped>
.search-top {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px 16px 10px 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  .back {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
  .search {
    display: flex;
    flex: 1;
    align-items: center;
    height: 32px;
    background-color: #ddd;
    border-radius: 90px;
    padding: 0 10px;
    color: #999;
    .icon {
      height: 16px;
    }
    .search-controls {
      outline: none;
      border: none;
      background: transparent;
      color: #999;
      display: block;
      width: 100%;
      margin-left: 6px;
      font-size: 14px;
      &::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #999;
        font-size: 14px;
      }
    }
  }
}
.section {
  margin-bottom: 30px;
  .section-wrap {
    padding: 0 16px;
  }
}

.songs-result {
  .songs-len {
    font-size: 12px;
    line-height: 22px;
    color: #999;
    text-align: center;
    padding: 10px 0;
  }
}
</style>
