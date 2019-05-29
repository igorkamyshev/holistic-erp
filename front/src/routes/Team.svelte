<script>
  import { onMount } from 'svelte'

  import { connect } from '../store'
  import Loader from '../compnents/common/Loader'

  const [dispatch, team] = connect('team')

  onMount(() => {
    dispatch('team/fetch')
  })
</script>

<p>Team</p>

<main>
  {#if $team.data}
    {#each $team.data as agency}
      <article>
        <h3>{agency.name}</h3>
        <ul>
          {#each agency.members as member}
            <li>{member}</li>
          {/each}
        </ul>
      </article>
    {/each}
  {:else}
    <Loader />
  {/if}
</main>
