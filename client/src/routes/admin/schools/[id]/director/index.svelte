<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Link from 'components/links/Link.svelte';
  import Notice from 'components/Notice.svelte';
  import Detail from './_Detail.svelte';

  export let id;

  let school;
  let title = $_('schools.director.title');
  let errors = [];

  onMount(async () => {
    try {
      school = (await get(`schools/${id}`)).data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<ServerErrors {errors} />
<Breadcrumb items={[
  { title: $_('schools.breadcrumb'), path: '/admin/schools' },
  { title: school?.name, path: `/admin/schools/${id}` },
  { title }
]} />
<div class="inline-flex items-center">
  <H4Title {title} />
  {#if !school || !school.director}
    <Link href={`/admin/schools/${id}/director/add`} value={$_('schools.director.add.title')} />
  {/if}
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    {#if school && school.director}
      <Detail director={school.director} />
    {:else}
      <Notice notice={$_('schools.director.empty')} />
    {/if}
  </div>
</div>
