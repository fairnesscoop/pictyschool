<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from '../../../../../components/inputs/Input.svelte';
  import Button from '../../../../../components/inputs/Button.svelte';

  export let unitPrice;
  export let loading;

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', { unitPrice });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    type={'money'}
    label={$_('schools.products.form.unit_price')}
    bind:value={unitPrice} />
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!unitPrice || loading} />
</form>
