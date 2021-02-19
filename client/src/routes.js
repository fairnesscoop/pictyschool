import { Router } from '@beyonk/sapper-rbac';

const routes = new Router()
  .unrestrict('/admin/login')
  .restrict('/admin.*', ['photographer'])
  .unrestrict('.*')
  .build();

export default routes;
