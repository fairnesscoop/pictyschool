<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import { format } from '../../../../../normalizer/money';
  import EditLink from '../../../../../components/links/EditLink.svelte';
  import DeleteLink from '../../../../../components/links/DeleteLink.svelte';

  export let schoolId;
  export let items;

  const dispatch = createEventDispatcher();
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('schools.products.list.product')}</th>
      <th class="px-4 py-3">{$_('schools.products.list.photographer_unit_price')}</th>
      <th class="px-4 py-3">{$_('schools.products.list.parent_unit_price')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, product, parentUnitPrice, photographerUnitPrice } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{product.title}</td>
        <td class="px-4 py-3 text-sm">
          {format(photographerUnitPrice)}
          {#if photographerUnitPrice !== product.unitPrice}
            <span class="text-xs line-through">{format(product.unitPrice)}</span>
          {/if}
          </td>
        <td class="px-4 py-3 text-sm">{format(parentUnitPrice)}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <EditLink href={`/admin/schools/${schoolId}/products/${id}/edit`} />
            <DeleteLink on:confirm={() => dispatch('delete', id)} confirmMessage="schools.products.delete.confirm" />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
