<script lang="ts">
	export let colors: string[];
	// 0 - scale is 5, only row
	// 1 - scale is 10, first row
	// 2 - scale is 10, second row
	export let rowType: 0 | 1 | 2;
	export let selectedValue: number;
	const ratingValues = new Array(5).fill(0).map((_, i) => i + 1);
	const getValue = (value: number, i: number) => {
		if (rowType === 0) {
			return value;
		}
		if (rowType === 1) {
			return value + i;
		}

		return value + i + 1;
	};
	$: isSelected = (value: number) => value === selectedValue;
	$: selectedItemClass = (value: number) =>
		isSelected(value) ? "rating-item-selected" : "";
	$: selectedValueClass = (value: number) =>
		isSelected(value) ? "rating-value-selected" : "";

	const colorVar = (i: number) => `--rating-color: ${colors[i]}`;
</script>

<div class="ratings-row">
	{#each ratingValues as value, i (value)}
		<div
			on:click={() => {
				selectedValue = getValue(value, i);
			}}
			style={colorVar(i)}
			class={`rating-item ${selectedItemClass(getValue(value, i))}`}
		>
			<span
				style={colorVar(i)}
				class={`rating-value ${selectedValueClass(getValue(value, i))}`}
				>{getValue(value, i)}</span
			>
		</div>
	{/each}
</div>

<style>
	.rating-item.rating-item-selected {
		background-color: var(--rating-color);
	}

	.rating-value.rating-value-selected {
		color: var(--text-normal);
		font-weight: bold;
	}

	.rating-value {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: var(--rating-color);
	}

	.ratings-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 100%;
	}

	.rating-item {
		position: relative;
		margin: 1rem;
		padding: 5%;
		border: 1px solid var(--rating-color);
		color: (var(--text-muted));
		border-radius: 10px;
	}
</style>
