import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AbstractSchoolDTO } from 'src/Infrastructure/School/DTO/AbstractSchoolDTO';

export class LeadDTO extends AbstractSchoolDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;
}
