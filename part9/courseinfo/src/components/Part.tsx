import { CoursePart } from "../types";
import { assertNever } from "../utils";

interface Props {
  part: CoursePart;
}

const Part = ({ part }: Props) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>
            <em>{part.description}</em>
          </p>
        </div>
      );
    case "submission":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>
            <em>{part.description}</em>
          </p>
          <em>{part.exerciseSubmissionLink}</em>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>project exercises {part.exerciseCount}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
