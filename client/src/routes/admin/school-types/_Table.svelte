<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import EditLink from 'components/links/EditLink.svelte';
  import DeleteLink from 'components/links/DeleteLink.svelte';

  export let items;

  const dispatch = createEventDispatcher();
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('schools.types.list.name')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, name } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{name}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-2 text-sm">
            <EditLink href={`/admin/school-types/${id}/edit`} />
            <DeleteLink on:confirm={() => dispatch('delete', id)} confirmMessage={"schools.types.delete.confirm"} />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
