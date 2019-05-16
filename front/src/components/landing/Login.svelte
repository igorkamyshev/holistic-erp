<script>
  import { navigate } from "svelte-routing";
  import { onMount } from 'svelte';

  import { loginByTelegram } from '../../api/loginByTelegram'

  const handler = async (data) => {
    await loginByTelegram(data)
    navigate("/app")
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
