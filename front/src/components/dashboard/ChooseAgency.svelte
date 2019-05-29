<script>
  import { connect } from '../../store'

  const [dispatch] = connect()

  const joinData = {
    name: '',
    token: '',
  }
  const createData = {
    name: '',
  }

  const handleJoin = () => dispatch('user/join-agency', joinData)
  const handleCreate = () => dispatch('user/create-agency', createData)
</script>

<style>
  article {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 1fr;
  }

  h2 {
    grid-column: span 2;
  }
</style>

<article>
  <h2>Вы не состоите в агенстве</h2>

  <form on:submit|preventDefault={handleJoin}>
    <label>
      Название
      <input bind:value={joinData.name} />
    </label>

    <label>
      Токен
      <input bind:value={joinData.token} />
    </label>

    <button>Присоедениться</button>
  </form>

  <form on:submit|preventDefault={handleCreate}>
    <label>
      Название
      <input bind:value={createData.name} />
    </label>

    <button>Создать</button>
  </form>
</article>
