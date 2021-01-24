<script>
  import { stores } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import DashboardIcon from './icons/DashboardIcon.svelte';
  import FolderIcon from './icons/FolderIcon.svelte';
  import SchoolIcon from './icons/SchoolIcon.svelte';
  import ChevronDownIcon from './icons/ChevronDownIcon.svelte';
  import { settings } from '../store';

  const { session } = stores();

  export let segment;

  const activeClass =
    'absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg';
  const linkClass =
    'inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-100';
  const activeLinkClass =
    'inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-200';
  const subLinkClass =
    'px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200';
</script>

{#if $session.user}
  <aside
    class="z-20 hidden overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
    class:open={$settings.openMobileMenu}>
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <a
        class="inline-flex ml-4 text-lg font-bold text-gray-800 dark:text-gray-200"
        href="/">
        <img src="images/logo.png" class="h-6" alt="{$_('app')}" />
        <span class="ml-2">{$_('app')}</span>
      </a>
      <ul class="mt-6">
        <li class="relative px-6 py-3">
          {#if !segment}
            <span class={activeClass} aria-hidden="true"></span>
          {/if}
          <a class={!segment ? activeLinkClass : linkClass} href="/">
            <DashboardIcon className={'w-5 h-5'} />
            <span class="ml-4">{$_('dashboard.title')}</span>
          </a>
        </li>
        <li class="relative px-6 py-3">
          <button
            class="{'crm' === segment ? activeLinkClass : linkClass}"
            aria-haspopup="true">
            {#if 'schools' === segment}
              <span class="{activeClass}" aria-hidden="true"></span>
            {/if}
            <span class="inline-flex items-center">
              <SchoolIcon className="{'w-5 h-5'}" />
              <span class="ml-4">{$_('schools.breadcrumb')}</span>
            </span>
            <ChevronDownIcon className="{'w-4 h-4'}" />
          </button>
          <ul
            class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
            aria-label="submenu">
            <li class="{subLinkClass}">
              <a
                class="w-full"
                href="/schools">{$_('schools.breadcrumb')}</a>
            </li>
            <li class="{subLinkClass}">
              <a
                class="w-full"
                href="/schools/types">{$_('schools.types.breadcrumb')}</a>
            </li>
          </ul>
        </li>
        <li class="relative px-6 py-3">
          {#if segment === "products"}
            <span class={activeClass} aria-hidden="true"></span>
          {/if}
          <a class={segment === "products" ? activeLinkClass : linkClass} href="/products">
            <FolderIcon className={'w-5 h-5'} />
            <span class="ml-4">{$_('products.breadcrumb')}</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
{/if}
