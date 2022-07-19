import { Course as CourseType } from "../types";

interface Props {
  courseParts: CourseType[];
}

const Total = ({ courseParts }: Props) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

export default Total;
