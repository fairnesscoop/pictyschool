<script>
  import { stores } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import DashboardIcon from './icons/DashboardIcon.svelte';
  import FolderIcon from './icons/FolderIcon.svelte';
  import SchoolIcon from './icons/SchoolIcon.svelte';
  import LeadIcon from './icons/LeadIcon.svelte';
  import SchoolTypeIcon from './icons/SchoolTypeIcon.svelte';
  import UsersIcon from './icons/UsersIcon.svelte';
  import ChevronDownIcon from './icons/ChevronDownIcon.svelte';
  import { settings, currentPath } from 'store';
  import { ROLE_PHOTOGRAPHER } from 'constants/roles';

  const { session } = stores();

  const schoolsPath = '/admin/schools';
  const productsPath = '/admin/products';
  const schoolTypesPath = '/admin/school-types';
  const usersPath = '/admin/users';
  const leadsPath = '/admin/leads';
  const activeClass =
    'absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg';
  const linkClass =
    'inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-100';
  const activeLinkClass =
    'inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-200';
</script>

{#if $session.user}
  <aside
    class="z-20 hidden overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
    class:open={$settings.openMobileMenu}>
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <a
        class="inline-flex ml-4 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="/admin">
        <img src="images/logo.png" class="h-6" alt="{$_('app')}" />
        <span class="ml-2">{$_('app')}</span>
      </a>
      <ul class="mt-6">
        <li class="relative px-6 py-3">
          {#if $currentPath === '/admin'}
            <span class={activeClass} aria-hidden="true"></span>
          {/if}
          <a class={$currentPath === '/admin' ? activeLinkClass : linkClass} href="/admin">
            <DashboardIcon className={'w-5 h-5'} />
            <span class="ml-4">{$_('dashboard.title')}</span>
          </a>
        </li>
        <li class="relative px-6 py-3">
          {#if $currentPath.includes(schoolsPath)}
            <span class={activeClass} aria-hidden="true"></span>
          {/if}
          <a class={$currentPath.includes(schoolsPath) ? activeLinkClass : linkClass} href={schoolsPath}>
            <SchoolIcon className={'w-5 h-5'} />
            <span class="ml-4">{$_('schools.breadcrumb')}</span>
          </a>
        </li>
        {#if $session.user.scope === ROLE_PHOTOGRAPHER}
          <li class="relative px-6 py-3">
            {#if $currentPath.includes(schoolTypesPath)}
              <span class={activeClass} aria-hidden="true"></span>
            {/if}
            <a class={$currentPath.includes(schoolTypesPath) ? activeLinkClass : linkClass} href={schoolTypesPath}>
              <SchoolTypeIcon className={'w-5 h-5'} />
              <span class="ml-4">{$_('schools.types.breadcrumb')}</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            {#if $currentPath.includes(productsPath)}
              <span class={activeClass} aria-hidden="true"></span>
            {/if}
            <a class={$currentPath.includes(productsPath) ? activeLinkClass : linkClass} href={productsPath}>
              <FolderIcon className={'w-5 h-5'} />
              <span class="ml-4">{$_('products.breadcrumb')}</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            {#if $currentPath.includes(leadsPath)}
              <span class={activeClass} aria-hidden="true"></span>
            {/if}
            <a class={$currentPath.includes(leadsPath) ? activeLinkClass : linkClass} href={leadsPath}>
              <LeadIcon className={'w-5 h-5'} />
              <span class="ml-4">{$_('leads.breadcrumb')}</span>
            </a>
          </li>
          <li class="relative px-6 py-3">
            {#if $currentPath.includes(usersPath)}
              <span class={activeClass} aria-hidden="true"></span>
            {/if}
            <a class={$currentPath.includes(usersPath) ? activeLinkClass : linkClass} href={usersPath}>
              <UsersIcon className={'w-5 h-5'} />
              <span class="ml-4">{$_('users.breadcrumb')}</span>
            </a>
          </li>
        {/if}
      </ul>
    </div>
  </aside>
{/if}
