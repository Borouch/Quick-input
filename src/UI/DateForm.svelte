<script lang="ts">
	import {
		DateInput,
		DatePicker,
		localeFromDateFnsLocale,
	} from "date-picker-svelte";
	import { enUS } from "date-fns/locale";
	import { onMount, afterUpdate } from "svelte";
	import { handlePickerDisplay } from "src/Helpers/Helpers";
	import FormWrapper from "./FormWrapper.svelte";
	import type FormOutput from '../FormOutput';
	export let optional: boolean = true
	export let dateFormat: string = "yyyy-MM-DD";
	export let name:string;
	export let date: Date = new Date();
	export let formOutput: FormOutput;

	let dateFnsLocale = enUS;
	let showDatePicker = false;
	
	let outputData = {name: name, date: window.moment(date).format(dateFormat)}
	formOutput.dateForm.push(outputData)
	
	$:{
		updateOutputData(date)
	}

	const updateOutputData = (date: Date)=>{
		outputData.date = window.moment(date).format(dateFormat)
	}

	$: locale = localeFromDateFnsLocale(dateFnsLocale);

	// afterUpdate(() => {
	// 	if (showDatePicker) {
	// 		resizePicker();
	// 	}
	// });

	// const resizePicker = () => {
	// 	let datePickerEl = document.querySelector(
	// 		".date-time-picker"
	// 	) as HTMLElement;
	// 	if (datePickerEl) {
	// 		let content = document.querySelector(
	// 			".quick-input__content"
	// 		) as HTMLElement;
	// 		let contentWidth = content.innerWidth;
	// 		let pickerWidth = datePickerEl.getBoundingClientRect().width;
	// 		let pickerHeight = datePickerEl.getBoundingClientRect().height;
	// 		let scaleRatio = Number(
	// 			(contentWidth / pickerWidth).toPrecision(5)
	// 		);
	// 		let pickerWrapper = document.getElementById(
	// 			"date-picker-wrapper"
	// 		) as HTMLElement;
	// 		datePickerEl.style.transform = `scale(${scaleRatio})`;
	// 		const wrapperHeight =
	// 			pickerHeight * Number(scaleRatio.toPrecision(5));
	// 		pickerWrapper.style.height = wrapperHeight.toString() + "px";
	// 	}
	// };

	onMount(() => {
		const modal = document.querySelector(".quick-input__modal");
		modal?.addEventListener("click", (e) => {
			showDatePicker = handlePickerDisplay(
				e,
				"date-picker-wrapper",
				"date-input",
				showDatePicker
			);
		});
	});
</script>

<FormWrapper {optional} {name}>
	<input
		id="date-input"
		class="form-input"
		on:focus={() => {
			showDatePicker = true;
		}}
		value={window.moment(date).format(dateFormat)}
		type="text"
	/>
	{#if showDatePicker}
		<div id="date-picker-wrapper">
			<DatePicker
				on:select={() => {
					showDatePicker = false;
				}}
				bind:value={date}
				{locale}
			/>
		</div>
	{/if}
</FormWrapper>

<style>
	:global(#date-picker-wrapper > .date-time-picker) {
		margin-top: 0.5rem;
		padding: 1rem;
		transform-origin: top left;
	}

	:global(.quick-input__content .date-time-picker select) {
		border: none;
		/* background-color: var(--background-modifier-form-field); */
		background-color: var(--background-modifier-form-field-highlighted);
	}
</style>
