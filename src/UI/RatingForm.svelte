<script lang="ts">
	import RatingsRow from "./RatingsRow.svelte";
	export let scaleSize: 5 | 10;
	export let reverseColors = false;
	export let colors = ["#AB3B3F", "#C94A2C", "#F4B036", "#4BB256", "#24998F"];
	if (reverseColors) {
		colors = colors.reverse();
	}
	const ratingValues = new Array(5).fill(0).map((_, i) => i + 1);
	let selectedValue: number;
</script>

<div class="rating-form">
	<div class="label">Mood</div>
	<input
		class="form-input"
		bind:value={selectedValue}
		type="number"
		placeholder={`1-${scaleSize}`}
	/>
	<div class="ratings-container">
		{#if scaleSize !== 10}
			<RatingsRow bind:selectedValue rowType={0} {colors} />
		{:else}
			<RatingsRow bind:selectedValue rowType={1} {colors} />
			<RatingsRow bind:selectedValue rowType={2} {colors} />
		{/if}
	</div>
</div>

<style>
	.ratings-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
</style>
