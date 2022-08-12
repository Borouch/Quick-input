<script lang="ts">
	import DateForm from "./DateForm.svelte";
	import TimeForm from "./TimeForm.svelte";
	import MultiSelectForm from "./MultiSelectForm.svelte";
    import type QuickInputPlugin from "src/main";
    export let plugin: QuickInputPlugin
	const dateFormat = "yyyy-MM-DD";
	const timeFormat = "HH:mm";
	let date = new Date();
    const files = plugin.app.vault.getFiles()
    const displayItems = files.map((f)=>f.name)
    const actualItems = files.map((f)=>f.path)
</script>

    <DateForm bind:date format={dateFormat} />
    <TimeForm bind:date {timeFormat} />
    <MultiSelectForm  {displayItems} {actualItems}/>

<style>
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

	:global(.quick-input__content .label) {
		padding-bottom: 0.5rem;
		color: var(--text-faint);
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
