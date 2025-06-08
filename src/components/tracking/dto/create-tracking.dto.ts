import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTrackingDto {
  @IsNumber()
  @IsNotEmpty()
  tripId: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
  @IsNotEmpty()
  timestamp: Date;
  @IsNumber()
  handicapSeatsAvailable: number;
}
