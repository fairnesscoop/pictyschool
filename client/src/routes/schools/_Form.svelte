<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from '../../components/inputs/Input.svelte';
  import Button from '../../components/inputs/Button.svelte';

  export let address = '';
  export let city = '';
  export let zipCode = '';
  export let reference = '';
  export let name = '';
  export let loading;

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', { reference, city, zipCode, name, address });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    label={$_('schools.form.reference')}
    bind:value={reference} />
  <Input
    label={$_('schools.form.name')}
    bind:value={name} />
  <Input
    label={$_('schools.form.address')}
    bind:value={address} />
  <Input
    label={$_('schools.form.city')}
    bind:value={city} />
  <Input
    label={$_('schools.form.zip_code')}
    bind:value={zipCode} />
  
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!reference || !name || !address || !city || !zipCode || loading} />
</form>
