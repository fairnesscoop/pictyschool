import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Photo } from './Photo.entity';

@Entity()
export class AccessToken {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  @Column({ type: 'varchar', nullable: false })
  private token: string;

  @Column({ type: 'timestamp', nullable: false })
  private expiredAt: Date;

  @OneToOne(() => Photo, photo => photo.accessToken, { onDelete: 'CASCADE' })
  @JoinColumn()
  photo: Photo;

  constructor(token: string, expiredAt: Date, photo: Photo) {
    this.token = token;
    this.expiredAt = expiredAt;
    this.photo = photo;
  }

  public getId(): string {
    return this.id;
  }

  public getToken(): string {
    return this.token;
  }

  public getExpiredAt(): Date {
    return this.expiredAt;
  }

  public getPhoto(): Photo {
    return this.photo;
  }
}
