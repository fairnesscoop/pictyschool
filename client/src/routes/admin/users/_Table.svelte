<script>
  import { _ } from 'svelte-i18n';

  export let users;
</script>

<table class="w-full whitespace-no-wrap">
  <thead>
    <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
      <th class="px-4 py-3">{$_('users.list.first_name')}</th>
      <th class="px-4 py-3">{$_('users.list.last_name')}</th>
      <th class="px-4 py-3">{$_('users.list.email')}</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
    {#each users as { id, firstName, lastName, email } (id)}
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{firstName}</td>
        <td class="px-4 py-3 text-sm">{lastName}</td>
        <td class="px-4 py-3 text-sm">{email}</td>
      </tr>
    {/each}
  </tbody>
</table>
