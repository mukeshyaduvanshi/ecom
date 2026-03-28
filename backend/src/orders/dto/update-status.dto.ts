import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
  status!: string;
}
