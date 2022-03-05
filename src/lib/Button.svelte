<script lang="ts">
	export let buttonColor: string = 'var(--color-mod-blue)';
</script>

<button on:click style="--buttonColor: {buttonColor}">
	<slot />
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		text-transform: uppercase;
		appearance: none;
		border-radius: 8px;
		height: min-content;
		padding: 12px 30px;
		min-height: 48px;
		border: none;
		outline: none;
		color: white;
		background-color: var(--buttonColor, --color-mod-blue);
	}
</style>
