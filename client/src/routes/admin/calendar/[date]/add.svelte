<script context="module">
  export const preload = ({ params: { date } }) => {
    return {
      date,
    };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { format } from 'date-fns';
  import { fr } from 'date-fns/locale';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from '../_Form.svelte';

  export let date;

  const formatDate = (date) => {
    return format(new Date(date), 'EE dd MMMM yyyy', { locale: fr });
  };

  let errors = [];
  let loading = false;
  const title = $_('calendar.add.title', {
    values: { date: formatDate(date) },
  });

  const onSave = async (e) => {
    try {
      loading = true;
      const { data: { id } } = await post('events', e.detail);
      goto(`/admin/calendar/${id}`);
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title: $_('calendar.breadcrumb'), path: '/admin/calendar' }, { title }]} />
<ServerErrors {errors} />
<H4Title {title} />
<Form on:save={onSave} {loading} {date} />
