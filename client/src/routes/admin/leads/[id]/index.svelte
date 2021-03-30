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
  import Detail from './_Detail.svelte';

  export let id;

  let lead;
  let title = '';
  let errors = [];

  onMount(async () => {
    try {
      ({ data: lead } = await get(`leads/${id}`));
      title = lead.name;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title: $_('leads.breadcrumb'), path: '/admin/leads' }, { title }]} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <Link href={`/admin/leads/${id}/edit`} value={$_('common.form.edit')} />
</div>
<ServerErrors {errors} />

{#if lead}
  <Detail {lead} />
{/if}
