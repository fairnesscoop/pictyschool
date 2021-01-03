import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Photographer } from 'src/Domain/User/Photographer.entity';

export const LoggedPhotographer = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Photographer => {
    const request = ctx.switchToHttp().getRequest();

    return request.user;
  }
);
