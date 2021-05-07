<script context="module">
  export const preload = ({ params: { id } }) => {
    return { id };
  };
</script>

<script>
  import { _ } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import axios from 'axios';
  import { get, post } from '../../../../../utils/axios';
  import Breadcrumb from '../../../../../components/Breadcrumb.svelte';
  import { errorNormalizer } from '../../../../../normalizer/errors';
  import ServerErrors from '../../../../../components/ServerErrors.svelte';
  import H4Title from '../../../../../components/H4Title.svelte';
  import Link from '../../../../../components/links/Link.svelte';

  export let id;

  let school;
  let title = $_('schools.photos.title');
  let errors = [];
  let loading = false;
  let progressPercent = 0;

  onMount(async () => {
    try {
      const schoolResponse = await get(`schools/${id}`);
      school = schoolResponse.data;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  });

  const handleFileSelect = async (event) => {
    if (event.target.files.length !== 1) {
      return;
    }

    try {
      const uploadEndpointResponse = await post(
        `ingestions/${school.id}/photos`,
        { params: { originalName: event.target.files[0].name }}
      );
      loading = true;
      const uploadResponse = await axios.put(
        uploadEndpointResponse.data.link, event.target.files[0],
        { onUploadProgress }
      );
      loading = false;
    } catch (e) {
      errors = errorNormalizer(e);
    }
  };

  const onUploadProgress = (progressEvent) => {
    progressPercent = Math.ceil(progressEvent.loaded / progressEvent.total * 100);
  }
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
    {#if loading}
    <div class="relative p-2">
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
        <div style="width:{progressPercent}%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
      </div>
      <div class="text-blue-700 text-sm font-medium text-center">Loading {progressPercent}%</div>
    </div>
    {:else}
    <div
      class="relative border-dotted h-24 rounded-lg border-dashed border-2 border-blue-700 bg-gray-100 flex justify-center items-center">
      <div class="absolute">
        <div class="flex flex-col items-center ml-2 px-2 py-1 text-sm font-medium leading-5 text-white bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:shadow-outline-purple">
          <i class="fa fa-folder-open fa-4x text-blue-700"></i>
          <span class="block font-normal">Attach your files here</span>
        </div>
      </div>
      <input
        type="file"
        accept=".zip"
        class="h-full w-full opacity-0"
        name="file"
        on:change="{(event) => handleFileSelect(event)}" />
    </div>
    {/if}
  </div>
</div>
<ServerErrors errors="{errors}" />
