<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from 'components/inputs/Input.svelte';
  import Button from 'components/inputs/Button.svelte';

  export let shootingDate = '';
  export let closingDate = '';
  export let name = '';
  export let notice = '';
  export let loading;

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', {
      name,
      closingDate: new Date(closingDate),
      shootingDate: new Date(shootingDate),
      notice
    });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    label={$_('schools.shootings.form.name')}
    bind:value={name} />
  <Input
    type={'date'}
    label={$_('schools.shootings.form.shooting_date')}
    bind:value={shootingDate} />
  <Input
    type={'date'}
    label={$_('schools.shootings.form.closing_date')}
    bind:value={closingDate} />
  <Input
    required={false}
    label={$_('schools.shootings.form.notice')}
    bind:value={notice} />
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!shootingDate || !closingDate || !name || loading} />
</form>
