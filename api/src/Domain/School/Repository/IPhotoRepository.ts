import { Photo } from '../Photo.entity';

export interface IPhotoRepository {
  save(task: Photo): Promise<Photo>;
}
