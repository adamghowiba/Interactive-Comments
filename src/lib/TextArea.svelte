<script lang="ts">
	export let placeholder: string = null;
	export let value: string;
	export let name: string = 'filler';
	export let inputError: boolean = false;

</script>

<textarea class:inputError {name} {placeholder} bind:value on:blur />

<style>
	textarea {
		display: inline-block;
		font-family: 'Rubik', sans-serif;
		font-size: var(--text-body);
		width: 100%;
		padding: 12px 24px;
        height: 100%;
		appearance: none;
		border: 1px solid var(--color-light-gray);
		outline: none;
		resize: none;
		border-radius: 8px;
	}
	.inputError {
		border: 1px solid var(--color-soft-red);
	}
	textarea:focus {
		border: 1px solid var(--color-mod-blue);
	}
</style>
