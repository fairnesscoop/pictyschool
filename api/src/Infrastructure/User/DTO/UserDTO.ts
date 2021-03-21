import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/Domain/User/User.entity';

export class UserDTO {
  @IsNotEmpty()
  @ApiProperty()
  public firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  public lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;

  @ApiProperty({ enum: UserRole })
  @IsNotEmpty()
  @IsEnum(UserRole)
  public role: UserRole;
}
