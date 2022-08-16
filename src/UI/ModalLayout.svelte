<script lang="ts">
	import DateForm from "./DateForm.svelte";
	import TimeForm from "./TimeForm.svelte";
	import MultiselectForm from "./MultiselectForm.svelte";
	import RatingForm from "./RatingForm.svelte";
	import type QuickInputPlugin from "src/main";
	import type FormOutput from "src/FormOutput";
	import type { IForm } from "../ILayout";
	export let plugin: QuickInputPlugin;
	export let partialLayoutData: IForm[];
	export let formOutput: FormOutput;
	export let submit: () => void;
	export let cancel: () => void;
	interface FullLayoutData {
		partialLayout: IForm;
		component: any;
		formOutput: FormOutput;
	}

	const files = plugin.app.vault.getFiles();
	const getFullLayoutData = () => {
		let _fullLayoutData: FullLayoutData[] = [];
		for (const partialLayout of partialLayoutData) {
			let layoutComponent = null;

			if (partialLayout.formType === "Date") {
				layoutComponent = DateForm;
			} else if (partialLayout.formType === "Time") {
				layoutComponent = TimeForm;
			} else if (partialLayout.formType === "Multiselect") {
				layoutComponent = MultiselectForm;
			} else if (partialLayout.formType === "Rating") {
				layoutComponent = RatingForm;
			}

			let fullLayoutDataEl: FullLayoutData = {
				partialLayout: partialLayout,
				formOutput: formOutput,
				component: layoutComponent,
			};

			_fullLayoutData.push(fullLayoutDataEl);
		}
		return _fullLayoutData;
	};
	let fullLayoutData = getFullLayoutData();
</script>

{#each fullLayoutData as fullForm (fullForm)}
	<svelte:component
		this={fullForm.component}
		{...fullForm.partialLayout}
		formOutput={fullForm.formOutput}
	/>
{/each}

<div class="btn-row">
	<button on:click={cancel}>Cancel</button>
	<button on:click={submit} class="mod-cta">Submit</button>
</div>

<style>
	button:not(.mod-cta) {
		margin-right: 1rem;
	}

	.btn-row {
		margin-top: 3rem;
		margin-bottom: 1rem;
		display: flex;
		justify-content: flex-end;
		flex-direction: row;
	}

	:global(.quick-input__content input::placeholder, .quick-input__content
			textarea::placeholder) {
		color: var(--text-faint);
		font-family: inherit;
	}

	:global(.quick-input__content .form-input) {
		color: var(--text-muted);
		background: var(--background-secondary);
		min-width: 0px;
		padding: 24px 16px;
		margin: 0px;
		margin-bottom: 1rem;
		box-sizing: border-box;
		border: 1px solid var(--background-modifier-border);
		border-radius: 10px;
		width: 100%;
		outline: none;
	}

	:global(.quick-input__content) {
		--date-picker-foreground: var(--text-muted);
		--date-picker-background: var(--background-modifier-form-field);
		--date-picker-highlight-border: var(--text-accent);
		--date-picker-highlight-shadow: var(--text-accent);
		--date-picker-selected-color: var(--text-muted);
		--date-picker-selected-background: var(--date-picker-background);
	}
</style>
