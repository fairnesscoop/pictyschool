<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get, del } from '../../../../utils/axios';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../components/H4Title.svelte';
  import Link from '../../../../components/links/Link.svelte';
  import Table from './_Table.svelte';

  export let id;

  let school;
  let title = $_('schools.products.title');
  let errors = [];
  let schoolProducts = [];

  onMount(async () => {
    try {
      const [ schoolResponse, schoolProductsResponse ] = await Promise.all([
        get(`schools/${id}`),
        get(`schools/${id}/products`),
      ]);
      school = schoolResponse.data;
      schoolProducts = schoolProductsResponse.data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const handleDeleteProduct = async (event) => {
    const productId = event.detail;
    try {
      await del(`schools/${id}/products/${productId}`);
      schoolProducts = schoolProducts.filter((product) => product.id !== productId);
    } catch (e) {
      errors = errorNormalizer(e);
    }
  }
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[
  { title: $_('schools.breadcrumb'), path: '/schools' },
  { title: school && `${school.reference} - ${school.name}`, path: `/schools/${id}` },
  { title }
]} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <Link href={`/schools/${id}/products/add`} value={$_('schools.products.add.title')} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table items="{schoolProducts}" schoolId="{id}" on:delete={handleDeleteProduct} />
  </div>
</div>
<ServerErrors {errors} />
