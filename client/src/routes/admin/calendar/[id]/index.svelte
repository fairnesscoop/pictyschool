<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { get, del } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Link from 'components/links/Link.svelte';
  import Detail from './_Detail.svelte';

  export let id;

  let event;
  let loading = false;
  let title = '';
  let errors = [];

  onMount(async () => {
    try {
      ({ data: event } = await get(`events/${id}`));
      title = event.school.name;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const handleDelete = async () => {
    if (!confirm($_('common.confirm.delete'))) {
      return;
    }
    
    try {
      loading = true;
      await del(`events/${event.id}`);
      goto('/admin/calendar');
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

<Breadcrumb items={[{ title: $_('calendar.breadcrumb'), path: '/admin/calendar' }, { title }]} />
<div class="inline-flex items-center">
  <H4Title {title} />
</div>
<ServerErrors {errors} />

<div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
  {#if event}
    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
      {$_('calendar.detail.informations')}
      <Link href={`/admin/calendar/${id}/edit`} value={$_('common.form.edit')} />
      <button
        disable={loading}
        class="ml-1 px-2 py-1 text-sm font-medium leading-4 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-purple"
        type="button"
        on:click={handleDelete}>
        {$_('common.form.remove')}
      </button>
    </h4>
    <Detail {event} />
  {/if}
</div>
