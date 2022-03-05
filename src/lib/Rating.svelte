<script lang="ts">
	export let score: number;

	let voted = false;

	const handleScoreClick = (direction: 'up' | 'down') => {
		if (voted) return;
		voted = true;

		direction == 'up' ? score++ : score--;
	};
</script>

<div class="rating">
	<img
		on:click={() => handleScoreClick('up')}
		class="icon--plus"
		src="/icons/icon-plus.svg"
		alt=""
	/>
	{score}
	<img
		on:click={() => handleScoreClick('down')}
		class="icon--minus"
		src="/icons/icon-minus.svg"
		alt=""
	/>
</div>

<style>
	.rating {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: column;
		padding: 14px 7px;
		height: 100%;
		grid-row: 1/-1;
		background-color: var(--color-lighter-gray);
		color: var(--color-mod-blue);
		font-weight: bold;
		border-radius: 10px;
		min-width: 40px;
		max-height: 100px;
	}
	.icon--plus {
		width: 10.07px;
		height: 10px;
	}
	.icon--minus {
		width: 10px;
		height: 2.5px;
	}

	@media screen and (max-width: 768px) {
		.rating {
			grid-row: 3/3;
			grid-column: 1/1;
			max-width: 100px;
			gap: 1rem;
			display: inline-flex;
			flex-direction: row;
			width: min-content;
		}
	}
</style>
