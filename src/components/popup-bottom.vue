<template>
	<div class="popup-bottom" :class="{'show': show}">
		<div class="shake" :style="{display: show?'block':'none'}" @click="handleClickShake"></div>
		<div class="dia">
			<div class="dia-header">
				<div class="play-type" @click="handleClickPlayType">
					<mu-icon size="18" :value="playTypeIconStr.icon"></mu-icon>
					<span class="play-type-text">{{playTypeIconStr.text}}</span>
				</div>
				<div class="allDel" @click="handleClickClearPlayList">
					<mu-icon size="18" value="delete"></mu-icon>
					<span class="allDel-text">清空</span>
				</div>
			</div>
			<div v-bar class="dia-content">
				<div>
					<mu-ripple class="song-item" color="#F45D5D" :class="{active: idx === index}" v-for="(song, idx) in playList" :key="song.id" @click="play(song)">
						<div class="progress"></div>
						<div class="pointer">
							<mu-icon size="22" color="#F45D5D" value="chevron_right"></mu-icon>
						</div>
						<div class="song-info">
							<div class="name">{{song.name}}</div>
							<div class="author">{{song.author}}</div>
						</div>
						<mu-button icon small color="#DDD" @click.stop="del(song)">
				   		<mu-icon size="18" value="close"></mu-icon>
				 		</mu-button>
					</mu-ripple>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { playTypeIconStr, findPlayList } from '@/libs/util'

export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		playList: {
			type: Array,
			default: function() {
				return [];
			}
		},
		playType: {
			type: Number,
			required: true
		}
	},
	computed: {
		...mapGetters('music',[
			'index',
			'playing'
		]),
		playTypeIconStr () {
			return playTypeIconStr(this.playType)
		}
	},
	watch: {
		show () {
			this.$nextTick(() => {
				let app = document.getElementById('app');
				if (this.show) {
					app.style.overflow = 'hidden';
				} else {
					app.style.overflow = 'visible';
				}
			})
		}
	},
	methods: {
		handleClickShake() {
			this.$emit('shake');
		},
		handleClickClearPlayList() {
			this.$emit('clearPlayList');
		},
		handleClickPlayType() {
			this.$emit('togglePlayType');
		},
		play(song) {
			let index = findPlayList(this.playList, song.id);
			if (index > -1) {
				this.$store.commit('music/SET_INDEX', index);
				this.$store.dispatch('music/_PLAY', song);
			}
		},
		del(song) {
			console.log(song);
		}
	}
}
</script>

<style lang="less" scoped>
.popup-bottom{
	.shake{
		z-index: 4810;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		transition: opacity .3s;
		opacity: 0;
	}
	.dia{
		z-index: 4811;
		position: fixed;
		width: 100%;
		height: 280px;
		background-color: rgba(0, 0, 0, .6);
		bottom: 0;
		left: 0;
		transition: transform .3s;
		transform: translateY(120%);
		.dia-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 42px;
			padding: 0 16px;
			color: #fff;
			.play-type{
				vertical-align: middle;
				.mu-icon{
					vertical-align: middle;
				}
				.play-type-text{
					margin-left: 6px;
					font-size: 16px;
					vertical-align: middle;
				}
			}
			.allDel{
				vertical-align: middle;
				.mu-icon{
					vertical-align: middle;
				}
				.allDel-text{
					margin-left: 6px;
					font-size: 16px;
					vertical-align: middle;
				}
			}
		}
		.dia-content{
			position: absolute !important;
			top: 42px;
			left: 0;
			right: 0;
			bottom: 0;
			width: 100%;
			overflow-y: scroll;
			box-sizing: border-box;
			padding: 6px 0;
			.song-item{
				position: relative;
				display: flex;
				height: 46px;
				justify-content: space-between;
				align-items: center;
				color: #fff;
				box-sizing: border-box;
				padding: 0 16px;
				.pointer{
					display: flex;
					width: 24px;
					height: 24px;
					justify-content: flex-start;
					align-items: center;
					transition: opacity .3s;
					opacity: 0;
				}				
				&.active{
					.pointer{
						opacity: 1;
					}
					.song-info{
						.name{
							color: #F45D5D;
						}
						.author{
							color: rgba(244, 93, 93, 0.6);
						}
					}
				}

				.song-info{
					flex: 1;
					padding-right: 10px;
					overflow: hidden;
					.name{
						font-size: 14px;
						margin-right: 8px;
				    overflow: hidden;
				    white-space: nowrap;
				    text-overflow: ellipsis;
				    word-wrap: break-word;
					}
					.author{
						font-size: 12px;
				    overflow: hidden;
				    white-space: nowrap;
				    text-overflow: ellipsis;
				    word-wrap: break-word;
					}
				}
				.del{
					display: flex;
					width: 24px;
					height: 24px;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}
	&.show{
		.shake{
			display: 1;
		}
		.dia{
			transform: translateY(0);
		}
	}
}
</style>