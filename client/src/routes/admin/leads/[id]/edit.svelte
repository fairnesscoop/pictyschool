<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
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

  let loading = false;
  let lead;
  let title = $_('leads.edit.title');
  let errors = [];

  onMount(async () => {
    try {
      ({ data: lead } = await get(`leads/${id}`));
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`leads/${id}`, e.detail);
      goto(`/admin/leads/${id}`);
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
  { title: $_('leads.breadcrumb'), path: '/admin/leads' },
  { title: lead?.name, path: `/admin/leads/${id}` },
  { title }
]} />
<H4Title {title} />
<ServerErrors {errors} />

{#if lead}
  <Form
    on:save={onSave}
    reference={lead.reference}
    name={lead.name}
    address={lead.address}
    city={lead.city}
    zipCode={lead.zipCode}
    phoneNumber={lead.phoneNumber}
    email={lead.email}
    numberOfStudents={lead.numberOfStudents}
    {loading} />
{/if}
