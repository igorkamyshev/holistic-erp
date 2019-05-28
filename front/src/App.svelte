<script>
  import { Router, Route } from 'svelte-routing'

  import Home from './routes/Home.svelte'
  import App from './routes/App.svelte'
</script>

<Router>
  <Route path="app" component={App} />
  <Route path="/" component={Home} />
</Router>
