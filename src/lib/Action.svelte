<script lang="ts">
	export let color = 'var(--color-mod-blue)';
	export let iconSrc: string;
</script>

<div class="comment__reply" style="--color: {color}" on:click>
	<img src={iconSrc} alt="Reply icon" />
	<slot />
</div>

<style>
	.comment__reply {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-left: auto;
		color: var(--color, --color-mod-blue);
		font-weight: 500;
		text-transform: capitalize;
	}
	.comment__reply:hover {
		cursor: pointer;
	}
	.comment__reply img {
		width: 14px;
		height: 12.25px;
	}
</style>
