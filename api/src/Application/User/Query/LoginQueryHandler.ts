import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { LoginQuery } from './LoginQuery';
import { AuthenticatedView } from '../View/AuthenticatedView';
import { IPhotographerRepository } from 'src/Domain/User/Repository/IPhotographerRepository';
import { IPasswordEncoder } from 'src/Application/IPasswordEncoder';
import { PasswordNotMatchException } from 'src/Domain/User/Exception/PasswordNotMatchException';
import { PhotographerNotFoundException } from 'src/Domain/User/Exception/PhotographerNotFoundException';

@QueryHandler(LoginQuery)
export class LoginQueryHandler {
  constructor(
    @Inject('IPhotographerRepository')
    private readonly photographerRepository: IPhotographerRepository,
    @Inject('IPasswordEncoder')
    private readonly passwordEncoder: IPasswordEncoder
  ) {}

  public async execute(query: LoginQuery): Promise<AuthenticatedView> {
    const email = query.email.toLowerCase();
    const user = await this.photographerRepository.findOneByEmail(email);

    if (!user) {
      throw new PhotographerNotFoundException();
    }

    if (
      false ===
      (await this.passwordEncoder.compare(user.getPassword(), query.password))
    ) {
      throw new PasswordNotMatchException();
    }

    return new AuthenticatedView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail(),
      user.getApiToken()
    );
  }
}
