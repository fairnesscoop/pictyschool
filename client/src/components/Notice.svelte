<script>
  import { _ } from 'svelte-i18n';
  import NoticeIcon from './icons/NoticeIcon.svelte';

  export let notice;
</script>

  <div
    class="inline-flex w-full bg-white dark:bg-gray-700 shadow-md rounded-lg overflow-hidden mb-4">
    <div class="flex justify-center items-center w-12 bg-blue-500">
      <NoticeIcon className={'h-6 w-6 text-white'} />
    </div>
    <div class="-mx-3 py-2 px-4">
      <div class="mx-3">
        <span class="text-gray-900 dark:text-white">{notice}</span>
      </div>
    </div>
  </div>