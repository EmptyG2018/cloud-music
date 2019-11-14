<template>
	<div  data-page='mv'>
		<mu-appbar style="width: 100%;" :color="appbarBg" textColor="#A611F4" :z-depth="0">
			<mu-button icon slot="left" @click="$router.back()">
				<mu-icon value="chevron_left"></mu-icon>
			</mu-button>
			xxx
		</mu-appbar>
		<main v-scroll="scroll">
			<video class="video" :src="data.src" controls=""></video>
			<div class="card-list">
				<div class="header">精彩评论</div>
				<div class="card" v-for="item in data.hotComments" :key="item.id">
					<div class="card-header">
						<div class="avatar">
							<div class="avatar-inner">
								<img :src="item.user.avatarUrl" />
							</div>
						</div>
						<div class="card-header-title">
							<div class="card-title">{{item.user.nickname}}</div>
							<div class="card-sub-title">{{item.time}}</div>
						</div>
					</div>
					<div class="card-text">
						{{item.content}}
					</div>
					<div class="card-actions">
						<mu-button flat>
							<mu-icon value="thumb_up" left></mu-icon>{{item.likedCount}}
						</mu-button>
						<mu-button flat>
							<mu-icon value="textsms" left></mu-icon>回复
						</mu-button>
					</div>
				</div>
			</div>
			<div class="card-list">
				<div class="header">最新评论(1273)</div>
				<mu-card style="width: 100%;">
					<mu-card-header title="Myron Avatar" sub-title="sub title">
						<mu-avatar slot="avatar">
							<img src="">
						</mu-avatar>
					</mu-card-header>
					<mu-card-text>
					
					找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
					</mu-card-text>
					<mu-card-actions>
						<mu-button flat>Action 1</mu-button>
						<mu-button flat>Action 2</mu-button>
					</mu-card-actions>
				</mu-card>
			</div>			
		</main>		
	
	</div>
</template>
<script>
// import { GetMV } from '@/axios/data'
export default {
	data () {
		return {
			scrollTop: 0,
			data: {
				src: null,
				comments: [],
				hotComments: []	
			}

		}
	},
	computed: {
		appbarBg () {
			if(this.scrollTop>240){
				return "rgba(255,255,255, 1)";
			}else{
				return "rgba(255,255,255, "+this.scrollTop/240+")";
			}
		}
	},
	async created () {
		this.getMV();

		// let url = await axios.get('/mv',{
		// 	params: {
		// 		mvid: this.$route.params.Id
		// 	}
		// })
		// if(url.status==200){
		// 	if(url.data.code==200){
		// 		this.data.src = url.data.data.brs[480];
		// 	}
		// }
		// let comment = await axios.get('/comment/mv',{
		// 	params: {
		// 		id: this.$route.params.Id
		// 	}
		// })
		// if(comment.status==200){
		// 	if(comment.data.code==200){
		// 		//this.data.comments = comment.data.comments;
		// 		this.data.hotComments = comment.data.hotComments;
		// 	}
		// }
	},
	mounted () {
		this.scrollTop = window.scrollY;
	},
	methods: {
		// async GetMV() {
		// 	GetMV({})
		// },
		scroll () {
			this.scrollTop = window.scrollY;
		}
	}
}
</script>
<style lang="less" scoped>
	.video{
		width: 100%;
		display: block;
	}
	.mu-appbar{
		position: fixed;
		top: 0;
	}	
	.card-list{
		margin-bottom: 20px;
		.header{
	    color: rgba(0,0,0,.54);
	    font-size: 14px;
	    line-height: 48px;
	    padding-left: 16px;
	    width: 100%;
		}
		.card{
			width: 100%;
			border-bottom: 1px solid #eee;
			.card-header{
				padding: 16px;
				font-weight: 500;
				position: relative;
				white-space: nowrap;
				.avatar{
					display: inline-block;
					color: #FFF;
					background-color: #bdbdbd;
					text-align: center;
					border-radius: 50%;
					width: 40px;
					height: 40px;
					font-size: 20px;
					.avatar-inner{
						display: -webkit-box;
						display: -ms-flexbox;
						display: flex;
						width: 100%;
						height: 100%;
						-webkit-box-align: center;
						-ms-flex-align: center;
						align-items: center;
						-webkit-box-pack: center;
						-ms-flex-pack: center;
						justify-content: center;
						img{
							border-radius: 50%;
							width: 100%;
							height: 100%;
							display: block;
						}
					}
				}
				.card-header-title{
					display: inline-block;
					vertical-align: top;
					white-space: normal;
					padding-right: 90px;
					.card-title{
						font-size: 15px;
						color: rgba(0,0,0,.87);
					}
					.card-sub-title{
						font-size: 14px;
						color: rgba(0,0,0,.57);
					}
				}
			}
			.card-text{
				padding: 16px;
				font-size: 14px;
				color: rgba(0,0,0,.87);
			}
			.card-actions{
				padding: 8px;
				position: relative;
				text-align: right;
			}
		}
	}
</style>