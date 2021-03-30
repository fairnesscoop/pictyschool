<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from 'components/inputs/Input.svelte';
  import Button from 'components/inputs/Button.svelte';

  export let address = '';
  export let city = '';
  export let zipCode = '';
  export let reference = '';
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
      email
    });
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">  
    <Input
      label={$_('leads.form.reference')}
      bind:value={reference} />
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
    disabled={!reference || !email || !name || !address || !city || !zipCode || !phoneNumber || loading} />
</form>
