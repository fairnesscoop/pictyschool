import { Router } from '@beyonk/sapper-rbac';

const routes = new Router()
  .unrestrict('/login.*')
  .unrestrict('/service-worker.*')
  .restrict('.*', ['photographer'])
  .build();

export default routes;
