<script lang="ts">
	import DateInput from "./DateInput.svelte";
	import { TimePicker } from "svelte-time-picker";
	import TimeInput from "./TimeInput.svelte";
	const dateFormat = "yyyy-MM-DD";
	const timeFormat = "HH:mm";
	let date = new Date();
</script>

<DateInput bind:date format={dateFormat} />
<TimeInput bind:date {timeFormat} />

<style>
	:global(.quick-input__content input::placeholder) {
		color: var(--text-muted);
		font-family: inherit;
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

	:global(.quick-input__content input) {
		color: var(--text-muted);
		background: var(--background-nav);
		min-width: 0px;
		box-sizing: border-box;
		padding: 24px 16px;
		margin: 0px;
		margin-bottom: 1rem;
		border: 1px solid rgba(103, 113, 137, 0.3);
		border-radius: 10px;
		width: 100%;
		outline: none;
	}

</style>
