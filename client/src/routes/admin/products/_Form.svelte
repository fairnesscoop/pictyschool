<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from '../../../components/inputs/Input.svelte';
  import Button from '../../../components/inputs/Button.svelte';

  export let unitPrice = '';
  export let description = '';
  export let title = '';
  export let loading;

  const dispatch = createEventDispatcher();

  const submit = () => {
    dispatch('save', { title, description, unitPrice });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <Input
    label={$_('products.form.title')}
    bind:value={title} />
  <Input
    label={$_('products.form.description')}
    required={false}
    bind:value={description} />
  <Input
    type={'money'}
    label={$_('products.form.unit_price')}
    bind:value={unitPrice} />
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!title || !unitPrice || loading} />
</form>
