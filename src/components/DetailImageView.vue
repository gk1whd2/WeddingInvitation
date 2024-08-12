<template>
	<div>
		<div class="bottom-sheet-container" v-show="isOpen">
			<div class="bottom-sheet">
				<div class="bottom-sheet-header">
					<img class="image"	:src="PhotoUrl"/>
					<img
						class="icon-close"
						@click="handleClose"
						src="~@/assets/images/close.svg"
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
	.bottom-sheet {
		width: 100%;
		height: 100%;
		background: black;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.bottom-sheet-header {
			position: relative;
			overflow: hidden;
			flex: 10 1;
			.image {
				width: 100%;
				object-fit: cover;
				position: relative;
				top: 50%;
				transform: translateY(-50%);
			}
			.icon-close {
				position: absolute;
				right: 0;
				top: 0;
				padding: 16px;
				cursor: pointer;
			}
		}
	}
}
</style>
