<script context="module">
  export const preload = ({ query }) => {
    return {
      page: query.page || 1,
    };
  };
</script>

<script>
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { get, del } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';
  import ServerErrors from 'components/ServerErrors.svelte';
  import Table from './_Table.svelte';
  import AddLink from 'components/links/AddLink.svelte';
  import Pagination from 'components/Pagination.svelte';
  import { historyPushState } from 'utils/url';

  export let page;

  const { session } = stores();

  let title = $_('leads.breadcrumb');
  let errors = [];
  let response = {
    items: [],
    totalItems: 0,
    pageCount: 0,
  };

  onMount(() => fetchLeads());

  const changePage = async (e) => {
    page = e.detail;
    historyPushState('leads', { page });
    fetchLeads();
  };

  const fetchLeads = async () => {
    try {
      response = (await get('leads', { params: { page } })).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  const handleDelete = async (event) => {
    const id = event.detail;

    try {
      await del(`leads/${id}`);
      response.items = response.items.filter((item) => item.id !== id);
    } catch (e) {
      errors = errorNormalizer(e);
    }
  }
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title }]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/admin/leads/add'} value={$_('common.form.add')} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table
      on:delete={handleDelete}
      items={response.items} />
  </div>
  <Pagination
    on:change={changePage}
    currentPage={page}
    totalItems={response.totalItems}
    pageCount={response.pageCount} />
</div>
