"use client";

import { useState, useId } from "react";
import { useRouter } from "@/lib/i18n/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, GripVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
import { getActionErrorMessage } from "@/lib/action-error-message";

type QuestionType = "short_text" | "long_text" | "single_choice" | "multiple_choice" | "rating";

type Question = {
  id: string;
  question_text: string;
  question_type: QuestionType;
  options: string[];
  required: boolean;
};

const questionTypeKeys: Record<QuestionType, string> = {
  short_text: "shortText",
  long_text: "longText",
  single_choice: "singleChoice",
  multiple_choice: "multipleChoice",
  rating: "rating",
};

let nextQuestionId = 1;
function generateQuestionId() {
  return `q-${nextQuestionId++}-${Date.now()}`;
}

function SortableQuestionCard({
  question,
  qIndex,
  questionsCount,
  updateQuestion,
  removeQuestion,
  addOption,
  updateOption,
  removeOption,
}: {
  question: Question;
  qIndex: number;
  questionsCount: number;
  updateQuestion: (index: number, updates: Partial<Question>) => void;
  removeQuestion: (index: number) => void;
  addOption: (qIndex: number) => void;
  updateOption: (qIndex: number, oIndex: number, value: string) => void;
  removeOption: (qIndex: number, oIndex: number) => void;
}) {
  const t = useTranslations("forms");
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-2">
            <button
              type="button"
              className="mt-1.5 cursor-grab touch-none active:cursor-grabbing"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="h-5 w-5 shrink-0 text-muted-foreground" />
            </button>
            <div className="flex-1 space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={t("questionPlaceholder", { number: qIndex + 1 })}
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
                    <SelectValue>{t(questionTypeKeys[question.question_type])}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(questionTypeKeys).map(([value, key]) => (
                      <SelectItem key={value} value={value}>
                        {t(key)}
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
                      <Input
                        placeholder={t("optionPlaceholder", { number: oIndex + 1 })}
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
                    {t("addOption")}
                  </Button>
                </div>
              )}
            </div>

            {questionsCount > 1 && (
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
    </div>
  );
}

export function CreateFormBuilder({
  workspaceId,
  slug,
}: {
  workspaceId: string;
  slug: string;
}) {
  const t = useTranslations("forms");
  const tc = useTranslations("common");
  const te = useTranslations("billingErrors");
  const router = useRouter();
  const dndId = useId();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [questions, setQuestions] = useState<Question[]>([
    { id: generateQuestionId(), question_text: "", question_type: "short_text", options: [], required: true },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setQuestions((prev) => {
        const oldIndex = prev.findIndex((q) => q.id === active.id);
        const newIndex = prev.findIndex((q) => q.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }

  function addQuestion() {
    setQuestions([
      ...questions,
      { id: generateQuestionId(), question_text: "", question_type: "short_text", options: [], required: true },
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
      toast.error(t("titleError"));
      return;
    }

    const emptyQuestion = questions.find((q) => !q.question_text.trim());
    if (emptyQuestion) {
      toast.error(t("questionError"));
      return;
    }

    const choiceWithoutOptions = questions.find(
      (q) =>
        (q.question_type === "single_choice" || q.question_type === "multiple_choice") &&
        q.options.filter((o) => o.trim()).length < 2
    );
    if (choiceWithoutOptions) {
      toast.error(t("optionsError"));
      return;
    }

    setIsSubmitting(true);

    const result = await createForm({
      workspaceId,
      title,
      description: description || undefined,
      visibility,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      questions: questions.map(({ id: _id, ...q }) => ({
        ...q,
        options: q.options.filter((o) => o.trim()),
      })),
    });

    setIsSubmitting(false);

    if (result.error) {
      toast.error(getActionErrorMessage(result.error, te));
      return;
    }

    toast.success(t("formCreated"));
    router.push(`/w/${slug}`);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("createTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("titleLabel")}</Label>
            <Input
              id="title"
              placeholder={t("titleInputPlaceholder")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("descriptionLabel")}</Label>
            <Textarea
              id="description"
              placeholder={t("descriptionPlaceholder")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("visibilityLabel")}</Label>
            <Select value={visibility} onValueChange={(v) => { if (v) setVisibility(v as "public" | "private"); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="w-fit">
                <SelectItem value="public">{t("visibilityPublic")}</SelectItem>
                <SelectItem value="private">{t("visibilityPrivate")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <DndContext
        id={dndId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {questions.map((question, qIndex) => (
              <SortableQuestionCard
                key={question.id}
                question={question}
                qIndex={qIndex}
                questionsCount={questions.length}
                updateQuestion={updateQuestion}
                removeQuestion={removeQuestion}
                addOption={addOption}
                updateOption={updateOption}
                removeOption={removeOption}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Button type="button" variant="outline" className="w-full" onClick={addQuestion}>
        <Plus className="mr-2 h-4 w-4" />
        {t("addQuestion")}
      </Button>

      <Separator />

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.back()}>
          {tc("cancel")}
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {t("publishForm")}
        </Button>
      </div>
    </div>
  );
}
