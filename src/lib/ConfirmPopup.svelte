<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Button from './Button.svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="confirm-popup">
	<h1>Delete comment</h1>
	<p>
		Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
	</p>
	<div class="buttons">
		<Button buttonColor="var(--color-gray-blue)" on:click={() => dispatch('cancel')}
			>no, cancel</Button
		>
		<Button buttonColor="var(--color-soft-red)" on:click={() => dispatch('delete')}
			>Yes, delete</Button
		>
	</div>
</div>

<style>
	.confirm-popup {
		display: flex;
		flex-direction: column;
		gap: 20px;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--color-white);
		padding: 32px;
		border-radius: 8px;
		max-width: 400px;
		z-index: 1000;
	}
	.buttons {
		display: flex;
		gap: 2rem;
	}
</style>
