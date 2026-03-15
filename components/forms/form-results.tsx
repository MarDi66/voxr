"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Question = {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  position: number;
};

export function FormResults({
  title,
  description,
  visibility,
  questions,
  responseCount,
  answersByQuestion,
}: {
  title: string;
  description?: string | null;
  visibility: string;
  questions: Question[];
  responseCount: number;
  answersByQuestion: Record<string, string[]>;
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">
                {responseCount} response{responseCount !== 1 && "s"}
              </Badge>
              <Badge variant={visibility === "public" ? "default" : "outline"}>
                {visibility === "public" ? "Public" : "Private"} results
              </Badge>
            </div>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
      </Card>

      {questions.map((question) => {
        const answers = answersByQuestion[question.id] || [];

        return (
          <Card key={question.id}>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{question.question_text}</CardTitle>
              <p className="text-xs text-muted-foreground">
                {answers.length} answer{answers.length !== 1 && "s"}
              </p>
            </CardHeader>
            <CardContent>
              <QuestionResults
                question={question}
                answers={answers}
                totalResponses={responseCount}
              />
            </CardContent>
          </Card>
        );
      })}

      {responseCount === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No responses yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function QuestionResults({
  question,
  answers,
  totalResponses,
}: {
  question: Question;
  answers: string[];
  totalResponses: number;
}) {
  switch (question.question_type) {
    case "short_text":
    case "long_text":
      return (
        <div className="space-y-2">
          {answers.length === 0 ? (
            <p className="text-sm text-muted-foreground">No answers</p>
          ) : (
            answers.map((answer, i) => (
              <div
                key={i}
                className="rounded-md border bg-muted/30 px-3 py-2 text-sm"
              >
                {answer}
              </div>
            ))
          )}
        </div>
      );

    case "single_choice": {
      const counts: Record<string, number> = {};
      answers.forEach((a) => {
        counts[a] = (counts[a] || 0) + 1;
      });

      return (
        <div className="space-y-2">
          {(question.options as string[]).map((option) => {
            const count = counts[option] || 0;
            const percent = totalResponses > 0 ? (count / totalResponses) * 100 : 0;
            return (
              <div key={option} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{option}</span>
                  <span className="text-muted-foreground">
                    {count} ({Math.round(percent)}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    case "multiple_choice": {
      const counts: Record<string, number> = {};
      answers.forEach((a) => {
        a.split("|||").forEach((choice) => {
          if (choice.trim()) {
            counts[choice] = (counts[choice] || 0) + 1;
          }
        });
      });

      return (
        <div className="space-y-2">
          {(question.options as string[]).map((option) => {
            const count = counts[option] || 0;
            const percent = totalResponses > 0 ? (count / totalResponses) * 100 : 0;
            return (
              <div key={option} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{option}</span>
                  <span className="text-muted-foreground">
                    {count} ({Math.round(percent)}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    case "rating": {
      const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      let sum = 0;
      answers.forEach((a) => {
        const num = parseInt(a, 10);
        if (num >= 1 && num <= 5) {
          counts[num]++;
          sum += num;
        }
      });
      const avg = answers.length > 0 ? sum / answers.length : 0;

      return (
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-3xl font-bold">{avg.toFixed(1)}</span>
            <span className="text-muted-foreground"> / 5 average</span>
          </div>
          <Separator />
          <div className="space-y-1">
            {[5, 4, 3, 2, 1].map((n) => {
              const count = counts[n];
              const percent =
                answers.length > 0 ? (count / answers.length) * 100 : 0;
              return (
                <div key={n} className="flex items-center gap-2 text-sm">
                  <span className="w-4 text-right">{n}</span>
                  <div className="h-2 flex-1 rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-muted-foreground">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
