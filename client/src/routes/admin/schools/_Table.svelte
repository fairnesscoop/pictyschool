<script>
  import { _ } from 'svelte-i18n';
  import { stores } from '@sapper/app';
  import SeeLink from 'components/links/SeeLink.svelte';
  import EditLink from 'components/links/EditLink.svelte';
  import PhotoIcon from 'components/icons/PhotoIcon.svelte';
  import { ROLE_PHOTOGRAPHER } from 'constants/roles';

  export let items;

  const { session } = stores();
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
        <td class="px-4 py-3 text-sm">{#if schoolType}{schoolType.name}{/if}</td>
        <td class="px-4 py-3 text-sm">{reference}</td>
        <td class="px-4 py-3 text-sm">{name}</td>
        <td class="px-4 py-3 text-sm">{address} - {city} {zipCode}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-2 text-sm">
            <SeeLink href={`/admin/schools/${id}`} />
            {#if $session.user?.scope === ROLE_PHOTOGRAPHER}
              <EditLink href={`/admin/schools/${id}/edit`} />
            {/if}
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
