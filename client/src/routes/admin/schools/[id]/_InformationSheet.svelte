<script>
  import { _ } from 'svelte-i18n';

  export let school;
</script>

<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <table class="w-full whitespace-no-wrap">
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('schools.dashboard.reference')}</td>
        <td class="px-4 py-3 text-sm">{school.reference}</td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('schools.dashboard.type')}</td>
        <td class="px-4 py-3 text-sm">{$_(`leads.types.${school.type}`)}</td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('schools.dashboard.status')}</td>
        <td class="px-4 py-3 text-sm">{$_(`leads.statutes.${school.status}`)}</td>
      </tr>
      {#if school.email}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{$_('schools.dashboard.email')}</td>
          <td class="px-4 py-3 text-sm">{school.email}</td>
        </tr>
      {/if}
      {#if school.phoneNumber}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{$_('schools.dashboard.phone_number')}</td>
          <td class="px-4 py-3 text-sm">{school.phoneNumber}</td>
        </tr>
      {/if}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('schools.dashboard.address')}</td>
        <td class="px-4 py-3 text-sm">{school.address} - {school.zipCode} {school.city}</td>
      </tr>
      {#if school.numberOfClasses}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{$_('schools.dashboard.number_of_classes')}</td>
          <td class="px-4 py-3 text-sm">{school.numberOfClasses}</td>
        </tr>
      {/if}
      {#if school.numberOfStudents}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{$_('schools.dashboard.number_of_students')}</td>
          <td class="px-4 py-3 text-sm">{school.numberOfStudents}</td>
        </tr>
      {/if}
      {#if school.observation}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{$_('schools.dashboard.observation')}</td>
          <td class="px-4 py-3 text-sm">{school.observation}</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
