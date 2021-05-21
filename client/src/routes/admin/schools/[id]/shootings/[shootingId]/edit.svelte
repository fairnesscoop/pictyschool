<script context="module">
  export const preload = ({ params: { id, shootingId } }) => {
    return { id, shootingId };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get, put } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';

  export let id;
  export let shootingId;

  let loading = false;
  let school;
  let shooting;
  let title = $_('schools.shootings.edit.title');
  let errors = [];

  onMount(async () => {
    try {
      const [ schoolResponse, shootingResponse ] = await Promise.all([
        get(`schools/${id}`),
        get(`schools/${id}/shootings/${shootingId}`)
      ]);
      school = schoolResponse.data;
      shooting = shootingResponse.data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`schools/${id}/shootings/${shootingId}`, e.detail);
      goto(`/admin/schools/${id}/shootings/${shootingId}`);
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
  { title: $_('schools.breadcrumb'), path: '/admin/schools' },
  { title: school?.name, path: `/admin/schools/${id}` },
  { title: $_('schools.shootings.title'), path: `/admin/schools/${id}/shootings` },
  { title: shooting?.name, path: `/admin/schools/${id}/shootings/${shootingId}` },
  { title }
]} />

<H4Title {title} />
<ServerErrors {errors} />
{#if shooting}
  <Form
    on:save={onSave}
    name={shooting.name}
    closingDate={shooting.closingDate}
    shootingDate={shooting.shootingDate}
    {loading} />
{/if}
