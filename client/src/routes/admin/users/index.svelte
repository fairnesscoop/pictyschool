<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import H4Title from 'components/H4Title.svelte';
  import AddLink from 'components/links/AddLink.svelte';
  import ServerErrors from 'components/ServerErrors.svelte';
  import Table from './_Table.svelte';

  let title = $_('users.breadcrumb');
  let errors = [];
  let users = [];

  onMount(async () => {
    try {
      users = (await get(`users/photographers`)).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title }]} />
<ServerErrors {errors} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/admin/users/add'} value={$_('common.form.add')} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table {users} />
  </div>
</div>
