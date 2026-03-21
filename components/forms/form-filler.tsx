"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { toast } from "sonner";
import {
  Loader2,
  ChevronRight,
  ChevronLeft,
  Check,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitFormResponse } from "@/actions/forms";
import { cn } from "@/lib/utils";

type Question = {
  id: string;
  question_text: string;
  question_type: string;
  options: string[];
  required: boolean;
  position: number;
};

export function FormFiller({
  formId,
  formTitle,
  formDescription,
  questions,
  slug,
}: {
  formId: string;
  formTitle: string;
  formDescription?: string | null;
  questions: Question[];
  slug: string;
}) {
  const router = useRouter();
  const t = useTranslations("forms");
  const tc = useTranslations("common");
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = intro screen
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isIntro = currentIndex === -1;
  const isComplete = currentIndex >= questions.length;
  const currentQuestion = !isIntro && !isComplete ? questions[currentIndex] : null;
  const progress = Math.max(0, currentIndex) / questions.length;

  function setAnswer(questionId: string, value: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  }

  function handleNext() {
    if (isIntro) {
      setCurrentIndex(0);
      return;
    }

    if (currentQuestion) {
      const answer = answers[currentQuestion.id] || "";
      if (currentQuestion.required && !answer.trim()) {
        toast.error(t("required"));
        return;
      }
    }

    setCurrentIndex((i) => i + 1);
  }

  function handleBack() {
    setCurrentIndex((i) => Math.max(-1, i - 1));
  }

  async function handleSubmit() {
    // Validate all required questions
    for (const q of questions) {
      const answer = answers[q.id] || "";
      if (q.required && !answer.trim()) {
        toast.error(t("pleaseAnswer", { question: q.question_text }));
        setCurrentIndex(q.position);
        return;
      }
    }

    setIsSubmitting(true);

    const result = await submitFormResponse({
      formId,
      answers: Object.entries(answers).map(([questionId, value]) => ({
        questionId,
        value,
      })),
    });

    setIsSubmitting(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    setSubmitted(true);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      if (currentQuestion?.question_type === "long_text") return;
      e.preventDefault();
      if (isComplete) {
        handleSubmit();
      } else {
        handleNext();
      }
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card className="w-full">
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold">{t("thankYou")}</h2>
            <p className="text-muted-foreground">
              {t("responseRecorded")}
            </p>
            <Button onClick={() => router.push(`/w/${slug}`)}>
              {t("backToFeed")}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] flex-col" onKeyDown={handleKeyDown}>
      {/* Progress bar */}
      {!isIntro && (
        <div className="mb-8 h-1 w-full rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}

      <div className="flex flex-1 items-center justify-center">
        {isIntro ? (
          <Card className="w-full">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <h1 className="text-3xl font-bold">{formTitle}</h1>
              {formDescription && (
                <p className="text-muted-foreground">{formDescription}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {t("questionCount", { count: questions.length })}
              </p>
              <Button size="lg" onClick={handleNext} className="mt-4 gap-2">
                {t("start")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ) : isComplete ? (
          <Card className="w-full">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <h2 className="text-2xl font-bold">{t("allDone")}</h2>
              <p className="text-muted-foreground">
                {t("reviewMessage")}
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="lg" variant="outline" onClick={handleBack}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  {tc("back")}
                </Button>
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {t("submitResponse")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : currentQuestion ? (
          <div className="w-full space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {t("questionProgress", { current: currentIndex + 1, total: questions.length })}
                {currentQuestion.required && " *"}
              </p>
              <h2 className="text-2xl font-bold">
                {currentQuestion.question_text}
              </h2>
            </div>

            <QuestionInput
              question={currentQuestion}
              value={answers[currentQuestion.id] || ""}
              onChange={(v) => setAnswer(currentQuestion.id, v)}
            />

            <div className="flex items-center justify-between pt-4">
              <Button variant="ghost" onClick={handleBack}>
                <ChevronLeft className="mr-1 h-4 w-4" />
                {tc("back")}
              </Button>
              <Button onClick={handleNext}>
                {currentIndex === questions.length - 1 ? t("review") : t("next")}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function QuestionInput({
  question,
  value,
  onChange,
}: {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}) {
  const t = useTranslations("forms");

  switch (question.question_type) {
    case "short_text":
      return (
        <Input
          placeholder={t("typeAnswer")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="text-lg"
        />
      );

    case "long_text":
      return (
        <Textarea
          placeholder={t("typeAnswer")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          className="min-h-32 text-lg"
        />
      );

    case "single_choice":
      return (
        <div className="space-y-2">
          {(question.options as string[]).map((option, i) => (
            <button
              key={i}
              type="button"
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent/50",
                value === option && "border-primary bg-primary/5"
              )}
              onClick={() => onChange(option)}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                {String.fromCharCode(65 + i)}
              </span>
              <span>{option}</span>
            </button>
          ))}
        </div>
      );

    case "multiple_choice": {
      const selected = value ? value.split("|||") : [];
      return (
        <div className="space-y-2">
          {(question.options as string[]).map((option, i) => {
            const isSelected = selected.includes(option);
            return (
              <button
                key={i}
                type="button"
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-colors hover:bg-accent/50",
                  isSelected && "border-primary bg-primary/5"
                )}
                onClick={() => {
                  const next = isSelected
                    ? selected.filter((s) => s !== option)
                    : [...selected, option];
                  onChange(next.join("|||"));
                }}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded border text-xs font-medium",
                    isSelected && "bg-primary text-primary-foreground"
                  )}
                >
                  {isSelected && <Check className="h-3.5 w-3.5" />}
                </span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      );
    }

    case "rating":
      return (
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-lg border text-lg font-medium transition-colors hover:bg-accent/50",
                value === String(n) && "border-primary bg-primary text-primary-foreground"
              )}
              onClick={() => onChange(String(n))}
            >
              {n}
            </button>
          ))}
        </div>
      );

    default:
      return null;
  }
}
