<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { goto } from '@sapper/app';
  import { fr } from 'date-fns/locale';
  import { format } from 'date-fns';
  import { onMount } from 'svelte';
  import { get, put } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from '../_Form.svelte';

  export let id;

  let event;
  let hour;
  let loading = false;
  let title = '';
  let errors = [];

  onMount(async () => {
    try {
      ({ data: event } = await get(`events/${id}`));
      title = event.school.name;
      hour = format(new Date(event.start), 'HH:mm');
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`events/${id}`, e.detail);
      goto(`/admin/calendar/${id}`);
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[
  { title: $_('calendar.breadcrumb'), path: '/admin/calendar' },
  { title, path: `/admin/calendar/${id}` },
  { title: $_('calendar.edit.title') }
]} />
<ServerErrors {errors} />

{#if event}
  <div class="inline-flex items-center">
    <H4Title title={$_('calendar.edit.sub_title', {
      values: {
        date: format(new Date(event.start), 'EE dd MMMM yyyy', { locale: fr })
      }
    })} />
  </div>
  <div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <Form 
      on:save={onSave}
      {loading}
      summary={event.summary}
      userId={event.user.id}
      {hour}
      schoolId={event.school.id}
      date={event.start} />
  </div>
{/if}
