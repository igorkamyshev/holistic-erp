<script>
  import { Router, Link, Route } from "svelte-routing";
</script>

<Router>
  <h1>ERP</h1>

  <nav>
    <Link to="/app">Dashboard</Link>
    <Link to="/app/clients">Clients</Link>
    <Link to="/app/team">Team</Link>
  </nav>

  <Route path="">
    <p>
      Dashboard
    </p>
  </Route>
  <Route path="clients">
    <p>
      Client
    </p>
  </Route>
  <Route path="team">
    <p>
      Team
    </p>
  </Route>
</Router>
