import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ShootingNotFoundException } from 'src/Domain/School/Exception/ShootingNotFoundException';
import { IShootingRepository } from 'src/Domain/School/Repository/IShootingRepository';
import { UpdateShootingCommand } from './UpdateShootingCommand';

@CommandHandler(UpdateShootingCommand)
export class UpdateShootingCommandHandler {
  constructor(
    @Inject('IShootingRepository')
    private readonly shootingRepository: IShootingRepository,
  ) { }

  public async execute(command: UpdateShootingCommand): Promise<string> {
    const { name, groupClosingDate, individualClosingDate, shootingDate, notice, id } = command;

    const shooting = await this.shootingRepository.findOneById(id);
    if (!shooting) {
      throw new ShootingNotFoundException();
    }

    shooting.update(name, shootingDate, groupClosingDate, individualClosingDate, notice);
    await this.shootingRepository.save(shooting);

    return shooting.getId();
  }
}
