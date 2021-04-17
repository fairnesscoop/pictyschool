<script>
  import { _ } from 'svelte-i18n';
  import StatsIcon from 'components/icons/StatsIcon.svelte';

  export let id;
</script>

<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
  <a href={`/admin/schools/${id}/stats`}>
    <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
      <StatsIcon className={'w-5 h-5'}/>
    </div>
  </a>
  <div>
    <a href={`/admin/schools/${id}/stats`}>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{$_('schools.dashboard.stats')}</p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">0</p>
    </a>
  </div>
</div>
