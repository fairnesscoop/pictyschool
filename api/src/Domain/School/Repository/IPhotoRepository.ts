import { Photo } from '../Photo.entity';

export interface IPhotoRepository {
  save(photo: Photo): Promise<Photo>;
}
