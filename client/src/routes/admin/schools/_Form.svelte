<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from '../../../utils/axios';
  import Input from '../../../components/inputs/Input.svelte';
  import Button from '../../../components/inputs/Button.svelte';
  import SelectInput from '../../../components/inputs/SelectInput.svelte';
  import H4Title from '../../../components/H4Title.svelte';

  export let address = '';
  export let city = '';
  export let zipCode = '';
  export let reference = '';
  export let phoneNumber;
  export let director;
  export let directorCivility;
  export let numberOfStudents;
  export let numberOfClasses;
  export let email;
  export let pdv;
  export let observation;
  export let schoolTypeId = '';
  export let name = '';
  export let loading;

  let products = [];

  onMount(async () => {
    products = (await get('school-types')).data;
  });

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', {
      reference,
      schoolTypeId,
      city,
      zipCode,
      name,
      address,
      phoneNumber,
      director,
      directorCivility,
      numberOfStudents,
      numberOfClasses,
      email,
      pdv: pdv ? new Date(pdv) : null,
      observation
    });
  };
</script>

<form on:submit|preventDefault={submit}>
  <div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div class="flex">
      <div class="w-1/2 pr-2">
        <SelectInput
          label={$_('schools.form.school_type')}
          bind:value={schoolTypeId}>
          <option>{$_('schools.form.school_type_placeholder')}</option>
          {#each products as { id, name }}
            <option value={id} selected={schoolTypeId === id}>{name}</option>
          {/each}
        </SelectInput>
        <Input
          label={$_('schools.form.name')}
          bind:value={name} />
        <Input
          label={$_('schools.form.city')}
          bind:value={city} />
      </div>
      <div class="w-1/2 pl-2">
        <Input
          label={$_('schools.form.reference')}
          bind:value={reference} />
        <Input
          label={$_('schools.form.address')}
          bind:value={address} />
        <Input
          label={$_('schools.form.zip_code')}
          bind:value={zipCode} />
      </div>
    </div>
  </div>
  <H4Title title={$_('schools.form.complementary_informations')}/>
  <div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div class="flex">
      <div class="w-1/2 pr-2">
        <SelectInput
          label={$_('schools.form.director_civility')}
          required={false}
          bind:value={directorCivility}>
          <option>{$_('schools.form.director_civility_placeholder')}</option>
          {#each ['mr', 'mme'] as civility}
            <option value={civility}>{civility}</option>
          {/each}
        </SelectInput>
        <Input
          type={"email"}
          required={false}
          label={$_('schools.form.email')}
          bind:value={email} />
        <Input
          label={$_('schools.form.number_of_students')}
          required={false}
          type={'number'}
          bind:value={numberOfStudents} />
        <Input
          type={'datetime'}
          label={$_('schools.form.pdv')}
          required={false}
          bind:value={pdv} />
      </div>
      <div class="w-1/2 pl-2">
        <Input
          label={$_('schools.form.director')}
          required={false}
          bind:value={director} />
        <Input
          label={$_('schools.form.phone_number')}
          required={false}
          bind:value={phoneNumber} />
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
    </div>
  </div>
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!reference || !schoolTypeId || !name || !address || !city || !zipCode || loading} />
</form>
