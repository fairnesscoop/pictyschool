<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from '../../../../../../components/inputs/Input.svelte';
  import Button from '../../../../../../components/inputs/Button.svelte';

  export let parentUnitPrice;
  export let photographerUnitPrice;
  export let loading;

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', { parentUnitPrice, photographerUnitPrice });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    type={'money'}
    label={$_('schools.products.form.photographer_unit_price')}
    bind:value={photographerUnitPrice} />
  <Input
    type={'money'}
    label={$_('schools.products.form.parent_unit_price')}
    bind:value={parentUnitPrice} />
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!parentUnitPrice || !photographerUnitPrice || loading} />
</form>
