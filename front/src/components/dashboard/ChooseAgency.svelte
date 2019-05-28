<script>
  let nameForJoin = "";
  let tokenForJoin = "";

  const handleJoin = () => {
    console.log(nameForJoin, tokenForJoin);
  };

  let nameForCreate = "";

  const handleCreate = () => {
    console.log(nameForCreate)
  };
</script>

<article>
  <p>Вы не присоеделись к агенству</p>

  <form on:submit|preventDefault={handleJoin}>
    <label>
      Название
      <input bind:value={nameForJoin} />
    </label>

    <label>
      Токен
      <input bind:value={tokenForJoin} />
    </label>

    <button>Присоедениться</button>
  </form>

  <form on:submit|preventDefault={handleCreate}>
    <label>
      Название
      <input bind:value={nameForCreate} />
    </label>

    <button>Создать</button>
  </form>
</article>
