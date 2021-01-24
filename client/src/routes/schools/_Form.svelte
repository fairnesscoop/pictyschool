<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from '../../utils/axios';
  import Input from '../../components/inputs/Input.svelte';
  import Button from '../../components/inputs/Button.svelte';
  import SelectInput from '../../components/inputs/SelectInput.svelte';

  export let address = '';
  export let city = '';
  export let zipCode = '';
  export let reference = '';
  export let schoolTypeId = '';
  export let name = '';
  export let loading;

  let products = [];

  onMount(async () => {
    products = (await get('school-types')).data;
  });

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', { reference, schoolTypeId, city, zipCode, name, address });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput
    label={$_('schools.form.school_type')}
    bind:value={schoolTypeId}>
    <option>{$_('schools.form.school_type_placeholder')}</option>
    {#each products as { id, name }}
      <option value={id} selected={schoolTypeId === id}>{name}</option>
    {/each}
  </SelectInput>
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
    disabled={!reference || !schoolTypeId || !name || !address || !city || !zipCode || loading} />
</form>
