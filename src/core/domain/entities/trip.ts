interface Trip {
  title: string;
  destination: string;
  start_date?: Date;
  end_date?: Date;
  members: string[];
  created_by: string;
}

export default Trip;
