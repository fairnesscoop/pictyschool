<script context="module" lang="ts">
  export async function preload({ params: { voucher } }) {
    return { voucher }
  }
</script>

<script>
  import { goto, stores } from '@sapper/app';
  import { post } from 'utils/axios';
  import { _ } from 'svelte-i18n';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import Input from 'components/inputs/Input.svelte';
  import Button from 'components/inputs/Button.svelte';

  export let voucher;

  let errors = [];
  let firstName = '';
  let lastName = '';
  let password = '';
  let loading = false;
  let title = $_('school.activate.title');

  const { session } = stores();

  const handleSubmit = async () => {
    try {
      loading = true;
      await post(`vouchers/${voucher}/consume`, { firstName, lastName, password });
      goto('/login');
    } catch (e) {
      errors = errorNormalizer(e);
    } finally {
      loading = false;
    }
  };
</script>

<svelte:head>
  <title>{title} - {$_('app')}</title>
</svelte:head>

<div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
  <div
    class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
    <div class="flex flex-col overflow-y-auto md:flex-row">
      <div class="h-32 md:h-auto md:w-1/2">
        <img
          aria-hidden="true"
          class="object-cover w-full h-full"
          src="images/login-office.jpeg"
          alt="Office" />
      </div>
      <form
        on:submit|preventDefault={handleSubmit}
        class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
        <div class="w-full">
          <h1
            class="mb-5 text-xl font-semibold text-center text-gray-700 dark:text-gray-200">
            {title}
          </h1>
          <ServerErrors errors={errors} />
          <p class="text-sm mt-3 mb-3">{$_('school.activate.notice')}</p>
          <Input
            label={$_('school.activate.form.first_name')}
            bind:value={firstName} />
          <Input
            label={$_('school.activate.form.last_name')}
            bind:value={lastName} />
          <Input
            type={'password'}
            label={$_('school.activate.form.password')}
            bind:value={password} />
          <Button
            value={$_('school.activate.form.submit')}
            loading={loading}
            disabled={!lastName ||!firstName || !password || loading} />
        </div>
      </form>
    </div>
  </div>
</div>
