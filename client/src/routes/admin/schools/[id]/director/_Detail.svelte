<script>
  import { _ } from 'svelte-i18n';

  export let director;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3" colspan="2">{$_('schools.director.informations')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3 text-sm">{$_('schools.director.first_name')}</td>
      <td class="px-4 py-3 text-sm">{director.firstName}</td>
    </tr>
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3 text-sm">{$_('schools.director.last_name')}</td>
      <td class="px-4 py-3 text-sm">{director.lastName}</td>
    </tr>
    <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3 text-sm">{$_('schools.director.email')}</td>
      <td class="px-4 py-3 text-sm">{director.email}</td>
    </tr>
  </tbody>
</table>
