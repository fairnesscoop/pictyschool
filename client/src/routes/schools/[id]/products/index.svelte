<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get } from '../../../../utils/axios';
  import Breadcrumb from '../../../../components/Breadcrumb.svelte';
  import { errorNormalizer } from '../../../../normalizer/errors';
  import ServerErrors from '../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../components/H4Title.svelte';
  import Link from '../../../../components/links/Link.svelte';

  export let id;

  let school;
  let title = $_('schools.products.title');
  let errors = [];

  onMount(async () => {
    try {
      ({ data: school } = await get(`schools/${id}`));
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb items={[
  { title: $_('schools.breadcrumb'), path: '/schools' },
  { title: school && `${school.reference} - ${school.name}`, path: `/schools/${id}` },
  { title }
]} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <Link href={`/schools/${id}/products/add`} value={$_('schools.products.add.title')} />
</div>
<ServerErrors {errors} />
