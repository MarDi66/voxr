"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { CheckCircle2, Users, XCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { closeForm } from "@/actions/forms";

type Question = {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  position: number;
};

export function FormResults({
  formId,
  title,
  description,
  visibility,
  status,
  questions,
  responseCount,
  memberCount,
  answersByQuestion,
  isOwner = false,
}: {
  formId: string;
  title: string;
  description?: string | null;
  visibility: string;
  status: string;
  questions: Question[];
  responseCount: number;
  memberCount: number;
  answersByQuestion: Record<string, string[]>;
  isOwner?: boolean;
}) {
  const router = useRouter();
  const t = useTranslations("forms");
  const [closing, setClosing] = useState(false);
  const allAnswered = memberCount > 0 && responseCount >= memberCount;
  const isClosed = status === "closed";

  async function handleClose() {
    setClosing(true);
    const result = await closeForm(formId);
    if ("error" in result) {
      setClosing(false);
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <Card className="ring-2 ring-blue-400 bg-blue-50/50 dark:bg-blue-950/20">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle>{title}</CardTitle>
            <div className="flex flex-wrap gap-2">
              {isClosed && (
                <Badge variant="destructive" className="gap-1">
                  <XCircle className="h-3 w-3" />
                  {t("closed")}
                </Badge>
              )}
              <Badge variant={visibility === "public" ? "default" : "outline"}>
                {visibility === "public" ? t("publicResults") : t("privateResults")}
              </Badge>
            </div>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
          <div className={`flex items-center gap-2 pt-2 ${allAnswered ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
            {allAnswered ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <Users className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {t("membersAnswered", { answered: responseCount, total: memberCount })}
            </span>
          </div>
          {isOwner && !isClosed && (
            <div className="pt-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClose}
                disabled={closing}
              >
                {closing ? t("closingForm") : t("closeForm")}
              </Button>
            </div>
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
                {t("answerCount", { count: answers.length })}
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
            <p className="text-muted-foreground">{t("noResponses")}</p>
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
  const t = useTranslations("forms");

  switch (question.question_type) {
    case "short_text":
    case "long_text":
      return (
        <div className="space-y-2">
          {answers.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noAnswers")}</p>
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
            <span className="text-2xl font-bold text-foreground">{t("ratingAverage", { avg: avg.toFixed(1) })}</span>
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
