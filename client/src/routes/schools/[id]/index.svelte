<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { get } from '../../../utils/axios';
  import Breadcrumb from '../../../components/Breadcrumb.svelte';
  import { errorNormalizer } from '../../../normalizer/errors';
  import ServerErrors from '../../../components/ServerErrors.svelte';
  import H4Title from '../../../components/H4Title.svelte';
  import PhotoIcon from '../../../components/icons/PhotoIcon.svelte';
  import FolderIcon from '../../../components/icons/FolderIcon.svelte';
  import OrderIcon from '../../../components/icons/OrderIcon.svelte';
  import Link from '../../../components/links/Link.svelte';

  export let id;

  let loading = false;
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

<Breadcrumb items={[{ title: $_('schools.breadcrumb'), path: '/schools' }, { title }]} />
<div class="inline-flex items-center">
  <H4Title {title} />
  <Link href={`/schools/${id}/edit`} value={$_('common.form.edit')} />
</div>
<ServerErrors {errors} />

<div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
  <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
      <PhotoIcon className={'w-5 h-5'}/>
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{$_('schools.dashboard.photos')}</p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">N/A</p>
    </div>
  </div>
  <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
      <OrderIcon className={'w-5 h-5'}/>
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{$_('schools.dashboard.orders')}</p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">N/A</p>
    </div>
  </div>
  <div class="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
    <div class="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
      <FolderIcon className={'w-5 h-5'}/>
    </div>
    <div>
      <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{$_('schools.dashboard.products')}</p>
      <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">N/A</p>
    </div>
  </div>
</div>
