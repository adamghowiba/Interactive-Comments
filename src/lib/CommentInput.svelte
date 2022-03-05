<script lang="ts">
	import Button from './Button.svelte';
	import type { User } from './data';
	import TextArea from './TextArea.svelte';

	export let user: User;
	export let buttonString: string = 'Send';
	export let placeholder: string;
	export let value: string;
	export let inputError: boolean = false;
</script>

<div class="input-wrapper">
	<div class="avatar">
		<img src={user.image.png} alt="" />
	</div>
	<div class="textarea">
		<TextArea {placeholder} on:blur {inputError} bind:value />
	</div>
	<div class="button">
		<Button on:click>{buttonString}</Button>
	</div>
</div>

<style>
	.input-wrapper {
		display: flex;
		gap: 16px;
		background-color: var(--color-white);
		padding: 20px;
		max-height: 144px;
		border-radius: 8px;
	}
	.textarea {
		width: 100%;
	}
	img {
		width: 40px;
		height: 40px;
	}

	@media screen and (max-width: 768px) {
		.input-wrapper {
			display: grid;
			grid-template-areas:
				'textarea textarea'
				'avatar button';
			height: 100%;
			max-height: none;
			align-items: end;
		}
		.textarea {
			height: 80px;
			grid-area: textarea;
		}
		.avatar {
			grid-area: avatar;
		}
		.button {
			grid-area: button;
			margin-left: auto;
		}
	}
</style>
