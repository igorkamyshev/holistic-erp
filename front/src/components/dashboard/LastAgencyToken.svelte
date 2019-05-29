<script>
  import { connect } from '../../store'

  const [, user] = connect('user')
</script>

<p>
  Вы недавно создали агентсво. Чтобы ваши коллеги могли присоедениться отправьте
  им токен — {$user.lastAgencyToken.token}
</p>
