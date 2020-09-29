import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPhotoRepository } from 'src/Domain/School/Repository/IPhotoRepository';
import { Photo } from 'src/Domain/School/Photo.entity';

@Injectable()
export class PhotoRepository implements IPhotoRepository {
  constructor(
    @InjectRepository(Photo)
    private readonly repository: Repository<Photo>
  ) {}

  public save(photo: Photo): Promise<Photo> {
    return this.repository.save(photo);
  }
}
