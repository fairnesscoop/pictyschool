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
  let school;
  let title = $_('schools.edit.title');
  let errors = [];

  onMount(async () => {
    try {
      ({ data: school } = await get(`schools/${id}`));
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`schools/${id}`, e.detail);
      goto(`/admin/schools/${id}`);
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
  { title }
]} />
<H4Title {title} />
<ServerErrors {errors} />

{#if school}
  <Form
    on:save={onSave}
    reference={school.reference}
    name={school.name}
    address={school.address}
    city={school.city}
    zipCode={school.zipCode}
    phoneNumber={school.phoneNumber}
    email={school.email}
    pdv={school.pdv}
    observation={school.observation}
    status={school.status}
    type={school.type}
    numberOfClasses={school.numberOfClasses}
    numberOfStudents={school.numberOfStudents}
    {loading} />
{/if}
