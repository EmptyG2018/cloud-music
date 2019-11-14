<template>
	<div class="layout">
    <keep-alive :include="cashViews">
      <router-view />
    </keep-alive>
		<div class="musicBar">
			<div class="Bar-progress">
				<mu-linear-progress mode="determinate" color="#F45D5D" :size="2" :value="time"></mu-linear-progress>
			</div>
			<div class="Bar-box">
				<div class="Bar-cell" @click="$router.push('/player')">
					<div class="thum">
						<img :src="musicFile" alt="" />
					</div>
					<div class="info">
						<h4>{{playing.name}}</h4>
						<p class="author">{{playing.author}}</p>
					</div>
				</div>
				<div class="Bar-icons">
					<mu-button normal icon @click="playToggle">
						<mu-icon v-show="!state" value="play_arrow"></mu-icon>
						<mu-icon v-show="state" value="stop"></mu-icon>
					</mu-button>
					<mu-button normal icon @click="openFullscreenDialog">
						<mu-icon value="queue_music"></mu-icon>
					</mu-button>					
				</div>
			</div>
		</div>

		<popup-bottom :show="show" :playType="playType" @togglePlayType="togglePlayType" @shake="popupClose" @clearPlayList="clearPlayList" :playList="playList"></popup-bottom>
<!-- 
		<mu-dialog transition="slide-bottom" fullscreen :open.sync="openFullscreen">
			<mu-appbar color="primary" title="播放列表">
				<mu-button slot="left" icon @click="closeFullscreenDialog">
				<mu-icon value="close"></mu-icon>
				</mu-button>
				<mu-button slot="right" flat  @click="closeFullscreenDialog">
					<mu-icon value="close"></mu-icon>
				</mu-button>
			</mu-appbar>
			<mu-list :value="index">
				<mu-list-item :value="ix" v-for="(item, ix) in playList" :key="item.id" button :ripple="false">
				  <mu-list-item-title>{{item.id}} - {{item.name}}</mu-list-item-title>
				  <mu-list-item-action @click="delPlayList(ix)">
					<mu-icon value="delete"></mu-icon>
				  </mu-list-item-action>
				</mu-list-item>			
			</mu-list>			
		</mu-dialog>	 -->	
		
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import PopupBottom from '@/components/popup-bottom.vue'
import musicFile from '@/assets/images/music_file.png'
export default {
	components: {
		PopupBottom
	},
	data () {
		return {
      cashViews: ['Search'],
			musicFile,
			show: false,
			openFullscreen: false
		}
	},
	computed: {
		...mapGetters('music', [
			'state',
			'playing',
			'playList',
			'index',
			'playType'
		]),
		time () {
			return this.playing.time.currentTime/this.playing.time.duration*100;
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

		openFullscreenDialog () {
			this.show = true;
			// this.openFullscreen = true;
		},
		closeFullscreenDialog () {
			// this.openFullscreen = false;
		},
		delPlayList (index) {
			this.$store.commit("music/delPlayList", index);
		},
		clearPlayList() {
			this.$store.commit('music/SET_PLAY_LIST', []);
			this.$store.commit('music/SET_INDEX', -1);
			this.$store.commit('music/SET_MEDIA', {id: '', musicUrl: '', name: '', author: '', album: '', time: { currentTime: 0, duration: 0}});
		},
		togglePlayType () {
			if (this.playType >= 3) {
				this.$store.commit('music/SET_PLAY_TYPE', 0);
			} else {
				this.$store.commit('music/SET_PLAY_TYPE', this.playType+1);
			}
		},
		popupClose() {
			this.show = false;
		}
	}
}
</script>
<style lang="less" scoped>
.view{
	position: fixed !important;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
.musicBar{
	z-index: 99;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background-color: #FFF;
	.Bar-icons{
		position: absolute;
		top: 4px;
		right: 0;
	}
	.Bar-box{
		position: relative;
		height: 56px;
		&:before{
			content: "";
			display: table;
		}
		.Bar-cell{
			margin-top: 4px;
			box-sizing: border-box;
			padding-right: 96px;
			height: 48px;
			&:after{
				content: "";
				display: block;
				clear: both;
			}
			.thum{
				float: left;
				margin-left: 4px;
				border-radius: 4px;
				img{
					display: block;
					width: 48px;
					height: 48px;
					border-radius: 4px;
				}
			}
			.info{
				float: left;
				margin-left: 4px;
				h4{
					margin-top: 2px;
					margin-bottom: 0;
				}
				.author{
					margin: 0;
					color: #666;
					overflow: hidden;
					text-overflow:;
					white-space: norwal;
				}
			}
		}
	}
}

</style>