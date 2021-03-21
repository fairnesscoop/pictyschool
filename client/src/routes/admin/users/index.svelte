<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import H4Title from '../../../components/H4Title.svelte';
  import AddLink from '../../../components/links/AddLink.svelte';
  
  const title = $_('users.breadcrumb');
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title }]} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <AddLink href={'/admin/users/add'} value={$_('common.form.add')} />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
</div>
