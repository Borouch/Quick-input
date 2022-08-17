<script lang="ts">
	import { TimePicker } from "svelte-time-picker";
	import { onMount } from "svelte";
	import { handlePickerDisplay } from "../Helpers/Helpers";
	import FormWrapper from "./FormWrapper.svelte";
	import FormOutput from "../FormOutput";

	export let name: string;
	export let date: Date = new Date();
	export let timeFormat: string = "HH:mm";
	export let optional: boolean = true;
	export let formOutput: FormOutput;

	let outputData = {
		name: name,
		time: window.moment(date).format(timeFormat),
	};
	formOutput.timeForm.push(outputData);

	$: {
		updateOutputData(date);
	}

	const updateOutputData = (date: Date) => {
		outputData.time = window.moment(date).format(timeFormat);
	};

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

<div class="time-form form">
	<FormWrapper {optional} {name}>
		<input
			id="time-input"
			class="form-input"
			on:focus={() => {
				showTimePicker = true;
			}}
			type="text"
			tabindex="-1"
			value={window.moment(date).format(timeFormat)}
		/>
		{#if showTimePicker}
			<div id="time-picker-wrapper">
				<TimePicker
					options={{
						color: "var(--text-normal)",
						hasButtons: true,
						is24h: true,
						minutesIncrement: 5,
					}}
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
	</FormWrapper>
</div>

<style>
	#time-picker-wrapper {
		width: min-content;
	}

	:global(.quick-input__content #time-picker-wrapper ._tp-button) {
		background-color: transparent;
		color: var(--text-accent);
		transition: none;
	}

	:global(.quick-input__content #time-picker-wrapper ._tp-button:hover) {
		background-color: var(--background-modifier-form-field-highlighted);
		color: var(--text-normal);
	}

	:global(.quick-input__content #time-picker-wrapper ._tp-container) {
		border: 1px solid var(--background-modifier-border);
		background-color: var(--background-primary);
	}

	:global(.quick-input__content #time-picker-wrapper ._tp-wrapper) {
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

	:global(.quick-input__content div._tp-clock) {
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
