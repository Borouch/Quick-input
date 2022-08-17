<script lang="ts">
	import Fuse from "fuse.js";
	import SuggestItem from "./SuggestItem.svelte";
	import { onMount } from "svelte";
	import { handlePickerDisplay } from "../Helpers/Helpers";
	import FormWrapper from "./FormWrapper.svelte";
	import FormOutput from "../FormOutput";
	import type { sortSearchResults } from "obsidian";
	export let name: string;
	export let optional: boolean = true;
	export let displayItems: string[];
	export let actualItems: string[];
	export let customItemCallback: (string)=>string|null=null
	export let formOutput: FormOutput;

	let filteredItemsIdx: number[] = [];
	let selectedItemsIdx: number[] = [];
	let showMultiselectPicker = false;
	let shouldHandleDisplay = true;
	
	let outputData = {
		name: name,
		selectItems: [""],
	};

	$: selectedFormClass = showMultiselectPicker ? "--selected" : "";
	$: addBtnClass = searchQuery !== "" ? "--active" : "";

	formOutput.multiselectForm.push(outputData);

	$: {
		updateOutputData(selectedItemsIdx);
	}

	const updateOutputData = (_selectedItemsIdx: number[]) => {
		outputData.selectItems = _selectedItemsIdx.map((i) => actualItems[i]);
	};

	let searchQuery = "";
	$: {
		search(searchQuery);
	}

	const search = (_searchQuery: string) => {
		const options = {
			includeScore: true,
		};
		const fuse = new Fuse(displayItems, options);
		const searchResults = fuse
			.search(searchQuery)
			.filter((e) => e.score <= 0.5);
		filteredItemsIdx = searchResults.map((e) => e.refIndex);
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


	const preventInput = (e: Event) => {
		e.preventDefault();
		return false;
	};

	const addCustomItem = ()=>{
		displayItems.push(searchQuery)
		let actualCustomItem = searchQuery
		if(customItemCallback){

			actualCustomItem = customItemCallback(searchQuery)
		}
		actualItems.push(actualCustomItem)
		onSelect(displayItems.length-1)
	}
	const onEnter = (e:Event)=>{
		if(e.key === 'Enter'){
			e.preventDefault()
			addCustomItem()
		}
	}
$: placeholder = selectedItemsIdx.length>0 ? "" : "Click to select items"
</script>

<div class="multiselect-form form">
	<FormWrapper {optional} {name}>
		<div
			on:click={() => {
				showMultiselectPicker = true;
			}}
			placeholder={placeholder}
			tabindex="-1"
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
				<div class="multiselect__search-container">
					<input
						on:keydown={onEnter}
						bind:value={searchQuery}
						class="form-input multiselect__search"
						type="text"
						tabindex="-1"
						placeholder="Search / add"
					/>
					<span on:click={addCustomItem} class={`add-btn ${addBtnClass}`}><span>+</span></span>
				</div>
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
	.form.--selected {
		border-color: var(--text-accent);
		padding: 16px 8px 16px 16px;
	}

	#selected-items-container:hover {
		background-color: var(--background-modifier-form-field-highlighted);
	}

	.add-btn > span {
		color: var(--text-muted);
		font-size: 1.5rem;
	}

	.add-btn.--active {
		opacity: 1;
	}

	.add-btn {
		position: absolute;
		top: 50%;
		right: 4px;
		display: flex;
		justify-content: center;
		padding-top: 4px;
		border-radius: 10px;
		width: 36px;
		height: 36px;
		background-color: var(--text-accent);
		opacity: 0.6;
		transform: translateY(-50%);
	}
	.multiselect__search-container {
		position: relative;
	}
	input.multiselect__search {
		padding: 24px 16px;
		margin-bottom: 0px;
		border: none;
		border-bottom: 1px solid var(--background-modifier-border);
	}

	.multiselect-form #multiselect__suggestions {
		padding: 0px;
	}

	#selected-items-container {
		cursor: default;
		caret-color: transparent;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	
	#selected-items-container::before {
		content: attr(placeholder);
		color: var(--text-faint);
	}

	.suggestions-container {
		margin-top: 16px;
		padding: 8px 16px;
		padding-top: 0px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
</style>
