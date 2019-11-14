<template>
	<mu-ripple class="song-item" color="#F45D5D">
		<div class="info">
			<div class="name">{{item.name}}</div>
			<div class="desc"><span class="author">{{item.author}}</span><span class="par">-</span><span class="album">{{item.album}}</span></div>
		</div>
		<mu-button icon small color="#666" @click="handleAction">
   		<mu-icon size="18" value="more_vert"></mu-icon>
 		</mu-button>
	</mu-ripple>
</template>

<script>
export default {
	props: {
		item: {
			type: Object,
			required: true
		}
	},
	methods: {
		handleAction() {
			this.$emit("clickAction", this.item);
		}
	}
}
</script>

<style lang="less" scoped>
.song-item{
	position: relative;
	display: flex;
	width: 100%;
	height: 52px;
	justify-content: space-between;
	align-items: center;
	padding: 0 16px;
	box-sizing: border-box;
	.info{
		flex: 1;
		overflow: hidden;
		padding-right: 10px;
		.name{
			font-size: 14px;
			color: rgba(0,0,0,.87);
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    word-wrap: break-word;
		}
		.desc{
	    overflow: hidden;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    word-wrap: break-word;
			color: rgba(0,0,0,.54);
			font-size: 12px;
			.par{
				margin: 0 6px;
			}
		}
	}
}
</style>