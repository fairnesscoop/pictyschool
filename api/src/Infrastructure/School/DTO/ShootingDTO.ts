import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { DateGreaterOrEqualThan } from 'src/Infrastructure/Common/Validator/DateGreaterOrEqualThan';

export class ShootingDTO {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public shootingDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @DateGreaterOrEqualThan('shootingDate')
  public closingDate: string;
}
