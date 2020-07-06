<template>
  <div class="home">
    <div class="home-top">
      <router-link :to="{ name: 'search' }" tag="div" class="search">
        <div class="icon"><mu-icon size="16" value="search"></mu-icon></div>
        <div class="search-text">这里有你爱听的歌，快搜索吧！</div>
      </router-link>
    </div>
    <div class="section selected-song-list">
      <div class="section-wrap">
        <div class="tit">精选歌单</div>
        <div class="list">
          <div class="list-over">
            <router-link
              class="item"
              v-for="item in PlayList.Recs"
              :key="item.id"
              :to="{ name: 'songList', params: { id: item.id } }"
            >
              <div class="thumb">
                <img :src="item.coverImgUrl" />
              </div>
              <div class="cell">
                <div class="desc">{{ item.name }}</div>
                <div class="play-num">
                  <mu-icon size="12" value="whatshot"></mu-icon>
                  {{ item.playCount }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="section"></div>
    <div class="section"></div>
    <div class="section"></div>
  </div>
</template>
<script>
import { GetTopPlayList } from "@/axios/data";
export default {
  data() {
    return {
      PlayList: {
        Limit: 8,
        Recs: []
      }
    };
  },
  created() {
    this.getTopPlayList();
  },
  methods: {
    async getTopPlayList() {
      let PlayList = this.PlayList;
      let topPlayList = await GetTopPlayList({
        limit: PlayList.Limit,
        order: "hot"
      });
      this.PlayList.Recs = topPlayList.playlists;
    }
  }
};
</script>
<style lang="less" scoped>
.home-top {
  width: 100%;
  padding: 20px 16px 10px 16px;
  box-sizing: border-box;
  .search {
    display: flex;
    align-items: center;
    height: 32px;
    background-color: #ddd;
    border-radius: 90px;
    padding: 0 10px;
    color: #999;
    .icon {
      height: 16px;
    }
    .search-text {
      margin-left: 6px;
      font-size: 14px;
    }
  }
}

.section {
  margin-bottom: 30px;
  .section-wrap {
    padding: 0 16px;
  }
}

.selected-song-list {
  .tit {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .list {
    width: 100%;
    overflow-x: hidden;
    .list-over {
      width: calc(100% + 20px);
      .item {
        position: relative;
        float: left;
        margin-right: 20px;
        margin-bottom: 20px;
        width: calc(50% - 20px);
        border-radius: 4px;
        .thumb {
          width: 100%;
          border-radius: 4px;
          img {
            display: block;
            width: 100%;
            border-radius: 4px;
          }
        }
        .cell {
          z-index: 2;
          position: absolute;
          width: 100%;
          height: 68px;
          left: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          box-sizing: border-box;
          padding: 4px 4px;
          color: #fff;
          font-size: 12px;
          line-height: 16px;
          .desc {
            margin-bottom: 4px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .play-num {
            position: absolute;
            right: 4px;
            bottom: 4px;
          }
        }
      }
    }
  }
}
</style>
