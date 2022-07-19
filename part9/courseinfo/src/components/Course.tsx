import { Course as CourseType } from "../types";

const Course = ({ name, exerciseCount }: CourseType) => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  );
};

export default Course;
