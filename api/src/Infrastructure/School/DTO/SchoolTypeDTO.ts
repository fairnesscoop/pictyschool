import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SchoolTypeDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
}
