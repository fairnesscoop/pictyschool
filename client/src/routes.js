import { Router } from '@beyonk/sapper-rbac';

const routes = new Router()
  .unrestrict('.*')  
  .restrict('/admin.*', ['photographer'])
  .build();

export default routes;
