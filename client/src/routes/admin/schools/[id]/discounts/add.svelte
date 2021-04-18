<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get, post } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from './_Form.svelte';

  export let id;

  let loading = false;
  let school;
  let title = $_('schools.discounts.add.title');
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
      await post(`schools/${id}/discounts`, e.detail);
      goto(`/admin/schools/${id}/discounts`);
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
  { title: $_('schools.discounts.title'), path: `/admin/schools/${id}/discounts` },
  { title }
]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form on:save={onSave} {loading} />
