<script>
  import { navigate } from "svelte-routing";
  import { onMount } from 'svelte';

  import { loginByTelegram } from '../../api/loginByTelegram'

  const handler = async ({ id, first_name, last_name, username, photo_url, auth_date, hash }) => {
    const loggedIn = await loginByTelegram(id, {
      firstName: first_name,
      lastName: last_name,
      username,
      photoUrl: photo_url,
    }, { date: auth_date, hash })

    if (loggedIn) {
      navigate("/app");
    }
  }

  onMount(async => {
    const telegram = document.getElementById('telegram');
    const handlerKey = '__handler__telegram'

    if (telegram) {
      window[handlerKey] = handler

      const script = document.createElement('script');
      script.src = 'https://telegram.org/js/telegram-widget.js?5';
      script.setAttribute('data-telegram-login', 'holistic_erp_bot');
      script.setAttribute('data-size', 'large');
      script.setAttribute('data-onauth', `window.${handlerKey}(user)`);
      script.async = true;
      telegram.appendChild(script);
    }
  })
</script>

<div id="telegram"></div>
