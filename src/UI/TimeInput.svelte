<script lang="ts">
	import { TimePicker } from "svelte-time-picker";
	export let date: Date;
	export let timeFormat: string;
	import { onMount } from "svelte";
	import { handlePickerDisplay } from "../Helpers/Helpers";
	let initialDate = window.moment(date);
	let showTimePicker = false;
	onMount(() => {
		const modal = document.querySelector(".quick-input__modal");
		modal?.addEventListener("click", (e) => {
			showTimePicker = handlePickerDisplay(
				e,
				"time-picker-wrapper",
				"time-input",
				showTimePicker
			);
			if (!showTimePicker) {
				date = initialDate.toDate();
			}
		});
	});
</script>

<div class="label">Time</div>
<input
	id="time-input"
	on:focus={() => {
		showTimePicker = true;
	}}
	type="text"
	value={window.moment(date).format(timeFormat)}
/>
{#if showTimePicker}
	<div id="time-picker-wrapper">
		<TimePicker
			options={{ hasButtons: true, is24h: true, minutesIncrement: 5 }}
			bind:date
			on:cancel={() => {
				showTimePicker = false;
				date = initialDate.toDate();
			}}
			on:ok={() => {
				showTimePicker = false;
				initialDate = window.moment(date);
			}}
		/>
	</div>
{/if}

<style>
	#time-picker-wrapper {
		width: min-content;
	}

	:global(.quick-input__content ._tp-button) {
		background-color: transparent;
		color: var(--text-accent);
		transition: none;
	}
	:global(.quick-input__content ._tp-button:hover) {
		background-color: var(--background-modifier-form-field-highlighted);
		color: var(--text-normal);
	}

	:global(.quick-input__content ._tp-container) {
		border: 1px solid rgba(103, 113, 137, 0.3);
		background-color: var(--background-primary);
	}

	:global(.quick-input__content ._tp-wrapper) {
		background-color: var(
			--background-modifier-form-field-highlighted
		) !important;
	}

	:global(.quick-input__content ._tp-container + ._tp-wrapper) {
		height: 4rem;
	}

	:global(.quick-input__content ._tp-item) {
		color: var(--text-muted);
	}

	:global(.quick-input__content ._tp-clock) {
		background-color: var(--background-modifier-form-field-highlighted);
	}

	:global(.quick-input__content ._tp-hand, .quick-input__content
			._tp-pointer, .quick-input__content ._tp-center) {
		color: var(--text-accent) !important;
		background-color: var(--text-accent) !important;
	}

	:global(select.dummy-select) {
		display: none;
	}
</style>
