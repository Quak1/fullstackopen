interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: Array<string>) => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error("Target must be a number");
  }

  const training = args.slice(3).map((entry) => {
    const hours = Number(entry);
    if (isNaN(hours)) throw new Error("All arguments must be numbers");
    return hours;
  });

  return { target, training };
};

const calculateExercises = (
  dailyExercise: Array<number>,
  target: number
): Result => {
  const periodLength = dailyExercise.length;
  const trainingDays = dailyExercise.filter((n) => n !== 0).length;
  const average =
    dailyExercise.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success = average > target;

  let rating: 1 | 2 | 3;
  if (average > target) {
    rating = 3;
  } else if (average > target / 2) {
    rating = 2;
  } else {
    rating = 1;
  }

  let ratingDescription;
  switch (rating) {
    case 1:
      ratingDescription = "Far from target";
      break;
    case 2:
      ratingDescription = "Could be better";
      break;
    case 3:
      ratingDescription = "Great job!";
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, training } = parseArguments(process.argv);
  console.log(calculateExercises(training, target));
} catch (error) {
  console.log("Error:", error.message);
}

export {};
