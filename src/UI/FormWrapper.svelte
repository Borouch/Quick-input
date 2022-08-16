<script lang="ts">
	export let name: string;
	export let optional:boolean;
	export let isEnabled = true;
</script>

<div class="header">
	<div class="label">{name}</div>
	{#if optional}
	<span on:click={()=>{isEnabled=!isEnabled}} class="fold-btn">{isEnabled ? "-" : "+"}</span>
	{/if}
</div>
{#if isEnabled}
	<slot />
{/if}

<style>
	.fold-btn {
        display:flex;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
		/* padding: 0.125rem 0.25rem; */
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--text-faint);
		border-radius: 25%;
	}

	.fold-btn:hover {
		background-color: var(--background-modifier-form-field-highlighted);
        color: var(--text-muted)
	}

	:global(.quick-input__content .label) {
		padding-bottom: 0.5rem;
		color: var(--text-faint);
	}

	.header {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
</style>
