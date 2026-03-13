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

const categoryConfig = {
  count: { label: "Count" },
  idea: { label: "Ideas", color: "var(--color-chart-1)" },
  concern: { label: "Concerns", color: "var(--color-chart-2)" },
  praise: { label: "Praise", color: "var(--color-chart-3)" },
  question: { label: "Questions", color: "var(--color-chart-4)" },
} satisfies ChartConfig;

const wellbeingTrendConfig = {
  score: { label: "Wellbeing Score", color: "var(--color-chart-3)" },
} satisfies ChartConfig;

const activityConfig = {
  feedback: { label: "Feedback", color: "var(--color-chart-1)" },
  comments: { label: "Comments", color: "var(--color-chart-2)" },
  reactions: { label: "Reactions", color: "var(--color-chart-3)" },
} satisfies ChartConfig;

const wellbeingConfig = {
  score: { label: "Wellbeing", color: "var(--color-chart-3)" },
} satisfies ChartConfig;

const moodConfig = {
  value: { label: "Reactions" },
  positive: { label: "Positive", color: "var(--color-chart-3)" },
  neutral: { label: "Neutral", color: "var(--color-chart-4)" },
  negative: { label: "Negative", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

const CATEGORY_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
];

function WellbeingLabel({ score }: { score: number }) {
  if (score >= 70) return "Positive";
  if (score >= 40) return "Neutral";
  return "Needs attention";
}

function SafetyLabel({ score }: { score: number }) {
  if (score >= 75) return "Strong";
  if (score >= 50) return "Moderate";
  return "Low";
}

export function AnalyticsDashboard({ data }: { data: AnalyticsData }) {
  const moodData = [
    { name: "positive", value: data.reactionMood.positive, fill: "var(--color-chart-3)" },
    { name: "neutral", value: data.reactionMood.neutral, fill: "var(--color-chart-4)" },
    { name: "negative", value: data.reactionMood.negative, fill: "var(--color-chart-2)" },
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
      {/* KPI Cards — Wellbeing focused */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Team Members</CardDescription>
            <CardTitle className="text-3xl">{data.team.activeMembers}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Response Rate</CardDescription>
            <CardTitle className="text-3xl">{data.responseRate}%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Feedback items that received a reply
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Psychological Safety</CardDescription>
            <CardTitle className="text-3xl">{data.psychologicalSafety}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <SafetyLabel score={data.psychologicalSafety} /> — category diversity &amp; concern expression
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Feedback</CardDescription>
            <CardTitle className="text-3xl">{data.engagement.totalFeedback}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Row: Wellbeing Score + Reaction Mood */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Wellbeing Score</CardTitle>
            <CardDescription>
              Composite of feedback sentiment, reactions mood, and response rate — <WellbeingLabel score={data.wellbeingScore} />
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
                  {data.wellbeingScore}
                </text>
                <text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted-foreground text-sm"
                >
                  / 100
                </text>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reaction Mood</CardTitle>
            <CardDescription>
              Emotional tone of emoji reactions across the workspace
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
          <CardTitle>Wellbeing Trend</CardTitle>
          <CardDescription>
            Weekly wellbeing score over the last 12 weeks
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
          <CardTitle>Engagement Activity</CardTitle>
          <CardDescription>
            Weekly feedback, comments, and reactions over the last 12 weeks
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
              <Line type="monotone" dataKey="comments" stroke="var(--color-chart-2)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="reactions" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Row: Category Distribution + Top Reactions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Feedback Categories</CardTitle>
            <CardDescription>
              Volume breakdown by category
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
            <CardTitle>Top Reactions</CardTitle>
            <CardDescription>
              Most used emoji reactions across the workspace
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
                No reactions yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
