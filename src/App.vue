<template>
  <div id="app">
    <!--进度：{{currentTime}} / {{duration}}
    <hr/>-->
    <audio id="media" ref="media" @timeupdate="timeupdate" @ended="ended" @play="play" @pause="pause" :src="playing.musicUrl"></audio>
    <keep-alive :include="cashViews">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        currentTime: 0,
        duration: 0,
        cashViews: ['Search']
      }
    },
    computed: {
      ...mapGetters('music', [
        'state',
        'playing',
        'playList',
        'index',
        'playType'
      ])
    },
    methods: {
      timeupdate () {
        this.$nextTick(() => {
          var media = this.$refs.media;
          this.$store.commit('music/SET_TIME',{currentTime: media.currentTime, duration: media.duration})
        })
      },
      ended () {
        switch (this.playType) {
          case 0:
            if(this.index >= this.playList.length-1){
              console.log('播放列表已播放完！！！')
            }else{
              this.$store.commit('music/SET_INDEX', this.index+1);
              this.$store.dispatch('music/_PLAY', this.playList[this.index]);
            }
            break;
          case 1:
            if(this.index >= this.playList.length-1){
              this.$store.commit('music/SET_INDEX', 0);
            }else{
              this.$store.commit('music/SET_INDEX', this.index+1);
            }
            this.$store.dispatch('music/_PLAY', this.playList[this.index]);
            break;
          case 2:
            this.$store.dispatch('music/_PLAY', this.playList[this.index]);
            break;
          case 3:
            this.$store.commit('music/SET_INDEX', Math.floor(Math.random()*this.playList.length));
            this.$store.dispatch('music/_PLAY', this.playList[this.index]);
            break;
        }
      },
      play () {
        this.$store.commit('music/SET_STATE', true);
      },
      pause () {
        this.$store.commit('music/SET_STATE', false);
      }
    }
  }
</script>
<style>
  html,body{background-color: #FFF;}
  main.topBarMrg{margin-top: 56px;}
  main.btmBarMrg{margin-bottom: 56px;}
</style>