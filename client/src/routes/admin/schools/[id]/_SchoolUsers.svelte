<script>
  import { onMount } from 'svelte';
  import { get } from 'utils/axios';

  export let id;

  let schoolUsers = [];

  onMount(async () => {
    try {
      ({ data: schoolUsers } = await get(`schools/${id}/users`));
    } catch (e) {
      schoolUsers = [];
    }
  });
</script>

<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <table class="w-full whitespace-no-wrap">
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      {#each schoolUsers as schoolUser}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{schoolUser.firstName} {schoolUser.lastName}</td>
          <td class="px-4 py-3 text-sm">{schoolUser.email}</td>
          <td class="px-4 py-3 text-sm"></td>
        </tr>
      {/each}      
    </tbody>
  </table>
</div>
