<script>
  import { onMount } from 'svelte';
  import { get, del } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import DeleteLink from 'components/links/DeleteLink.svelte';
  import ServerErrors from 'components/ServerErrors.svelte';

  export let id;

  let schoolUsers = [];
  let errors = [];

  const handleDelete = async (id) => {
    try {
      await del(`users/${id}`);
      schoolUsers = schoolUsers.filter((item) => item.id !== id);
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  onMount(async () => {
    try {
      ({ data: schoolUsers } = await get(`schools/${id}/users`));
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<ServerErrors {errors} />
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <table class="w-full whitespace-no-wrap">
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      {#each schoolUsers as { firstName, lastName, email, id } (id)}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{firstName} {lastName}</td>
          <td class="px-4 py-3 text-sm">{email}</td>
          <td class="px-4 py-3 text-sm">
            <DeleteLink on:confirm={() => handleDelete(id)} confirmMessage={"schools.users.delete.confirm"} />
          </td>
        </tr>
      {/each}      
    </tbody>
  </table>
</div>
