<script>
  import { navigate, Link } from "svelte-routing";
  import { onMount } from "svelte";

  import { connect } from "../../store";

  const [dispatch, user] = connect("user");

  onMount(async => {
    const telegram = document.getElementById("telegram-widget-conatiner");

    if (telegram) {
      const handlerKey = "__handler__telegram";
      window[handlerKey] = data => dispatch("login", data);

      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-widget.js?5";
      script.setAttribute("data-telegram-login", "telegramBot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-onauth", `window.${handlerKey}(user)`);
      script.async = true;
      telegram.appendChild(script);
    }
  });
</script>

<div>
  {#if $user.token}
    <Link to="/app">К приложению</Link>
  {:else}
    <div id="telegram-widget-conatiner" />
  {/if}
</div>
