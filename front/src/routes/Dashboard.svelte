<script>
  import { connect } from '../store'
  import ChooseAgency from '../components/dashboard/ChooseAgency.svelte'

  const [, user] = connect('user')
</script>

<p>Dashboard</p>

{#if $user.agencies.length === 0}
  <ChooseAgency />
{/if}
