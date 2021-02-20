<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { get, del } from '../../../../utils/axios';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import H4Title from '../../../../components/H4Title.svelte';
  import AddLink from '../../../../components/links/AddLink.svelte';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import Table from './_Table.svelte';

  let title = $_('schools.types.breadcrumb');
  let errors = [];
  let items = [];

  onMount(async () => {
    try {
      items = (await get(`school-types`)).data; 
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const handleDelete = async (event) => {
    const id = event.detail;

    try {
      await del(`school-types/${id}`);
      items = items.filter((item) => item.id !== id);
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
  <AddLink href={'/admin/schools/types/add'} value={$_('common.form.add')} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <Table {items} on:delete={handleDelete} />
  </div>
</div>
