<script lang="ts">
	import Fuse from "fuse.js";
	import SuggestItem from "./SuggestItem.svelte";
	import { onMount } from "svelte";
	import { handlePickerDisplay } from "../Helpers/Helpers";
	import FormWrapper from "./FormWrapper.svelte";
	export let optional:boolean;
	export let name: string;
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
		shouldHandleDisplay = false;
		// We set this to true to account for potential race conditions when handling picker display with suggest item
		showMultiselectPicker = true;
	};

	const onDeselect = (idx: number) => {
		selectedItemsIdx.remove(idx);
		selectedItemsIdx = selectedItemsIdx;
	};

	let filteredItemsIdx: number[] = [];
	let selectedItemsIdx: number[] = [];
	let showMultiselectPicker = false;
	let shouldHandleDisplay = true;
	onMount(() => {
		const modal = document.querySelector(".quick-input__modal");
		modal?.addEventListener("click", (e) => {
			// For some reason wrapper.contains(SuggestItem) returns false
			// shouldHandleDisplay is used to allow for proper display
			if (shouldHandleDisplay) {
				showMultiselectPicker = handlePickerDisplay(
					e,
					"multiselect__suggestions",
					"selected-items-container",
					showMultiselectPicker
				);
			} else {
				shouldHandleDisplay = true;
			}
		});
	});
	$: {
		console.log({ showMultiselectPicker });
	}
	$: selectedFormClass = showMultiselectPicker ? "form--selected" : "";
	const preventInput = (e: Event) => {
		e.preventDefault();
		return false;
	};
</script>

<div class="multiselect__form">
	<FormWrapper {optional} {name}>
		<div
			on:click={() => {
				showMultiselectPicker = true;
			}}
			placeholder="Click to select items"
			on:keydown={preventInput}
			contenteditable={true}
			id={`selected-items-container`}
			class={`form-input ${selectedFormClass}`}
		>	
			{#each selectedItemsIdx as idx (idx)}
				<SuggestItem
					onClick={() => onDeselect(idx)}
					displayItem={displayItems[idx]}
				/>
			{/each}
		</div>
		{#if showMultiselectPicker}
			<div id="multiselect__suggestions" class="form-input">
				<input
					bind:value={searchQuery}
					class="form-input multiselect__search"
					type="text"
					placeholder="Search"
				/>
				<div class="suggestions-container">
					{#each displayItems as displayItem, idx (idx)}
						{#if (!searchQuery || filteredItemsIdx.contains(idx)) && !selectedItemsIdx.contains(idx)}
							<SuggestItem
								onClick={() => onSelect(idx)}
								{displayItem}
							/>
						{/if}
					{/each}
				</div>
			</div>
		{/if}
	</FormWrapper>
</div>

<style>
	.form--selected {
		border-color: var(--text-accent);
		padding: 16px 8px 16px 16px;
	}

	#selected-items-container:hover {
		background-color: var(--background-modifier-form-field-highlighted);
	}

	input.multiselect__search {
		padding: 24px 16px;
		border: none;
		border-bottom: 1px solid var(--background-modifier-border);
	}

	.multiselect__form #multiselect__suggestions {
		padding: 0px;
	}

	#selected-items-container {
		cursor: default;
		caret-color: transparent;
		display: flex;
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
