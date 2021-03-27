<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';
  import { get } from 'utils/axios';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import CardPhoto from './_CardPhoto.svelte';
  import CardProduct from './_CardProduct.svelte';
  import CardOrder from './_CardOrder.svelte';
  import CardDirector from './_CardDirector.svelte';
  import Detail from './_Detail.svelte';
  import Link from 'components/links/Link.svelte';
  import { ROLE_PHOTOGRAPHER } from 'constants/roles';

  export let id;

  const { session } = stores();

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
  {#if $session.user.role === ROLE_PHOTOGRAPHER}
    <Link href={`/admin/schools/${id}/edit`} value={$_('common.form.edit')} />
  {/if}
</div>
<ServerErrors {errors} />

{#if school}
  <div class="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-4">
    <CardPhoto />
    <CardOrder />
    <CardProduct {id} />
    <CardDirector {id} director={school.director} />
  </div>
  <Detail {school} />
{/if}
