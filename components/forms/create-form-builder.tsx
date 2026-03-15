"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createForm } from "@/actions/forms";

type QuestionType = "short_text" | "long_text" | "single_choice" | "multiple_choice" | "rating";

type Question = {
  question_text: string;
  question_type: QuestionType;
  options: string[];
  required: boolean;
};

const questionTypeLabels: Record<QuestionType, string> = {
  short_text: "Short Text",
  long_text: "Long Text",
  single_choice: "Single Choice",
  multiple_choice: "Multiple Choice",
  rating: "Rating (1-5)",
};

export function CreateFormBuilder({
  workspaceId,
  slug,
}: {
  workspaceId: string;
  slug: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [questions, setQuestions] = useState<Question[]>([
    { question_text: "", question_type: "short_text", options: [], required: true },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function addQuestion() {
    setQuestions([
      ...questions,
      { question_text: "", question_type: "short_text", options: [], required: true },
    ]);
  }

  function removeQuestion(index: number) {
    if (questions.length <= 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  }

  function updateQuestion(index: number, updates: Partial<Question>) {
    setQuestions(
      questions.map((q, i) => (i === index ? { ...q, ...updates } : q))
    );
  }

  function addOption(qIndex: number) {
    const q = questions[qIndex];
    updateQuestion(qIndex, { options: [...q.options, ""] });
  }

  function updateOption(qIndex: number, oIndex: number, value: string) {
    const q = questions[qIndex];
    const newOptions = [...q.options];
    newOptions[oIndex] = value;
    updateQuestion(qIndex, { options: newOptions });
  }

  function removeOption(qIndex: number, oIndex: number) {
    const q = questions[qIndex];
    updateQuestion(qIndex, {
      options: q.options.filter((_, i) => i !== oIndex),
    });
  }

  async function handleSubmit() {
    if (!title.trim()) {
      toast.error("Please enter a form title");
      return;
    }

    const emptyQuestion = questions.find((q) => !q.question_text.trim());
    if (emptyQuestion) {
      toast.error("All questions must have text");
      return;
    }

    const choiceWithoutOptions = questions.find(
      (q) =>
        (q.question_type === "single_choice" || q.question_type === "multiple_choice") &&
        q.options.filter((o) => o.trim()).length < 2
    );
    if (choiceWithoutOptions) {
      toast.error("Choice questions must have at least 2 options");
      return;
    }

    setIsSubmitting(true);

    const result = await createForm({
      workspaceId,
      title,
      description: description || undefined,
      visibility,
      questions: questions.map((q) => ({
        ...q,
        options: q.options.filter((o) => o.trim()),
      })),
    });

    setIsSubmitting(false);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Form created!");
    router.push(`/w/${slug}`);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create a Form</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="What would you like to ask?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Add context about this form..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Answers Visibility</Label>
            <Select value={visibility} onValueChange={(v) => { if (v) setVisibility(v as "public" | "private"); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-fit">
                <SelectItem value="public">Public — everyone can see results</SelectItem>
                <SelectItem value="private">Private — only you can see results</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {questions.map((question, qIndex) => (
          <Card key={qIndex}>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <GripVertical className="mt-1.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div className="flex-1 space-y-4">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Input
                        placeholder={`Question ${qIndex + 1}`}
                        value={question.question_text}
                        onChange={(e) =>
                          updateQuestion(qIndex, { question_text: e.target.value })
                        }
                      />
                    </div>
                    <Select
                      value={question.question_type}
                      onValueChange={(v) => {
                        if (!v) return;
                        const updates: Partial<Question> = { question_type: v as QuestionType };
                        if (
                          (v === "single_choice" || v === "multiple_choice") &&
                          question.options.length === 0
                        ) {
                          updates.options = ["", ""];
                        }
                        if (v === "short_text" || v === "long_text" || v === "rating") {
                          updates.options = [];
                        }
                        updateQuestion(qIndex, updates);
                      }}
                    >
                      <SelectTrigger className="w-44">
                        <SelectValue>{questionTypeLabels[question.question_type]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(questionTypeLabels).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {(question.question_type === "single_choice" ||
                    question.question_type === "multiple_choice") && (
                    <div className="space-y-2 pl-2">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-2">
                          {/* <div className="h-4 w-4 shrink-0 rounded-full border border-muted-foreground/30" /> */}
                          <Input
                            placeholder={`Option ${oIndex + 1}`}
                            value={option}
                            className="flex-1 ml-4"
                            onChange={(e) =>
                              updateOption(qIndex, oIndex, e.target.value)
                            }
                          />
                          {question.options.length > 2 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeOption(qIndex, oIndex)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-1"
                        onClick={() => addOption(qIndex)}
                      >
                        <Plus className="mr-1 h-3.5 w-3.5" />
                        Add option
                      </Button>
                    </div>
                  )}
                </div>

                {questions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="mt-1 text-destructive"
                    onClick={() => removeQuestion(qIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Button type="button" variant="outline" className="w-full" onClick={addQuestion}>
        <Plus className="mr-2 h-4 w-4" />
        Add Question
      </Button>

      <Separator />

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Publish Form
        </Button>
      </div>
    </div>
  );
}
