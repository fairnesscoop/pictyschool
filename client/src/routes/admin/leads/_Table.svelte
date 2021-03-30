<script>
  import { _ } from 'svelte-i18n';
  import { createEventDispatcher } from 'svelte';
  import DeleteLink from 'components/links/DeleteLink.svelte';
  import SeeLink from 'components/links/SeeLink.svelte';

  const dispatch = createEventDispatcher();

  export let items;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('leads.list.reference')}</th>
      <th class="px-4 py-3">{$_('leads.list.name')}</th>
      <th class="px-4 py-3">{$_('leads.list.email')}</th>
      <th class="px-4 py-3">{$_('leads.list.phone_number')}</th>
      <th class="px-4 py-3">{$_('leads.list.address')}</th>
      <th class="px-4 py-3">{$_('leads.list.city')}</th>
      <th class="px-4 py-3">{$_('leads.list.number_of_students')}</th>
      <th class="px-4 py-3">{$_('common.actions')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each items as { id, name, reference, phoneNumber, address, city, zipCode, email, numberOfStudents } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{reference}</td>
        <td class="px-4 py-3 text-sm">{name}</td>
        <td class="px-4 py-3 text-sm">{email}</td>
        <td class="px-4 py-3 text-sm">{phoneNumber}</td>
        <td class="px-4 py-3 text-sm">{address}</td>
        <td class="px-4 py-3 text-sm">{city} - {zipCode}</td>
        <td class="px-4 py-3 text-sm">{numberOfStudents}</td>
        <td class="px-4 py-3">
          <div class="flex items-center space-x-2 text-sm">
            <SeeLink href={`/admin/leads/${id}`} />
            <DeleteLink on:confirm={() => dispatch('delete', id)} confirmMessage={"leads.delete.confirm"} />
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>
