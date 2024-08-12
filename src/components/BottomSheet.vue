<template>
	<div>
	<transition name="fade" appear>
		<div class="overlay" v-show="isOpen" @click="handleClose" />
	</transition>

	<transition name="slide" appear>
		<div class="bottom-sheet-container" v-show="isOpen">
		<div class="bottom-sheet">
			<div class="bottom-sheet-header">
				<img class="image"	:src="PhotoUrl"/>
			<img
				class="icon-close"
				@click="handleClose"
				src="~@/assets/images/close.svg"
			/>
				<button
				class="button-bottom"
				@click="handleClose"
				>
				확인
				</button>
			</div>
		</div>
		</div>
	</transition>
	</div>
</template>

<script>

export default {
	name: "BottomSheet",
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
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
	opacity: 0;
}

.slide-enter-active {
	transition: all 0.28s ease-in-out;
}
.slide-leave-active {
	transition: all 0.28s ease-in-out;
}
.slide-enter,
.slide-leave-to {
	transform: translateY(100%);
}

.overlay {
	right: 0;
	left: 0;
	bottom: 0;
	top: 0;
	background-color: rgba(0, 0, 0, 0.6);
	position: fixed;
	z-index: 999;
}

.bottom-sheet-container {
	right: 0;
	left: 0;
	bottom: 0;
	top: 0;
	position: fixed;
	z-index: 999;
	margin-top: 50px;

	.bottom-sheet {
	width: 100%;
	height: 100%;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	background: white;
	z-index: 9999;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	.bottom-sheet-header {
		position: relative;
		width: 100%;
		height: 100vw;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
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
		}
		.icon-download {
		position: absolute;
		right: 20px;
		top: 0;
		padding: 16px;
		}
	}

	.button-bottom {
		flex: 0 0 54px;
		cursor: pointer;
		width: 100%;
		margin-bottom: constant(safe-area-inset-bottom);
		margin-bottom: env(safe-area-inset-bottom);
		background-color: #eaeaea;
		color: #999999;
	}
	}
}
</style>
