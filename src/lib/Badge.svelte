<script lang="ts">

</script>

<div class="badge">
    <slot />
</div>

<style>
    .badge {
        background-color: var(--color-mod-blue);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: -5px;
        padding: 3px 6px;
        border-radius: 3px;
        font-weight: 500;
        color: white;
        font-size: 13px;
    }
</style>