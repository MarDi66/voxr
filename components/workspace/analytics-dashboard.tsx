"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type HistoryEntry = {
  date: string;
  teamMembers: number;
  responseRate: number;
  psychologicalSafety: number;
  totalFeedback: number;
};

type AnalyticsData = {
  categoryDistribution: { category: string; count: number }[];
  weeklyWellbeing: {
    week: string;
    score: number;
    feedback: number;
    comments: number;
    reactions: number;
  }[];
  wellbeingScore: number;
  reactionMood: { positive: number; negative: number; neutral: number };
  responseRate: number;
  psychologicalSafety: number;
  sentiment: {
    concerns: number;
    praises: number;
    ideas: number;
    questions: number;
  };
  engagement: {
    totalFeedback: number;
    totalComments: number;
    totalReactions: number;
    avgCommentsPerItem: number;
    avgReactionsPerItem: number;
  };
  team: {
    activeMembers: number;
  };
  topEmojis: { emoji: string; count: number }[];
};

const CATEGORY_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

export function AnalyticsDashboard({ data, history }: { data: AnalyticsData; history: HistoryEntry[] }) {
  const t = useTranslations("analytics");

  const categoryConfig = useMemo(() => ({
    count: { label: t("count") },
    idea: { label: t("ideas"), color: "var(--color-chart-1)" },
    concern: { label: t("concerns"), color: "var(--color-chart-2)" },
    praise: { label: t("praise"), color: "var(--color-chart-3)" },
    question: { label: t("questions"), color: "var(--color-chart-4)" },
  }) satisfies ChartConfig, [t]);

  const wellbeingTrendConfig = useMemo(() => ({
    score: { label: t("wellbeingScore"), color: "var(--color-chart-3)" },
  }) satisfies ChartConfig, [t]);

  const activityConfig = useMemo(() => ({
    feedback: { label: t("feedback"), color: "var(--color-chart-1)" },
    comments: { label: t("comments"), color: "var(--color-chart-4)" },
    reactions: { label: t("reactions"), color: "var(--color-chart-5)" },
  }) satisfies ChartConfig, [t]);

  const wellbeingConfig = useMemo(() => ({
    score: { label: t("wellbeing"), color: "var(--color-chart-3)" },
  }) satisfies ChartConfig, [t]);

  const yearlyTeamConfig = useMemo(() => ({
    teamMembers: { label: t("teamMembers"), color: "var(--color-chart-1)" },
  }) satisfies ChartConfig, [t]);

  const yearlyResponseConfig = useMemo(() => ({
    responseRate: { label: t("responseRate"), color: "var(--color-chart-2)" },
  }) satisfies ChartConfig, [t]);

  const yearlySafetyConfig = useMemo(() => ({
    psychologicalSafety: { label: t("psychologicalSafety"), color: "var(--color-chart-3)" },
  }) satisfies ChartConfig, [t]);

  const yearlyFeedbackConfig = useMemo(() => ({
    totalFeedback: { label: t("totalFeedback"), color: "var(--color-chart-4)" },
  }) satisfies ChartConfig, [t]);

  const moodConfig = useMemo(() => ({
    value: { label: t("reactions") },
    positive: { label: t("positive"), color: "oklch(0.72 0.19 142)" },
    neutral: { label: t("neutral"), color: "oklch(0.80 0.15 85)" },
    negative: { label: t("negative"), color: "oklch(0.64 0.2 25)" },
  }) satisfies ChartConfig, [t]);

  function getWellbeingLabel(score: number) {
    if (score >= 70) return t("positive");
    if (score >= 40) return t("neutral");
    return t("needsAttention");
  }

  function getSafetyLabel(score: number) {
    if (score >= 75) return t("strong");
    if (score >= 50) return t("moderate");
    return t("low");
  }

  const moodData = [
    { name: "positive", value: data.reactionMood.positive, fill: "oklch(0.72 0.19 142)" },
    { name: "neutral", value: data.reactionMood.neutral, fill: "oklch(0.80 0.15 85)" },
    { name: "negative", value: data.reactionMood.negative, fill: "oklch(0.64 0.2 25)" },
  ];

  const wellbeingData = [
    {
      name: "score",
      value: data.wellbeingScore,
      fill: data.wellbeingScore >= 70
        ? "var(--color-chart-3)"
        : data.wellbeingScore >= 40
          ? "var(--color-chart-4)"
          : "var(--color-chart-2)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t("teamMembers")}</CardDescription>
            <CardTitle className="text-3xl">{data.team.activeMembers}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t("responseRate")}</CardDescription>
            <CardTitle className="text-3xl">{data.responseRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {t("responseRateDescription")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t("psychologicalSafety")}</CardDescription>
            <CardTitle className="text-3xl">{data.psychologicalSafety}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {t("safetyDescription", { label: getSafetyLabel(data.psychologicalSafety) })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>{t("totalFeedback")}</CardDescription>
            <CardTitle className="text-3xl">{data.engagement.totalFeedback}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Row: Wellbeing Score + Reaction Mood */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("wellbeingScore")}</CardTitle>
            <CardDescription>
              {t("wellbeingScoreDescription", { label: getWellbeingLabel(data.wellbeingScore) })}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={wellbeingConfig} className="mx-auto aspect-square max-h-50">
              <RadialBarChart
                data={wellbeingData}
                startAngle={180}
                endAngle={180 - (data.wellbeingScore / 100) * 360}
                innerRadius={70}
                outerRadius={100}
              >
                <RadialBar dataKey="value" background cornerRadius={10} />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-3xl font-bold"
                >
                  {data.wellbeingScore}%
                </text>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("reactionMood")}</CardTitle>
            <CardDescription>
              {t("reactionMoodDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={moodConfig} className="mx-auto aspect-square max-h-50">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
                <Pie
                  data={moodData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  strokeWidth={2}
                />
                <ChartLegend content={<ChartLegendContent nameKey="name" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Wellbeing Trend Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>{t("wellbeingTrend")}</CardTitle>
          <CardDescription>
            {t("wellbeingTrendDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={wellbeingTrendConfig} className="h-75 w-full">
            <AreaChart data={data.weeklyWellbeing}>
              <defs>
                <linearGradient id="wellbeingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="score"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                fill="url(#wellbeingGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Activity Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>{t("engagementActivity")}</CardTitle>
          <CardDescription>
            {t("engagementActivityDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={activityConfig} className="h-75 w-full">
            <LineChart data={data.weeklyWellbeing}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="feedback" stroke="var(--color-chart-1)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="comments" stroke="var(--color-chart-4)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="reactions" stroke="var(--color-chart-5)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Row: Category Distribution + Top Reactions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("feedbackCategories")}</CardTitle>
            <CardDescription>
              {t("feedbackCategoriesDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryConfig} className="h-62.5 w-full">
              <BarChart data={data.categoryDistribution}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="category" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {data.categoryDistribution.map((_, index) => (
                    <Cell key={index} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("topReactions")}</CardTitle>
            <CardDescription>
              {t("topReactionsDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.topEmojis.length > 0 ? (
              <div className="space-y-4 pt-2">
                {data.topEmojis.map((item) => (
                  <div key={item.emoji} className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1">
                      <div
                        className="h-3 rounded-full bg-chart-1"
                        style={{
                          width: `${(item.count / (data.topEmojis[0]?.count || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground tabular-nums">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-sm text-muted-foreground">
                {t("noReactionsYet")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Yearly Trends */}
      {history.length > 0 && (
        <>
          <div>
            <h2 className="text-xl font-semibold">{t("yearlyTrends")}</h2>
            <p className="text-sm text-muted-foreground">
              {t("yearlyTrendsDescription")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{t("teamMembers")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={yearlyTeamConfig} className="h-50 w-full">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="teamGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="teamMembers" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#teamGradient)" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("responseRate")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={yearlyResponseConfig} className="h-50 w-full">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="responseRate" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#responseGradient)" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("psychologicalSafety")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={yearlySafetyConfig} className="h-50 w-full">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="safetyGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tickMargin={8} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="psychologicalSafety" stroke="var(--color-chart-3)" strokeWidth={2} fill="url(#safetyGradient)" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("totalFeedback")}</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={yearlyFeedbackConfig} className="h-50 w-full">
                  <AreaChart data={history}>
                    <defs>
                      <linearGradient id="feedbackGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-chart-4)" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="var(--color-chart-4)" stopOpacity={0.05} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="totalFeedback" stroke="var(--color-chart-4)" strokeWidth={2} fill="url(#feedbackGradient)" />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
