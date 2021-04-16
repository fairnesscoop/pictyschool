<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { get } from '../../../../../utils/axios';
  import Breadcrumb from '../../../../../components/Breadcrumb.svelte';
  import { errorNormalizer } from '../../../../../normalizer/errors';
  import ServerErrors from '../../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../../components/H4Title.svelte';
  import Link from '../../../../../components/links/Link.svelte';

  export let id;

  let school;
  let title = $_('schools.photos.title');
  let errors = [];

  onMount(async () => {
    try {
      const schoolResponse = await get(`schools/${id}`);
      school = schoolResponse.data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const handleFileSelect = async (event) => {
    console.log(event.target.files);
    try {
      const uploadResponse = await get(`schools/${id}/photos/upload`);
      axios.put(uploadResponse.link);
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<Breadcrumb
  items="{[{ title: $_('schools.breadcrumb'), path: '/admin/schools' }, { title: school && `${school.reference} - ${school.name}`, path: `/admin/schools/${id}` }, { title }]}" />
<div class="inline-flex items-center">
  <H4Title title="{title}" />
  <Link
    href="{`/admin/schools/${id}/photos/add`}"
    value="{$_('schools.photos.add.title')}" />
</div>
<div class="w-full overflow-hidden rounded-lg shadow-xs">
  <div class="w-full overflow-x-auto">
    <div
      class="relative border-dotted h-48 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
      <div class="absolute">
        <div class="flex flex-col items-center ml-2 mb-6 px-2 py-1 text-sm font-medium leading-5 text-white bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple">
          <i class="fa fa-folder-open fa-4x text-blue-700"></i>
          <span class="block font-normal">Attach your files here</span>
        </div>
      </div>
      <input
        type="file"
        class="h-full w-full opacity-0"
        name="file"
        on:change="{(event) => handleFileSelect(event)}" />
    </div>

    <!-- <input class="ml-2 mb-6 px-2 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" type="file" > -->
  </div>
</div>
<ServerErrors errors="{errors}" />
