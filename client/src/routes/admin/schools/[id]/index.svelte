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
  import CardShooting from './_CardShooting.svelte';
  import CardOffer from './_CardOffer.svelte';
  import CardProduct from './_CardProduct.svelte';
  import CardStats from './_CardStats.svelte';
  import InformationSheet from './_InformationSheet.svelte';
  import Link from 'components/links/Link.svelte';
  import AddLink from 'components/links/AddLink.svelte';
  import SchoolUsers from './_SchoolUsers.svelte';
  import { ROLE_PHOTOGRAPHER } from 'constants/roles';

  export let id;

  const { session } = stores();

  let school;
  let title = '';
  let errors = [];

  onMount(async () => {
    try {
      ({ data: school } = await get(`schools/${id}`));
      title = school.name;
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
</div>
<ServerErrors {errors} />

{#if school}
  <div class="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-4">
    <CardShooting {id} />
    <CardStats {id} />
    <CardOffer {id} />
    <CardProduct {id} />
  </div>
  <div class="grid gap-6 mb-4 md:grid-cols-2 xl:grid-cols-2">
    <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {$_('schools.dashboard.informations')}
        {#if $session.user?.scope === ROLE_PHOTOGRAPHER}
          <Link href={`/admin/schools/${id}/edit`} value={$_('common.form.edit')} />
        {/if}
      </h4>
      <InformationSheet {school} />
    </div>
    <div class="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        {$_('schools.dashboard.users')}
        {#if $session.user?.scope === ROLE_PHOTOGRAPHER}
          <AddLink href={`/admin/schools/${id}/users`} value={$_('common.form.add')} />
        {/if}
      </h4>
      <SchoolUsers id={school.id} />
    </div>
  </div>
  <div class="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
    <h4 class="mb-4 font-semibold text-gray-800 dark:text-gray-300">
      {$_('schools.dashboard.last_orders')}
    </h4>
  </div>
{/if}
