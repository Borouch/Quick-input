<script lang="ts">
	import Fuse from "fuse.js";
	import SuggestItem from "./SuggestItem.svelte";
	export let displayItems: string[];
	export let actualItems: string[];

	let searchQuery = "";
	$: {
		search(searchQuery);
	}
	const search = (_searchQuery: string) => {
		const options = {
			includeScore: true,
		};
		const fuse = new Fuse(displayItems, options);
		filteredItemsIdx = fuse.search(searchQuery).map((e) => e.refIndex);
	};

	const onSelect = (idx: number) => {
		searchQuery = "";
		selectedItemsIdx.push(idx);
		selectedItemsIdx = selectedItemsIdx;
	};

	const onDeselect = (idx: number) => {
		selectedItemsIdx.remove(idx);
		selectedItemsIdx = selectedItemsIdx;
	};

	let filteredItemsIdx: number[] = [];
	let selectedItemsIdx: number[] = [];
</script>

<div class="multiselect__form">
	<div class="label">Exercises</div>
	<div class="form-input selected-items-container">
		{#each selectedItemsIdx as idx (idx)}
			<SuggestItem
				onClick={() => onDeselect(idx)}
				displayItem={displayItems[idx]}
			/>
		{/each}
	</div>
	<div class="form-input multiselect__suggestions">
		<input
			bind:value={searchQuery}
			class="form-input multiselect__search"
			type="text"
			placeholder="Search"
		/>
		<div class="suggestions-container">
			{#each displayItems as displayItem, idx (idx)}
				{#if (!searchQuery || filteredItemsIdx.contains(idx)) && !selectedItemsIdx.contains(idx)}
					<SuggestItem onClick={() => onSelect(idx)} {displayItem} />
				{/if}
			{/each}
		</div>
	</div>
</div>

<style>
	input.multiselect__search {
		padding: 24px 16px;
		border: none;
		border-bottom: 1px solid var(--background-modifier-border);
	}

	.multiselect__form .multiselect__suggestions {
		padding: 0px;
	}

	.selected-items-container{
		display:flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.suggestions-container {
		padding: 8px 16px;
		padding-top: 0px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
