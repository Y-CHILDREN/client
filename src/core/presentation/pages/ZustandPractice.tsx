import useStore from '../hooks/stores/store.ts';

const ZustandPractice = () => {
  const { user, updateUser } = useStore();

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
      <button onClick={() => updateUser(user.name, user.age + 1)}>
        Increase Age
      </button>
    </div>
  );
};

export default ZustandPractice;
