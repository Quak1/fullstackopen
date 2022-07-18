import express from "express";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(weight) || isNaN(height)) {
    return res.json({ error: "malformatted parameters" });
  }

  return res.json({
    height,
    weight,
    bmi: calculateBmi(height, weight),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!target || !daily_exercises)
    return res.status(400).send({ error: "parameters missing" });

  const targetNum = Number(target);
  if (isNaN(targetNum))
    return res.status(400).send({ error: "malformatted parameters" });

  try {
    const dailyExercises: Array<number> = [];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    daily_exercises.forEach((n: number) => {
      const hours = Number(n);
      if (isNaN(hours)) throw new Error("malformatted parameters");
      dailyExercises.push(hours);
    });
    const exercises = calculateExercises(dailyExercises, targetNum);
    return res.json(exercises);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    }
    return res.status(400).send({ error: "unknown error" });
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
