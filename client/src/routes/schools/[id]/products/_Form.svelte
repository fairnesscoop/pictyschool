<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher, onMount } from 'svelte';
  import { get } from '../../../../utils/axios';
  import Input from '../../../../components/inputs/Input.svelte';
  import { format } from '../../../../normalizer/money';
  import Button from '../../../../components/inputs/Button.svelte';
  import SelectInput from '../../../../components/inputs/SelectInput.svelte';

  export let unitPrice = '';
  export let productId = '';
  export let loading;

  let products = { items: [] };

  onMount(async () => {
    products = (await get('products', { params: { page: 1 } })).data;
  });

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', { productId, unitPrice });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput
    label={$_('schools.products.form.product')}
    bind:value={productId}>
    <option>{$_('schools.products.form.product_placeholder')}</option>
    {#each products.items as { id, title, unitPrice }}
      <option value={id}>{title} ({format(unitPrice)})</option>
    {/each}
  </SelectInput>
  <Input
    type={'money'}
    label={$_('schools.products.form.unit_price')}
    bind:value={unitPrice} />
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!productId || !unitPrice || loading} />
</form>
