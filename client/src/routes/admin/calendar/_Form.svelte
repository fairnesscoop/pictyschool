<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get } from 'utils/axios';
  import Input from 'components/inputs/Input.svelte';
  import SelectInput from 'components/inputs/SelectInput.svelte';
  import Button from 'components/inputs/Button.svelte';

  export let date;
  export let hour = '09:00';
  export let summary = '';
  export let schoolId = '';
  export let userId = '';
  export let loading;

  const dispatch = createEventDispatcher();

  let photographers = [];
  let schools = { items: [] };

  onMount(async () => {
    let [ schoolsReponse, photographersReponse ] = await Promise.all([
      get('schools', { params: { page: 1 } }),
      get('users/photographers'),
    ]);

    schools = schoolsReponse.data;
    photographers = photographersReponse.data;
  });

  const submit = () => {
    dispatch('save', {
      schoolId,
      userId,
      summary,
      date: new Date(`${date} ${hour}`),
    });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput label={$_('calendar.form.photographer')} bind:value={userId}>
    <option>{$_('calendar.form.photographer_placeholder')}</option>
    {#each photographers as { id, firstName, lastName} (id)}
      <option value={id}>{firstName} {lastName}</option>
    {/each}
  </SelectInput>
  <SelectInput label={$_('calendar.form.school')} bind:value={schoolId}>
    <option>{$_('calendar.form.school_placeholder')}</option>
    {#each schools?.items as { id, name, reference} (id)}
      <option value={id}>{reference} - {name}</option>
    {/each}
  </SelectInput>
  <Input
    type={'time'}
    label={$_('calendar.form.hour')}
    bind:value={hour} />  
  <Input
    label={$_('calendar.form.summary')}
    required={false}
    bind:value={summary} />
  <Button
    value={$_('common.form.save')}
    {loading}
    disabled={!schoolId || !userId || !hour || loading} />
</form>
