<script>
  import { navigate } from "svelte-routing";

  import { login } from '../../api/login'

  let email = "";
  let password = "";

  const onSubmit = async () => {
    await login(email, password)

    navigate("/app");
  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <h2>Вход</h2>

  <label>
    Email
    <input type="email" bind:value={email} />
  </label>

  <label>
    Пароль
    <input type="password" bind:value={password} />
  </label>

  <button>Войти</button>
</form>
