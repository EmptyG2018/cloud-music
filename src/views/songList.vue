<template>
	<div data-page='songList'>
		<div class="songList-top">
			<div class="back" @click="$router.back()">
				<mu-icon value="chevron_left"></mu-icon>
			</div>
		</div>
		<div class="infoBox">
			<div class="infoText">
				<div class="album">
					<div class="thumb">
						<img :src="coverImgUrl" />
					</div>
					<div class="cell">
						<h1 class="tit">{{name}}</h1>
						<p class="playNum">播放量：947.1万</p>
					</div>
				</div>
			</div>
			<img class="infoBg" :src="coverImgUrl" />
		</div>
		<div class="main">
			<div class="listHead">
				<div class="lft">
					<span class="songNum">歌单共{{list.length}}首</span>
				</div>
				<div class="rht">
					<div class="icon-item">
						<mu-button flat small color="#F45D5D" @click="addPlayLists">
							<mu-icon value="play_circle_outline" left></mu-icon>播放全部
						</mu-button>
					</div>
					<div class="icon-item">
						<mu-button flat small>
							<mu-icon value="favorite_border" left></mu-icon>收藏
						</mu-button>					
					</div>				
				</div>
			</div>
			<div class="song-list">
				<song-item v-for="item in dataList" :key="item.id" :item="item" @clickAction="clickAction"></song-item>
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
				<mu-list-item button @click="addPlayListOne">
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
import { GetPlaylistDetail } from '@/axios/data'
import { mapGetters } from 'vuex'
import SongItem from '@/components/song-item.vue'
import { findPlayList, findPlayListsIndex, authors } from '@/libs/util'

export default {
	name: 'songList',
	components: {
		SongItem
	},
	data () {
		return {
			open: false,
			offsetSelectSong: null,
			coverImgUrl: '',
			name: '',
			list: []
		}
	},
	computed: {
		...mapGetters('music',[
			'playList',
			'index'
		]),
		dataList() {
			let list = this.list;
			let arr = [];
			for (let i = 0, j = list.length; i < j; i++) {
				let { id, name } = list[i];
				let author = authors(list[i].ar);
				let album = list[i].al.name;
				arr.push({id: id, name: name, author: author, album: album});
			}
			return arr;
		}
	},
	created() {
		this.getPlaylistDetail();
	},
	methods: {
		async getPlaylistDetail() {
			let playListDetail = await GetPlaylistDetail({ id: this.$route.params.id });
			let { coverImgUrl, name, tracks} = playListDetail.playlist;
			this.coverImgUrl = coverImgUrl;
			this.name = name;
			this.list = tracks;
		},
		play () {
			let song = this.offsetSelectSong;
			this.$store.commit('music/SET_PLAY_LIST', this.dataList);
			let index = findPlayList(this.list, song.id);
			this.$store.commit('music/SET_INDEX', index);
			this.$store.dispatch('music/_PLAY', song);
		},
		addPlayListOne(){
			let song = this.offsetSelectSong;
			let { playList, delIndex } = findPlayListsIndex(this.playList, song, this.index);
			if (playList.length > 0) {
				playList.push(song);
				this.$store.commit('music/SET_PLAY_LIST', playList);
				if (delIndex === -1) {
					this.$store.commit('music/SET_INDEX', playList.length-1);
				} else {
					this.$store.commit('music/SET_INDEX', this.index - delIndex);
				}
			} else {
				this.$store.commit('music/SET_PLAY_LIST', [song]);
			}
		},
		addPlayLists() {
			this.$store.commit('music/SET_PLAY_LIST', this.dataList);
			this.$store.commit('music/SET_INDEX', 0);
			this.$store.dispatch('music/_PLAY', this.dataList[0]);
		},

		clickAction(song) {
			this.offsetSelectSong = song;
			this.open = true;
		}
	}
}
</script>
<style lang="less" scoped>
.songList-top{
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	align-items: center;
	width: 100%;
  padding: 20px 16px 10px 16px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  .back{
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	width: 32px;
  	height: 32px;
  	margin-right: 10px;
  }
}
.infoBox{
	position: relative;
	height: 200px;
 .infoBg{
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		-webkit-filter: blur(36px);
		z-index: 3;
	}
	.infoText{
		position: absolute;
		top: 0; 
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 4;
		.album{
			display: box;
			display: -webkit-box;
			margin-top: 64px;
			padding: 0 16px;
			.thumb{
				width: 125px;
				margin-right: 10px;
				overflow: hidden;	
				img{
					display: block;
					width: 100%;
					height: 100%;
				}				
			}
			.cell{
				box-flex: 1;
				-webkit-box-flex: 1;
				.tit{
					margin: 10px 0 0 0;
					font-size: 18px;
					color: #FFF;
					font-weight: 400;
				}
				.playNum{
					margin: 10px 0 0 0;
					font-size: 12px;
					color: #FFF;
				}
			}
		}
	}
}
.listHead{
	padding: 0 10px;
	height: 32px;
	line-height: 32px;
	&:after{
		content: "";
		display: block;
		clear: both;
	}
	.lft{
		float: left;
	}
	.rht{
		float: right;
	}
	.icon-item{
		float: left;
		margin-left: 4px;
	}
}
</style>