<script>
  import { Router, Link, Route } from 'svelte-routing'
  import { onMount } from 'svelte'

  import { connect } from '../store'
  import Loader from '../components/common/Loader.svelte'

  import Dashboard from './Dashboard.svelte'
  import Team from './Team.svelte'

  const [dispatch, common] = connect('common')

  onMount(() => {
    dispatch('user/fetch-info')
  })
</script>

{#if $common.loaded}
  <Router>
    <h1>ERP</h1>
    <nav>
      <Link to="/app">Dashboard</Link>
      <Link to="/app/clients">Clients</Link>
      <Link to="/app/team">Team</Link>
    </nav>

    <Route path="">
      <Dashboard />
    </Route>
    <Route path="clients">
      <p>Client</p>
    </Route>
    <Route path="team">
      <Team />
    </Route>
  </Router>
{:else}
  <Loader error={$common.forbidden} />
{/if}
