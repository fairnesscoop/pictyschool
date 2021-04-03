<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from 'components/inputs/Input.svelte';
  import Button from 'components/inputs/Button.svelte';

  export let loading; 

  let email = '';

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', { email });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    type={'email'}
    label={$_('users.form.email')}
    bind:value={email} />
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!email} />
</form>
