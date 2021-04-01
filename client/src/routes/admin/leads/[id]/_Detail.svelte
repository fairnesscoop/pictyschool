<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';

  export let lead;
</script>

<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <table class="w-full whitespace-no-wrap">
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('leads.dashboard.reference')}</td>
        <td class="px-4 py-3 text-sm">{lead.reference}</td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('leads.dashboard.type')}</td>
        <td class="px-4 py-3 text-sm">{$_(`leads.types.${lead.type}`)}</td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('leads.dashboard.status')}</td>
        <td class="px-4 py-3 text-sm">{$_(`leads.statutes.${lead.status}`)}</td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('leads.dashboard.email')}</td>
        <td class="px-4 py-3 text-sm">{lead.email}</td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('leads.dashboard.phone_number')}</td>
        <td class="px-4 py-3 text-sm">{lead.phoneNumber}</td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('leads.dashboard.address')}</td>
        <td class="px-4 py-3 text-sm">{lead.address} - {lead.zipCode} {lead.city}</td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('leads.dashboard.number_of_students')}</td>
        <td class="px-4 py-3 text-sm">{lead.numberOfStudents}</td>
      </tr>
    </tbody>
  </table>
</div>
