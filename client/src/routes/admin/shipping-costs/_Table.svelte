<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'normalizer/money';
  import { createEventDispatcher } from 'svelte';
  import DeleteLink from 'components/links/DeleteLink.svelte';
  import EditLink from 'components/links/EditLink.svelte';

  const dispatch = createEventDispatcher();

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('shipping_costs.list.weight')}</th>
      <th class="px-4 py-3">{$_('shipping_costs.list.price')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, weight, price } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">
          {$_('shipping_costs.list.from', { values: { weight }})}
        </td>
        <td class="px-4 py-3 text-sm">{format(price)}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-2 text-sm">
            <EditLink href={`/admin/shipping-costs/${id}/edit`} />
            <DeleteLink on:confirm={() => dispatch('delete', id)} confirmMessage={"shipping_costs.delete.confirm"} />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
