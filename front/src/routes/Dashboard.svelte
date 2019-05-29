<script>
  import { connect } from '../store'
  import ChooseAgency from '../components/dashboard/ChooseAgency.svelte'
  import LastAgencyToken from '../components/dashboard/LastAgencyToken.svelte'

  const [, user] = connect('user')
</script>

<p>Dashboard</p>

{#if $user.agencies.length === 0}
  <ChooseAgency />
{:else if $user.lastAgencyToken !== null}
  <LastAgencyToken />
{/if}
