<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from 'components/inputs/Input.svelte';
  import SelectInput from 'components/inputs/SelectInput.svelte';
  import Button from 'components/inputs/Button.svelte';
  import { TYPES, STATUTES, TYPE_KINDERGARTEN, STATUS_PUBLIC } from 'constants/school';

  export let address = '';
  export let city = '';
  export let zipCode = '';
  export let reference = '';
  export let type = TYPE_KINDERGARTEN;
  export let status = STATUS_PUBLIC;
  export let phoneNumber;
  export let numberOfStudents;
  export let email;
  export let name = '';
  export let loading;

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {
      reference,
      city,
      zipCode,
      name,
      address,
      phoneNumber,
      numberOfStudents,
      email,
      type,
      status
    });
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">  
    <Input
      label={$_('leads.form.reference')}
      bind:value={reference} />
    <SelectInput
      label={$_('leads.form.type')}
      bind:value={type}>
      {#each TYPES as type}
        <option value={type}>{$_(`leads.types.${type}`)}</option>
      {/each}
    </SelectInput>
    <SelectInput
      label={$_('leads.form.status')}
      bind:value={status}>
      {#each STATUTES as status}
        <option value={status}>{$_(`leads.statutes.${status}`)}</option>
      {/each}
    </SelectInput>
    <Input
      label={$_('leads.form.name')}
      bind:value={name} />
    <Input
      label={$_('leads.form.address')}
      bind:value={address} />
    <Input
      label={$_('leads.form.city')}
      bind:value={city} />
    <Input
      label={$_('leads.form.zip_code')}
      bind:value={zipCode} />
    <Input
      label={$_('leads.form.phone_number')}
      required={false}
      bind:value={phoneNumber} />
    <Input
      label={$_('leads.form.email')}
      bind:value={email} />
    <Input
      label={$_('leads.form.number_of_students')}
      required={false}
      type={'number'}
      bind:value={numberOfStudents} />
  </div>
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!reference || !email || !name || !address || !city || !zipCode || !phoneNumber || !status || !type || loading} />
</form>
