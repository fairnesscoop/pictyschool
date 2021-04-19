<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import { format } from 'normalizer/money';
  import DeleteLink from 'components/links/DeleteLink.svelte';

  export let schoolId;
  export let items;

  const dispatch = createEventDispatcher();
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('schools.discounts.list.amount')}</th>
      <th class="px-4 py-3">{$_('schools.discounts.list.discount')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, amount, value, type } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">
          {$_('schools.discounts.list.from', { values: { amount: format(amount) }})}
        </td>
        <td class="px-4 py-3 text-sm">
          {#if type === 'percent'}
            {$_('schools.discounts.list.value', { values: { amount: `${value} %`}})}
          {:else}
            {$_('schools.discounts.list.value', { values: { amount: `${format(value)}`}})}
          {/if}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-2 text-sm">
            <DeleteLink on:confirm={() => dispatch('delete', id)} confirmMessage={"schools.discounts.delete.confirm"} />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
