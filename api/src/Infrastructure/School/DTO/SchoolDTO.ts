import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { AbstractSchoolDTO } from './AbstractSchoolDTO';

export class SchoolDTO extends AbstractSchoolDTO {
  @ApiPropertyOptional()
  @IsOptional()
  public observation: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  public pdv: string;
}
