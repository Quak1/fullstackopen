import { Course as CourseType } from "../types";

const Part = ({ name, exerciseCount }: CourseType) => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  );
};

export default Part;
