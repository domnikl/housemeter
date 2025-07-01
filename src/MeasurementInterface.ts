export interface Measurement {
  date: Date;
  value: number;
  type: string;
  id: string;
  tag?: string; // Optional tag for visual differentiation
}

export type MeasurementType = 'Electricity' | 'Water' | 'Gas';

export interface MeasurementTag {
  type: MeasurementType;
  label: string;
  color: string;
  backgroundColor: string;
}
