<script>
  import { _ } from 'svelte-i18n';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';

  export let event;
</script>

<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <table class="w-full whitespace-no-wrap">
    <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('calendar.detail.date')}</td>
        <td class="px-4 py-3 text-sm">
          {format(new Date(event.start), 'EE dd MMMM yyyy à HH:mm', { locale: fr })}
        </td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('calendar.detail.school')}</td>
        <td class="px-4 py-3 text-sm">
          <a target="_blank" href={`/admin/schools/${event.school.id}`}>
            {event.school.reference} - {event.school.name}
          </a>
        </td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('calendar.detail.address')}</td>
        <td class="px-4 py-3 text-sm">
          {event.school.address}<br/>
          {event.school.zipCode} {event.school.city}
        </td>
      </tr>
      <tr class="text-gray-700 dark:text-gray-400">
        <td class="px-4 py-3 text-sm">{$_('calendar.detail.photographer')}</td>
        <td class="px-4 py-3 text-sm">{event.firstName} {event.lastName}</td>
      </tr>
      {#if event.summary}
        <tr class="text-gray-700 dark:text-gray-400">
          <td class="px-4 py-3 text-sm">{$_('calendar.detail.summary')}</td>
          <td class="px-4 py-3 text-sm">{event.summary}</td>
        </tr>
      {/if}
    </tbody>
  </table>
</div>
