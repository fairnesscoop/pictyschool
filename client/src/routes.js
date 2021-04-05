import { Router } from '@beyonk/sapper-rbac';
import { ROLE_DIRECTOR, ROLE_PHOTOGRAPHER } from 'constants/roles';

const routes = new Router()
  .unrestrict('/login')
  .unrestrict('/school/activate-account/.*')
  .restrict('/admin.*', [ROLE_PHOTOGRAPHER])
  .restrict('/school.*', [ROLE_DIRECTOR])
  .unrestrict('.*')
  .build();

export default routes;
