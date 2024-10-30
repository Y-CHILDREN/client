import * as zustand from 'zustand';
const create = zustand.create;

type User = {
  name: string;
  age: number;
};

type UserStore = {
  user: User;
  updateUser: (name: string, age: number) => void;
};

const useStore = create<UserStore>((set) => ({
  user: { name: 'Jae Won', age: 19 },
  updateUser: (name, age) => set(() => ({ user: { name, age } })),
}));

export default useStore;
