export const Names = ({ person, deleteName }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => deleteName(person.id, person.name)}>
        {" "}
        Delete
      </button>
    </p>
  );
};
