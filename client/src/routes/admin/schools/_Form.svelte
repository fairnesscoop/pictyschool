<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from 'components/inputs/Input.svelte';
  import SelectInput from 'components/inputs/SelectInput.svelte';
  import Button from 'components/inputs/Button.svelte';
  import { TYPES, STATUTES, TYPE_KINDERGARTEN, STATUS_PUBLIC } from 'constants/school';
  import H4Title from 'components/H4Title.svelte';

  export let address = '';
  export let city = '';
  export let zipCode = '';
  export let reference = '';
  export let phoneNumber;
  export let numberOfStudents;
  export let numberOfClasses;
  export let email;
  export let observation;
  export let name = '';
  export let type = TYPE_KINDERGARTEN;
  export let status = STATUS_PUBLIC;
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
      numberOfClasses,
      type,
      status,
      email,
      observation
    });
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <Input
      label={$_('schools.form.reference')}
      bind:value={reference} />
    <Input
      label={$_('schools.form.name')}
      bind:value={name} />
    <SelectInput
      label={$_('schools.form.type')}
      bind:value={type}>
      {#each TYPES as type}
        <option value={type}>{$_(`schools.types.${type}`)}</option>
      {/each}
    </SelectInput>
    <SelectInput
      label={$_('schools.form.status')}
      bind:value={status}>
      {#each STATUTES as status}
        <option value={status}>{$_(`schools.statutes.${status}`)}</option>
      {/each}
    </SelectInput>
    <Input
      label={$_('schools.form.address')}
      bind:value={address} />
    <Input
      label={$_('schools.form.city')}
      bind:value={city} />
    <Input
      label={$_('schools.form.zip_code')}
      bind:value={zipCode} />
    <Input
      label={$_('schools.form.email')}
      type={'email'}
      required={false}
      bind:value={email} />
    <Input
      label={$_('schools.form.phone_number')}
      required={false}
      bind:value={phoneNumber} />
    <Input
      label={$_('schools.form.number_of_students')}
      required={false}
      type={'number'}
      bind:value={numberOfStudents} />
    <Input
      label={$_('schools.form.number_of_classes')}
      required={false}
      type={'number'}
      bind:value={numberOfClasses} />
    <Input
      label={$_('schools.form.observation')}
      required={false}
      bind:value={observation} />
  </div>
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!reference || !name || !address || !city || !zipCode || !status || !type || loading} />
</form>
