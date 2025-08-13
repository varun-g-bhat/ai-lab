import mongoose from "mongoose";

interface Submission {
  code: string;
  language: string;
  output: string;
  expectedOutput: string;
  isCorrect: boolean;
  submittedAt: Date;
}

interface SolvedQuestion {
  questionId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  labId: mongoose.Schema.Types.ObjectId;
  submissions: Submission[];
  firstSolvedAt?: Date;
  lastSubmittedAt: Date;
  totalSubmissions: number;
  isSolved: boolean;
}

const submissionSchema = new mongoose.Schema<Submission>({
  code: { type: String, required: true },
  language: { type: String, required: true },
  output: { type: String, required: true },
  expectedOutput: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  submittedAt: { type: Date, default: Date.now },
});

const solvedQuestionSchema = new mongoose.Schema<SolvedQuestion>(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    labId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lab",
      required: true,
    },
    submissions: [submissionSchema],
    firstSolvedAt: { type: Date },
    lastSubmittedAt: { type: Date, default: Date.now },
    totalSubmissions: { type: Number, default: 0 },
    isSolved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<SolvedQuestion>(
  "SolvedQuestion",
  solvedQuestionSchema
);
