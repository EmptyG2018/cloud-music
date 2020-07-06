<template>
  <div class="player">
    <div class="player-top">
      <div class="back" @click="$router.back()">
        <mu-icon value="chevron_left"></mu-icon>
      </div>
    </div>
    <div class="main">
      <div class="title">
        <h2 class="song_name">{{ playing.name }}</h2>
        <span class="author">{{ playing.author }}</span>
      </div>
      <div class="music_box play pause">
        <img
          src="https://p1.music.126.net/RF7mNeqneGi9EBGo4uqUvA==/59373627916982.jpg"
        />
      </div>
      <div class="controls">
        <div class="controls_row">
          <mu-flex class="flex-wrapper">
            <mu-flex class="flex-demo" justify-content="start" fill>
              <mu-button icon>
                <mu-icon value="star_border"></mu-icon>
              </mu-button>
            </mu-flex>
            <mu-flex class="flex-demo" justify-content="end" fill>
              <mu-button icon>
                <mu-icon value="vertical_align_bottom"></mu-icon>
              </mu-button>
            </mu-flex>
          </mu-flex>
        </div>
        <div class="controls_row">
          <div class="progress">
            <div class="flex-wrapper">
              <mu-slider
                @change="setProgress"
                color="#F45D5D"
                :max="playing.time.duration"
                v-model="time"
                :display-value="false"
              ></mu-slider>
              <div class="info">
                <mu-flex>
                  <mu-flex class="flex-demo" justify-content="start" fill>
                    {{ currentTime }}
                  </mu-flex>
                  <mu-flex class="flex-demo" justify-content="end" fill>
                    {{ duration }}
                  </mu-flex>
                </mu-flex>
              </div>
            </div>
          </div>
        </div>
        <div class="controls_row">
          <mu-flex class="flex-wrapper">
            <mu-flex class="flex-demo" justify-content="center" fill>
              <mu-button icon @click="togglePlayType">
                <mu-icon :value="playTypeIconStr.icon"></mu-icon>
              </mu-button>
            </mu-flex>
            <mu-flex class="flex-demo" justify-content="center" fill>
              <mu-button icon @click="before">
                <mu-icon value="skip_previous"></mu-icon>
              </mu-button>
            </mu-flex>
            <mu-flex class="flex-demo" justify-content="center" fill>
              <mu-button icon @click="playToggle">
                <mu-icon v-show="!state" size="36" value="play_arrow"></mu-icon>
                <mu-icon v-show="state" size="36" value="stop"></mu-icon>
              </mu-button>
            </mu-flex>
            <mu-flex class="flex-demo" justify-content="center" fill>
              <mu-button icon @click="after">
                <mu-icon value="skip_next"></mu-icon>
              </mu-button>
            </mu-flex>
            <mu-flex class="flex-demo" justify-content="center" fill>
              <mu-button icon>
                <mu-icon value="queue_music"></mu-icon>
              </mu-button>
            </mu-flex>
          </mu-flex>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { playTypeIconStr } from "@/libs/util";

export default {
  data() {
    return {
      progress_value: 0
    };
  },
  computed: {
    ...mapGetters("music", [
      "state",
      "playing",
      "playType",
      "index",
      "playList"
    ]),
    currentTime() {
      var min = Math.floor(this.playing.time.currentTime / 60);
      if (min < 10) {
        min = "0" + min;
      }
      var sec = parseInt(this.playing.time.currentTime % 60);
      if (sec < 10) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    },
    duration() {
      var min = Math.floor(this.playing.time.duration / 60);
      if (min < 10) {
        min = "0" + min;
      }
      var sec = parseInt(this.playing.time.duration % 60);
      if (sec < 10) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    },
    time: {
      get() {
        return this.playing.time.currentTime;
      },
      set(val) {
        this.$parent.$refs.media.currentTime = val;
      }
    },
    playTypeIconStr() {
      return playTypeIconStr(this.playType);
    }
  },
  methods: {
    playToggle() {
      if (this.state) {
        this.$parent.$refs.media.pause();
      } else {
        this.$parent.$refs.media.play();
      }
    },
    before() {
      if (this.index <= 0) {
        console.log("没有上曲");
      } else {
        this.$store.commit("music/SET_INDEX", this.index - 1);
        this.$store.dispatch("music/_PLAY", this.playList[this.index]);
      }
    },
    after() {
      if (this.index >= this.playList.length - 1) {
        console.log("没有下曲");
      } else {
        this.$store.commit("music/SET_INDEX", this.index + 1);
        this.$store.dispatch("music/_PLAY", this.playList[this.index]);
      }
    },
    togglePlayType() {
      if (this.playType >= 3) {
        this.$store.commit("music/SET_PLAY_TYPE", 0);
      } else {
        this.$store.commit("music/SET_PLAY_TYPE", this.playType + 1);
      }
    },
    setProgress(val) {
      this.val = val;
    }
  }
};
</script>
<style lang="less" scoped>
.player-top {
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
}
.main {
  .title {
    position: fixed;
    top: 68px;
    width: 100%;
    text-align: center;
    .song_name {
      font-size: 24px;
      font-weight: 400;
      margin-bottom: 5px;
      color: #ab82ee;
    }
    .author {
      font-size: 16px;
      color: #ab82ee;
    }
  }
  .music_box {
    position: fixed;
    border-radius: 50%;
    width: 190px;
    height: 190px;
    left: 50%;
    top: 54%;
    margin-top: -140px;
    margin-left: -95px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
  .controls {
    position: fixed;
    bottom: 20px;
    width: 100%;
    .controls_row {
      .progress {
        padding-bottom: 10px;
        .info {
          margin-top: -16px;
        }
      }
      .flex-wrapper {
        padding: 0 20px;
      }
    }
  }
}
</style>
