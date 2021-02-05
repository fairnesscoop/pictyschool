import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PhotographerLoginQuery } from './PhotographerLoginQuery';
import { IPhotographerRepository } from 'src/Domain/User/Repository/IPhotographerRepository';
import { IPasswordEncoder } from 'src/Application/IPasswordEncoder';
import { PasswordNotMatchException } from 'src/Domain/User/Exception/PasswordNotMatchException';
import { PhotographerNotFoundException } from 'src/Domain/User/Exception/PhotographerNotFoundException';
import { PhotographerView } from '../View/PhotographerView';

@QueryHandler(PhotographerLoginQuery)
export class PhotographerLoginQueryHandler {
  constructor(
    @Inject('IPhotographerRepository')
    private readonly photographerRepository: IPhotographerRepository,
    @Inject('IPasswordEncoder')
    private readonly passwordEncoder: IPasswordEncoder
  ) {}

  public async execute(query: PhotographerLoginQuery): Promise<PhotographerView> {
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

    return new PhotographerView(
      user.getId(),
      user.getFirstName(),
      user.getLastName(),
      user.getEmail(),
      user.getApiToken()
    );
  }
}
