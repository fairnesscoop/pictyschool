<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import SeeLink from 'components/links/SeeLink.svelte';
  import RedBadge from 'components/badges/RedBadge.svelte';
  import GreenBadge from 'components/badges/GreenBadge.svelte';

  export let schoolId;
  export let items;

  const dispatch = createEventDispatcher();
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('schools.shootings.list.name')}</th>
      <th class="px-4 py-3">{$_('schools.shootings.list.shooting_date')}</th>
      <th class="px-4 py-3">{$_('schools.shootings.list.closing_date')}</th>
      <th class="px-4 py-3">{$_('schools.shootings.list.class')}</th>
      <th class="px-4 py-3">{$_('schools.shootings.list.photos')}</th>
      <th class="px-4 py-3">{$_('schools.shootings.list.orders')}</th>
      <th class="px-4 py-3">{$_('schools.shootings.list.status')}</th>
      <th class="px-4 py-3">{$_('common.detail')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, name, closingDate, status, shootingDate } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{name}</td>
        <td class="px-4 py-3 text-sm">
          {format(new Date(shootingDate), 'dd/MM/yyyy', { locale: fr })}
        </td>
        <td class="px-4 py-3 text-sm">
          {format(new Date(closingDate), 'dd/MM/yyyy', { locale: fr })}
        </td>
        <td class="px-4 py-3">0</td>
        <td class="px-4 py-3">0</td>
        <td class="px-4 py-3">0</td>
        <td class="px-4 py-3 text-sm">
          {#if status === 'enabled'}
            <GreenBadge value={$_("schools.shootings.status.enabled")}/>
          {:else}
            <RedBadge value={$_("schools.shootings.status.disabled")}/>
          {/if}
        </td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-2 text-sm">
            <SeeLink href={`/admin/schools/${schoolId}/shootings/${id}`} />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
