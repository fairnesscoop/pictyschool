<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';
  import Form from './_Form.svelte';

  let loading = false;
  const title = $_('shipping_costs.add.title');
  let errors = [];

  const onSave = async (e) => {
    try {
      loading = true;
      await post('shipping-costs', e.detail);
      goto('/admin/shipping-costs');
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

<Breadcrumb items={[{ title: $_('shipping_costs.breadcrumb'), path: '/admin/shipping-costs' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form on:save={onSave} {loading} />
