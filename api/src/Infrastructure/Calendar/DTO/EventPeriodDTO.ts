import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { DateGreaterOrEqualThan } from 'src/Infrastructure/Common/Validator/DateGreaterOrEqualThan';

export class EventPeriodDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public fromDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  @DateGreaterOrEqualThan('fromDate')
  public toDate: string;
}
