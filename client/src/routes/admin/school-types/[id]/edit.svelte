<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get, put } from '../../../../utils/axios';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import Form from '../_Form.svelte';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../components/H4Title.svelte';

  export let id;

  let loading = false;
  let schoolType;
  let title = '';
  let errors = [];

  onMount(async () => {
    try {
      ({ data: schoolType } = await get(`school-types/${id}`));
      title = $_('schools.types.edit.title', { values: { title: schoolType.name } });
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`school-types/${id}`, e.detail);
      goto('/admin/school-types');
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

<Breadcrumb items={[{ title: $_('schools.types.breadcrumb'), path: '/admin/school-types' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
{#if schoolType}
  <Form
    on:save={onSave}
    name={schoolType.name}
    {loading} />
{/if}
