import { CoursePart } from "../types";
import { assertNever } from "../utils";
import "../styles.css";

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
          <p>
            <em>{part.exerciseSubmissionLink}</em>
          </p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>project exercises {part.groupProjectCount}</p>
        </div>
      );
    case "special":
      return (
        <div>
          <strong>
            {part.name} {part.exerciseCount}
          </strong>
          <p>
            <em>{part.description}</em>
          </p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </div>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
