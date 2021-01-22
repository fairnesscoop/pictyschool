<script>
  import { _ } from 'svelte-i18n';
  import SeeLink from '../../components/links/SeeLink.svelte';
  import EditLink from '../../components/links/EditLink.svelte';
  import PhotoIcon from '../../components/icons/PhotoIcon.svelte';

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('schools.list.school_type')}</th>
      <th class="px-4 py-3">{$_('schools.list.reference')}</th>
      <th class="px-4 py-3">{$_('schools.list.name')}</th>
      <th class="px-4 py-3">{$_('schools.list.address')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, schoolType, name, reference, address, city, zipCode } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{schoolType?.name}</td>
        <td class="px-4 py-3 text-sm">{reference}</td>
        <td class="px-4 py-3 text-sm">{name}</td>
        <td class="px-4 py-3 text-sm">{address} - {city} {zipCode}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-4 text-sm">
            <SeeLink href={`/schools/${id}`} />
            <EditLink href="{`/schools/${id}/edit`}" />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
