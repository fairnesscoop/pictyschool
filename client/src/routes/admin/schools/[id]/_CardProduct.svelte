<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import FolderIcon from '../../../../components/icons/FolderIcon.svelte';
  import { get } from '../../../../utils/axios';
  
  export let id;

  let total = 'N/A';

  onMount(async () => {
    try {
      total = (await get(`schools/${id}/count-products`)).data.total;
    } catch (e) {
      total = 'N/A';
    }
  });
</script>

<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
  <a href={`/admin/schools/${id}/products`}>
    <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
      <FolderIcon className={'w-5 h-5'}/>
    </div>
  </a>
  <div>
    <a href={`/admin/schools/${id}/products`}>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
        {$_('schools.dashboard.products')}
      </p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {total}
      </p>
    </a>
  </div>
</div>
