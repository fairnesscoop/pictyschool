<script>
  import { _ } from 'svelte-i18n';
  import OfferIcon from 'components/icons/OfferIcon.svelte';

  export let id;
</script>

<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
  <a href={`/admin/schools/${id}/offers`}>
    <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
      <OfferIcon className={'w-5 h-5'}/>
    </div>
  </a>
  <div>
    <a href={`/admin/schools/${id}/offers`}>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{$_('schools.dashboard.offers')}</p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">0</p>
    </a>
  </div>
</div>
