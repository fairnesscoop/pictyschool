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
  let product;
  let title = '';
  let errors = [];

  onMount(async () => {
    try {
      ({ data: product } = await get(`products/${id}`));
      title = $_('products.edit.title', { values: { title: product.title } });
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`products/${id}`, e.detail);
      goto('/products');
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

<Breadcrumb items={[{ title: $_('products.breadcrumb'), path: '/admin/products' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
{#if product}
  <Form
    on:save={onSave}
    title={product.title}
    description={product.description}
    unitPrice={product.unitPrice}
    {loading} />
{/if}
