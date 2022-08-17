<script lang="ts">
	import RatingsRow from "./RatingsRow.svelte";
	import { handlePickerDisplay } from "../Helpers/Helpers";
	import { onMount } from "svelte";
	import FormWrapper from "./FormWrapper.svelte";
	import FormOutput from "../FormOutput";
	export let optional: boolean = true;
	export let scaleSize: 5 | 10 = 5;
	export let name: string;
	export let reverseColors = false;
	export let colors = ["#AB3B3F", "#C94A2C", "#F4B036", "#4BB256", "#24998F"];
	export let formOutput: FormOutput;
	if (reverseColors) {
		colors = colors.reverse();
	}

	let selectedValue: number | null;
	let showRatingPicker = false;
	let output: { name: string; rating: number } | null;
	let isEnabled = true
	$: {
		updateOutputData(selectedValue)
		removeOutputData(isEnabled)
	}		

	const removeOutputData = (_isEnabled:boolean)=>{
		if(!_isEnabled && output){
			formOutput.ratingForm.remove(output!)
			selectedValue=null
			output=null
			
		}
	}
	const updateOutputData = (_selectedValue: number | null) => {
		if(isEnabled){
			if (_selectedValue && !output) {
				output = { name: name, rating: _selectedValue };
				formOutput.ratingForm.push(output)
			} else if (_selectedValue) {
				output!.rating = _selectedValue!;
			}
		}
	};

	onMount(() => {
		const modal = document.querySelector(".quick-input__modal");
		modal?.addEventListener("click", (e) => {
			showRatingPicker = handlePickerDisplay(
				e,
				"ratings-container",
				"rating-input",
				showRatingPicker
			);
		});
	});
</script>

<div class="rating-form form">
	<FormWrapper bind:isEnabled {optional} {name}>
		<input
			on:click={() => {
				showRatingPicker = true;
			}}
			id="rating-input"
			class="form-input"
			bind:value={selectedValue}
			type="number"
			tabindex="-1"
			placeholder={`1-${scaleSize}`}
		/>
		{#if showRatingPicker}
			<div id="ratings-container">
				{#if scaleSize !== 10}
					<RatingsRow bind:selectedValue rowType={0} {colors} />
				{:else}
					<RatingsRow bind:selectedValue rowType={1} {colors} />
					<RatingsRow bind:selectedValue rowType={2} {colors} />
				{/if}
			</div>
		{/if}
	</FormWrapper>
</div>

<style>
	#ratings-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
</style>
