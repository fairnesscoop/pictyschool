import { Router } from '@beyonk/sapper-rbac';
import { ROLE_DIRECTOR, ROLE_PHOTOGRAPHER } from 'constants/roles';

const routes = new Router()
  .unrestrict('/admin/login')
  .restrict('/admin/users.*', [ROLE_PHOTOGRAPHER])
  .restrict('/admin/leads.*', [ROLE_PHOTOGRAPHER])
  .restrict('/admin/products.*', [ROLE_PHOTOGRAPHER])

  // School
  .restrict('/admin/schools/add.*', [ROLE_PHOTOGRAPHER])
  .restrict('/admin/schools/.*/edit.*', [ROLE_PHOTOGRAPHER])
  .restrict('/admin/schools/.*/users.*', [ROLE_PHOTOGRAPHER])

  .restrict('/admin.*', [ROLE_PHOTOGRAPHER, ROLE_DIRECTOR])
  .unrestrict('.*')
  .build();

export default routes;
