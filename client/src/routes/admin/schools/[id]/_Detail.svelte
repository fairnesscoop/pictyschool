<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';

  export let school;
</script>

<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <table class="w-full whitespace-no-wrap">
    <thead>
      <tr class="text-xs font-semibold text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
        <th class="px-4 py-3" colspan="2">{$_('schools.dashboard.informations', { values: { name: school.name}})}</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      {#if school.schoolType}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{$_('schools.dashboard.school_type')}</td>
          <td class="px-4 py-3 text-sm">{school.schoolType.name}</td>
        </tr>
      {/if}
      {#if school.directorCivility && school.director}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{$_('schools.dashboard.director')}</td>
          <td class="px-4 py-3 text-sm">{school.directorCivility} {school.director}</td>
        </tr>
      {/if}
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
      {#if school.pdv}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{$_('schools.dashboard.pdv')}</td>
          <td class="px-4 py-3 text-sm">{format(new Date(school.pdv), 'dd/MM/yyyy HH:mm')}</td>
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
