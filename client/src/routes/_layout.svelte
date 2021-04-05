<script>
  import { tick } from 'svelte';
  import { stores, goto } from '@sapper/app';
  import { guard } from '@beyonk/sapper-rbac';
  import routes from '../routes';
  import SchoolNav from 'components/nav/School.svelte';
  import AdminNav from 'components/nav/Admin.svelte';
  import Header from 'components/header/Header.svelte';
  import { currentPath, settings } from 'store';
  import { ROLE_PHOTOGRAPHER, ROLE_DIRECTOR } from 'constants/roles';

  const { page, session } = stores();
  const options = { routes, deny: () => goto('/login') };

  page.subscribe(async (v) => {
    $currentPath = v.path;
    await tick();
    guard($currentPath, $session.user, options);
  });
</script>


<div class={$settings.theme}>
  {#if $session.user}
    <div class="flex h-screen bg-gray-50 dark:bg-gray-900 dark-theme">
      {#if $session.user.scope === ROLE_PHOTOGRAPHER}
        <AdminNav />
      {:else if $session.user.scope === ROLE_DIRECTOR}
        <SchoolNav />
      {/if}
      <div class="flex flex-col flex-1 w-full">
        <Header />
        <main class="h-full overflow-y-auto">
          <div class="container px-6 mx-auto grid">
            <slot />
          </div>
        </main>
      </div>
    </div>
  {:else}
    <slot />
  {/if}
</div>
