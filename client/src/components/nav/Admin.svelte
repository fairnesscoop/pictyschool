<script>
  import { _ } from 'svelte-i18n';
  import DashboardIcon from 'components/icons/DashboardIcon.svelte';
  import FolderIcon from 'components/icons/FolderIcon.svelte';
  import SchoolIcon from 'components/icons/SchoolIcon.svelte';
  import UsersIcon from 'components/icons/UsersIcon.svelte';
  import CalendarIcon from 'components/icons/CalendarIcon.svelte';
  import OrderIcon from 'components/icons/OrderIcon.svelte';
  import ShippingCostIcon from 'components/icons/ShippingCostIcon.svelte';
  import { settings, currentPath } from 'store';

  const schoolsPath = '/admin/schools';
  const productsPath = '/admin/products';
  const calendarPath = '/admin/calendar';
  const usersPath = '/admin/users';
  const ordersPath = '/admin/orders';
  const shippingCostsPath = '/admin/shipping-costs';
  const activeClass =
    'absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg';
  const linkClass =
    'inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-100';
  const activeLinkClass =
    'inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-200';
</script>

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
        {#if $currentPath.includes(calendarPath)}
          <span class="{activeClass}" aria-hidden="true"></span>
        {/if}
        <a class={$currentPath.includes(calendarPath) ? activeLinkClass : linkClass} href={calendarPath}>
          <CalendarIcon className={'w-5 h-5'} />
          <span class="ml-4">{$_('calendar.breadcrumb')}</span>
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
      <li class="relative px-6 py-3">
        {#if $currentPath.includes(ordersPath)}
          <span class={activeClass} aria-hidden="true"></span>
        {/if}
        <a class={$currentPath.includes(ordersPath) ? activeLinkClass : linkClass} href={ordersPath}>
          <OrderIcon className={'w-5 h-5'} />
          <span class="ml-4">{$_('orders.breadcrumb')}</span>
        </a>
      </li>
      <li class="relative px-6 py-3">
        {#if $currentPath.includes(shippingCostsPath)}
          <span class={activeClass} aria-hidden="true"></span>
        {/if}
        <a class={$currentPath.includes(shippingCostsPath) ? activeLinkClass : linkClass} href={shippingCostsPath}>
          <ShippingCostIcon className={'w-5 h-5'} />
          <span class="ml-4">{$_('shipping_costs.breadcrumb')}</span>
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
        {#if $currentPath.includes(usersPath)}
          <span class={activeClass} aria-hidden="true"></span>
        {/if}
        <a class={$currentPath.includes(usersPath) ? activeLinkClass : linkClass} href={usersPath}>
          <UsersIcon className={'w-5 h-5'} />
          <span class="ml-4">{$_('users.breadcrumb')}</span>
        </a>
      </li>
    </ul>
  </div>
</aside>
