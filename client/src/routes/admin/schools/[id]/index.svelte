<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get } from '../../../../utils/axios';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../components/H4Title.svelte';
  import CardPhoto from './_CardPhoto.svelte';
  import CardProduct from './_CardProduct.svelte';
  import CardOrder from './_CardOrder.svelte';
  import Detail from './_Detail.svelte';
  import Link from '../../../../components/links/Link.svelte';

  export let id;

  let school;
  let title = '';
  let errors = [];

  onMount(async () => {
    try {
      ({ data: school } = await get(`schools/${id}`));
      title = `${school.reference} - ${school.name}`;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[{ title: $_('schools.breadcrumb'), path: '/admin/schools' }, { title }]} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <Link href={`/admin/schools/${id}/edit`} value={$_('common.form.edit')} />
</div>
<ServerErrors {errors} />

<div class="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-3">
  <CardPhoto />
  <CardOrder />
  <CardProduct {id} />
</div>
{#if school}
  <Detail {school} />
{/if}
