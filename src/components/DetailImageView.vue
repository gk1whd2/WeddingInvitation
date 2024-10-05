<template>
	<div>
		<div class="bottom-sheet-container" v-show="isOpen">
			<div class="bottom-sheet" @click="handleClose">
				<div class="bottom-sheet-header" >
					<img class="image"	:src="PhotoUrl" @click.stop/>
					<img
						class="icon-close"
						@click.stop="handleClose"
						src="~@/assets/images/close.svg"
					/>
					<img class="icon-prev"
						@click.stop="handlePrev"
						src="~@/assets/images/icons/prev.png"
					/>
					<img class="icon-next"
						@click.stop="handleNext"
						src="~@/assets/images/icons/next.png"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: "DetailImageView",
	data() {
		return {
		};
	},
	props: {
		isOpen: {
			type: Boolean,
			default: false,
		},
		PhotoUrl : {
			type: String,
			default: '',
		}
	},
	methods: {
		handleClose() {
			this.$emit("close");
		},
		handleNext(){
			this.$emit('getOtherImage',1);
		},
		handlePrev(){
			this.$emit('getOtherImage',-1);
		},
	},
};
</script>

<style lang="scss" scoped>
.bottom-sheet-container {
	right: 0;
	left: 0;
	bottom: 0;
	top: 0;
	position: fixed;
	z-index: 9999;
	.bottom-sheet {
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.7);
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.bottom-sheet-header {
			position: relative;
			overflow: hidden;
			flex: 10 1;
			.image {
				height: 100%;
				width: 100%;
				object-fit: contain;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
			}
			.icon-close {
				position: absolute;
				right: 0;
				top: 0;
				padding: 16px;
				cursor: pointer;
			}
			.icon-next{
				position: absolute;
				background-color: rgba(255,255,255,0.6);
				right: 0;
				top: 45%;
				width: 60px;
				height: 60px;
				padding: 16px;
				cursor: pointer;
			}
			.icon-prev{
				position: absolute;
				background-color: rgba(255,255,255,0.6);
				left: 0;
				top: 45%;
				width: 60px;
				height: 60px;
				padding: 16px;
				cursor: pointer;
			}
		}
	}
}
</style>
