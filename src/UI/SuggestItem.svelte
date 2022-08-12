<script lang="ts">
	export let displayItem: string;
    export let onClick: ()=>void
    export let isSelected: boolean = false;
</script>

<div class="suggest-item-wrapper">
    <div on:click={onClick} class="suggest-item">{displayItem}</div>

</div>

<style>

	.suggest-item {
		margin-right: 8px;
		margin-bottom: 4px;
		margin-top: 4px;
		font-size: 0.75rem;
		color: var(--text-normal);
		border-radius: 5px;
		background-color: var(--interactive-accent);
		padding: 0.25rem 0.5rem;
	}

	.suggest-item:hover {
		background-color: var(--interactive-accent-hover);
	}
</style>
