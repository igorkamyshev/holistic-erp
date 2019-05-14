<script>
  import { navigate } from "svelte-routing";

  import { register } from '../../api/register'

  let createTeam = "";

  let email = "";
  let password = "";
  let repeatPassword = "";

  let teamName = "";

  const onSubmit = async () => {
    if (password === repeatPassword) {}
      await register(email, password, {
        create: createTeam,
        name: teamName,
      })

      if (createTeam) {
        navigate('/app/team')
      } else {
        navigate('/app/wait')
      }

  }
</script>

<form on:submit|preventDefault={onSubmit}>
  <h2>Регистрация</h2>

  <label>
    Email
    <input type="email" bind:value={email} />
  </label>

  <label>
    Пароль
    <input type="password" bind:value={password} />
  </label>

  <label>
    Пароль еще раз
    <input type="password" bind:value={repeatPassword} />
  </label>

  <label>
    Новая команда
    <input type="checkbox" bind:checked={createTeam} />
  </label>

  <label>
    Команда
    <input bind:value={teamName} />
  </label>

  <button>Зарегистрироваться</button>
</form>
