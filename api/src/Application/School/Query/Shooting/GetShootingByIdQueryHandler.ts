import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetShootingByIdQuery } from './GetSchootingByIdQuery';
import { IShootingRepository } from 'src/Domain/School/Repository/IShootingRepository';
import { ShootingView } from '../../View/ShootingView';
import { ShootingNotFoundException } from 'src/Domain/School/Exception/ShootingNotFoundException';

@QueryHandler(GetShootingByIdQuery)
export class GetShootingByIdQueryHandler {
  constructor(
    @Inject('IShootingRepository')
    private readonly shootingRepository: IShootingRepository
  ) {}

  public async execute(query: GetShootingByIdQuery): Promise<ShootingView> {
    const shooting = await this.shootingRepository.findOneById(query.id);

    if (!shooting) {
      throw new ShootingNotFoundException();
    }

    return new ShootingView(
      shooting.getId(),
      shooting.getName(),
      shooting.getStatus(),
      shooting.getShootingDate(),
      shooting.getGroupClosingDate(),
      shooting.getIndividualClosingDate(),
      shooting.getNotice()
    );
  }
}
