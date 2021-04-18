<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import Input from 'components/inputs/Input.svelte';
  import Button from 'components/inputs/Button.svelte';
  import SelectInput from 'components/inputs/SelectInput.svelte';

  export let amount = '';
  export let value = '';
  export let type = 'percent';
  export let loading;

  const dispatch = createEventDispatcher();
  const submit = () => {
    dispatch('save', { type, amount, value });
  };
</script>

<form
  on:submit|preventDefault={submit}
  class="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <SelectInput label={$_('schools.discounts.form.type')} bind:value={type}>
    {#each ['percent', 'amount'] as value}
      <option value={value} selected={value === type}>
        {$_(`schools.discounts.type.${value}`)}
      </option>
    {/each}
  </SelectInput>
  <Input
    type={'money'}
    label={$_('schools.discounts.form.amount')}
    bind:value={amount} />
  <Input
    type={'money'}
    label={$_('schools.discounts.form.value')}
    bind:value={value} />
  <Button
    value={$_('common.form.save')}
    loading={loading}
    disabled={!type || !value || !amount || loading} />
</form>
