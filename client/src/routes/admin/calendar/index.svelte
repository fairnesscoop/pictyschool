<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { goto } from '@sapper/app';
  import frLocale from '@fullcalendar/core/locales/fr';
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import listPlugin from '@fullcalendar/list';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';

  let title = $_('calendar.breadcrumb');

  const fullCalendar = () => {
    const dom = document.getElementById('calendar');
    const calendar = new Calendar(dom, {
      locale: frLocale,
      plugins: [ dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin ],
      nowIndicator: true,
      showNonCurrentDates: false,
      selectable: true,
      allDaySlot: false,
      slotMinTime: '07:00:00',
      slotMaxTime: '21:00:00',
      weekNumbers: true,
      headerToolbar: {
        initialView: 'dayGridMonth',
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      },
      dateClick: (info) => {
        goto(`/admin/calendar/${info.dateStr}/add`);
      },
    });  
    calendar.render();
  };

  onMount(() => fullCalendar());
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title }]} />
<H4Title title={title} />
<div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div id="calendar"></div>
</div>
