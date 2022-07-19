import Course from "./Course";
import { Course as CourseType } from "../types";

interface Props {
  courseParts: CourseType[];
}

const Content = (props: Props) => {
  return (
    <>
      {props.courseParts.map((course) => (
        <Course
          name={course.name}
          exerciseCount={course.exerciseCount}
          key={course.name}
        />
      ))}
    </>
  );
};

export default Content;
