export class UpdateEntryExitDto {
  vehicle_id?: string;
  entry_time?: Date;
  exit_time?: Date;
  duration_minutes?: number;
  charged_amount?: number;
}
