<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get, del } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Link from 'components/links/Link.svelte';
  import Table from './_Table.svelte';

  export let id;

  let school;
  let discounts = [];
  let title = $_('schools.discounts.title');
  let errors = [];

  onMount(async () => {
    try {
      const [ schoolResponse, discountsResponse ] = await Promise.all([
        get(`schools/${id}`),
        get(`schools/${id}/discounts`)
      ]);
      school = schoolResponse.data;
      discounts = discountsResponse.data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const handleDelete = async (event) => {
    const id = event.detail;

    try {
      await del(`schools/${school.id}/discounts/${id}`);
      discounts = discounts.filter((item) => item.id !== id);
    } catch (e) {
      errors = errorNormalizer(e);
    }
  }
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[
  { title: $_('schools.breadcrumb'), path: '/admin/schools' },
  { title: school?.name, path: `/admin/schools/${id}` },
  { title }
]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <Link href={`/admin/schools/${id}/discounts/add`} value={$_('schools.discounts.add.title')} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table items={discounts} schoolId={id} on:delete={handleDelete} />
  </div>
</div>

