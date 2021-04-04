<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get, del } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import DeleteLink from 'components/links/DeleteLink.svelte';
  import ServerErrors from 'components/ServerErrors.svelte';
  import RedBadge from 'components/badges/RedBadge.svelte';
  import GreenBadge from 'components/badges/GreenBadge.svelte';

  export let id;

  let schoolUsers = [];
  let errors = [];

  const handleDelete = async (userId, type) => {
    const delPath = type === 'voucher' ?
      `schools/${id}/vouchers/${userId}` : 
      `schools/${id}/users/${userId}`
    try {
      schoolUsers = schoolUsers.filter((item) => item.id !== userId);
      await del(delPath);
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
      {#each schoolUsers as { email, type, id } (id)}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{email}</td>
          <td class="px-4 py-3 text-sm">
            {#if type === 'voucher'}
              <RedBadge value={$_("schools.users.status.waiting")}/>
            {:else}
              <GreenBadge value={$_("schools.users.status.enable")}/>
            {/if}
          </td>
          <td class="px-4 py-3 text-sm">
            <DeleteLink on:confirm={() => handleDelete(id, type)} confirmMessage={"schools.users.delete.confirm"} />
          </td>
        </tr>
      {/each}      
    </tbody>
  </table>
</div>
