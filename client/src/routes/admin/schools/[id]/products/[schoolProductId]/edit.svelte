<script context="module">
  export const preload = ({ params: { id, schoolProductId } }) => {
    return { id, schoolProductId };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get, put } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import Notice from 'components/Notice.svelte';
  import { format } from 'normalizer/money';
  import H4Title from 'components/H4Title.svelte';
  import Form from './_Form.svelte';

  export let id;
  export let schoolProductId;

  let loading = false;
  let school;
  let schoolProduct;
  let title = '';
  let errors = [];

  onMount(async () => {
    try {
      const [ schoolResponse, schoolProductResponse ] = await Promise.all([
        get(`schools/${id}`),
        get(`schools/${id}/products/${schoolProductId}`),
      ]);
      school = schoolResponse.data;
      schoolProduct = schoolProductResponse.data;
      title = $_('schools.products.edit.title', { 
        values: { 
          product: schoolProduct.product.title
        }
      });
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`schools/${id}/products/${schoolProductId}`, e.detail);
      goto(`/admin/schools/${id}/products`);
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
  { title: school ? `${school.reference} - ${school.name}` : '', path: `/admin/schools/${id}` },
  { title: $_('schools.products.title'), path: `/admin/schools/${id}/products` },
  { title: schoolProduct ? schoolProduct.product.title : '' }
]} />
<ServerErrors {errors} />
{#if schoolProduct}
  <H4Title {title} />
  <Notice notice={$_('schools.products.edit.notice', { 
    values: { 
      price: format(schoolProduct.product.unitPrice)
    }
  })}/>
  
  <Form
    on:save={onSave}
    {loading}
    parentUnitPrice={schoolProduct.parentUnitPrice}
    photographerUnitPrice={schoolProduct.photographerUnitPrice} />
{/if}