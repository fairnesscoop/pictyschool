<script>
  import { onMount } from 'svelte';
  import { get } from 'utils/axios';
  import { _ } from 'svelte-i18n';
  import { goto } from '@sapper/app';
  import frLocale from '@fullcalendar/core/locales/fr';
  import { Calendar } from '@fullcalendar/core';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';

  let title = $_('calendar.breadcrumb');

  const fullCalendar = () => {
    const calendar = new Calendar(document.getElementById('calendar'), {
      locale: frLocale,
      plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
      nowIndicator: true,
      showNonCurrentDates: false,
      selectable: true,
      allDaySlot: false,
      slotMinTime: '07:00:00',
      slotMaxTime: '21:00:00',
      weekNumbers: true,
      eventDidMount: function({ el, event}) {
        new Tooltip(el, {
          title: event.title,
          placement: 'top',
          trigger: 'hover',
          container: 'body'
        });
      },
      headerToolbar: {
        initialView: 'dayGridMonth',
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      weekends: false,
      events: async ({startStr, endStr}, successCallback, failureCallback) => {
        try {
          const { data } = await get('events', { params: { fromDate: startStr, toDate: endStr }});
          successCallback(data);
        } catch {
          successCallback([]);
        }
      },
      dateClick: (info) => {
        goto(`/admin/calendar/${info.dateStr}/add`);
      },
    });  
    calendar.render();
  };

  onMount(async() => fullCalendar());
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
  <script src='https://unpkg.com/popper.js/dist/umd/popper.min.js'></script>
  <script src='https://unpkg.com/tooltip.js/dist/umd/tooltip.min.js'></script>
</svelte:head>

<Breadcrumb items={[{ title }]} />
<H4Title title={title} />
<div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
  <div id="calendar"></div>
</div>
