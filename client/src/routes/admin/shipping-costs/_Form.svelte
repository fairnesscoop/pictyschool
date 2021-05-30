<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from 'components/inputs/Input.svelte';
  import Button from 'components/inputs/Button.svelte';

  export let price = '';
  export let weight = 0;
  export let loading;

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', { price, weight });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    type={"number"}
    label={$_('shipping_costs.form.weight')}
    bind:value={weight} />
  <Input
    type={'money'}
    label={$_('shipping_costs.form.price')}
    bind:value={price} />
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!weight || !price || loading} />
</form>
