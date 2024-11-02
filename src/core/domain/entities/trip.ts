import User from './user.ts';

interface Trip {
  title: string;
  destination: string;
  start_date?: Date;
  end_date?: Date;
  members: User[];
}

export default Trip;
