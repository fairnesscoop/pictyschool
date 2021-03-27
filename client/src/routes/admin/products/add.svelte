<script>
  import { goto } from '@sapper/app';
  import { _ } from 'svelte-i18n';
  import Breadcrumb from 'components/Breadcrumb.svelte';
  import { post } from 'utils/axios';
  import Form from './_Form.svelte';
  import { errorNormalizer } from 'normalizer/errors';
  import ServerErrors from 'components/ServerErrors.svelte';
  import H4Title from 'components/H4Title.svelte';

  let loading = false;
  let title = $_('products.add.title');
  let errors = [];

  const onSave = async (e) => {
    try {
      loading = true;
      await post('products', e.detail);
      goto('/admin/products');
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

<Breadcrumb items={[{ title: $_('products.breadcrumb'), path: '/admin/products' }, { title }]} />
<H4Title {title} />
<ServerErrors {errors} />
<Form on:save={onSave} {loading} />
