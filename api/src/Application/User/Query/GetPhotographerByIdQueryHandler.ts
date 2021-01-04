import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { PhotographerNotFoundException } from 'src/Domain/User/Exception/PhotographerNotFoundException';
import { IPhotographerRepository } from 'src/Domain/User/Repository/IPhotographerRepository';
import { PhotographerView } from '../View/PhotographerView';
import { GetPhotographerByIdQuery } from './GetPhotographerByIdQuery';

@QueryHandler(GetPhotographerByIdQuery)
export class GetPhotographerByIdQueryHandler {
  constructor(
    @Inject('IPhotographerRepository')
    private readonly photographerRepository: IPhotographerRepository
  ) {}

  public async execute(query: GetPhotographerByIdQuery): Promise<PhotographerView> {
    const photographer = await this.photographerRepository.findOneById(query.id);
    if (!photographer) {
      throw new PhotographerNotFoundException();
    }

    return new PhotographerView(
      photographer.getId(),
      photographer.getFirstName(),
      photographer.getLastName(),
      photographer.getEmail()
    );
  }
}
