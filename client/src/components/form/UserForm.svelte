<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from '../inputs/Input.svelte';
  import Button from '../inputs/Button.svelte';

  export let firstName = '';
  export let lastName = '';
  export let email = '';
  export let loading;

  let password = '';  

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', {
      firstName,
      lastName,
      email,
      password,
    });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    type={'text'}
    label={$_('users.form.first_name')}
    bind:value={firstName} />
  <Input
    type={'text'}
    label={$_('users.form.last_name')}
    bind:value={lastName} />
  <Input
    type={'email'}
    label={$_('users.form.email')}
    bind:value={email} />
  <Input
    type={'password'}
    label={$_('users.form.password')}
    bind:value={password} />
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!firstName || !lastName || !email || !password} />
</form>
