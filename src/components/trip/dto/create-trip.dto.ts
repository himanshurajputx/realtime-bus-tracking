import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
  @IsNotEmpty()
  @IsString()
  busId: string;

  @IsNotEmpty()
  @IsString()
  route: string;

  @IsNotEmpty()
  startTime: Date;
}
