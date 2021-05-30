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
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from '../_Form.svelte';

  export let id;

  let loading = false;
  let shippingCost;
  const title = $_('shipping_costs.edit.title');
  let errors = [];

  onMount(async () => {
    try {
      ({ data: shippingCost } = await get(`shipping-costs/${id}`));
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const onSave = async (e) => {
    try {
      loading = true;
      await put(`shipping-costs/${id}`, e.detail);
      goto('/admin/shipping-costs');
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

<Breadcrumb items={[{ title: $_('shipping_costs.breadcrumb'), path: '/admin/shipping-costs' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
{#if shippingCost}
  <Form
    on:save={onSave}
    price={shippingCost.price}
    grams={shippingCost.grams}
    {loading} />
{/if}
