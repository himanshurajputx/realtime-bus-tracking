import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusDto {
  @IsString()
  @IsNotEmpty()
  numberPlate: string;

  @IsString()
  @IsNotEmpty()
  operatorName: string;

  @IsNumber()
  @IsNotEmpty()
  handicapSeatsTotal?: number;


}
