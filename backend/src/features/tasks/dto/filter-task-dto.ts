import { Type } from "class-transformer";
import { IsInt, IsOptional } from "class-validator";

export class FilterTasksDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  categoryId?: number;
}
