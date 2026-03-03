// Course component that displays the course name, parts, and total exercises in the App.jsx file.
// The course data is passed as a prop from the App component.

const Header = ({ course }) => <h1>{course.name}</h1>;

const Part = ({ part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
);

const Content = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <>
      <ul>
        {parts.map((part) => (
          <Part key={part.id} part={part} />
        ))}
      </ul>
      <p>
        <strong>Total of {total} exercises</strong>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
