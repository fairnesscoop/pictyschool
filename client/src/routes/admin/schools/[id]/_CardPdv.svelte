<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import PhotoIcon from 'components/icons/PhotoIcon.svelte';

  export let school;
</script>

<div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
  <a href={`/admin/schools/${school.id}/edit`}>
    <div class="p-3 mr-4 text-red-500 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-500">
      <PhotoIcon className={'w-5 h-5'}/>
    </div>
    </a>
  <div>
    <a href={`/admin/schools/${school.id}/edit`}>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{$_('schools.dashboard.pdv')}</p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
        {#if school.pdv}
          {format(new Date(school.pdv), 'dd/MM/yyyy HH:mm', { locale: fr })}
        {:else}
          {$_('common.not_defined')}
        {/if}
      </p>
    </a>
  </div>
</div>
