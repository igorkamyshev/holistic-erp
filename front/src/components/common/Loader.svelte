<script>
  export let error
</script>

{#if error}
  <p>Ошибка, попробуйте перелогиниться</p>
{:else}
  <p>Подождите</p>
{/if}