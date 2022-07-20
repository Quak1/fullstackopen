import Part from "./Part";
import { CoursePart } from "../types";

interface Props {
  courseParts: CoursePart[];
}

const Content = (props: Props) => {
  return (
    <>
      {props.courseParts.map((part) => (
        <Part part={part} key={part.name} />
      ))}
    </>
  );
};

export default Content;
