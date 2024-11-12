export interface Trip {
  id: number;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  members: string[];
  created_by: string;
}

export interface CreatedTrip {
  title: string;
  destination: string;
  start_date?: Date;
  end_date?: Date;
  members: string[];
  created_by: string;
}
