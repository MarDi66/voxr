export type FAQItem = {
  question: string;
  answer: string;
};

type PageSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

type ComparisonBlock = {
  title: string;
  description?: string;
  headers: [string, string, string];
  rows: Array<[string, string, string]>;
};

type CTA = {
  title: string;
  body: string;
  primary: {
    href: string;
    label: string;
  };
  secondary?: {
    href: string;
    label: string;
  };
};

export type RelatedLink = {
  href: string;
  label: string;
  description: string;
};

export type ContentPageRecord = {
  slug: string;
  type: "solution" | "guide" | "resource" | "glossary";
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  definition: string;
  summaryPoints: string[];
  sections: PageSection[];
  faqs: FAQItem[];
  relatedLinks: RelatedLink[];
  cta: CTA;
  breadcrumbs: Array<{ label: string; href: string }>;
  comparison?: ComparisonBlock;
  publishedTime: string;
};

const publishedTime = "2026-03-17";

export const solutionPages: ContentPageRecord[] = [
  {
    slug: "anonymous-feedback-software",
    type: "solution",
    path: "/solutions/anonymous-feedback-software",
    title: "Anonymous Feedback Software for Modern Teams",
    description:
      "Learn what teams need from anonymous feedback software and how Voxr helps companies collect honest internal feedback without exposing employees.",
    eyebrow: "Solution page",
    intro:
      "Anonymous feedback software gives employees a protected channel to share concerns, ideas, praise, and practical friction without attaching their identity to every post.",
    definition:
      "The best anonymous feedback software feels safer than a public chat channel and more alive than a forgotten suggestion box. It lets people speak honestly while keeping the discussion useful for the team.",
    summaryPoints: [
      "Built for honest internal feedback inside a private workspace.",
      "Useful for ideas, praise, blockers, and sensitive concerns.",
      "Designed for teams that want faster feedback loops without public exposure.",
      "Better suited to ongoing dialogue than one-off survey cycles.",
    ],
    comparison: {
      title: "What strong anonymous feedback software should include",
      description:
        "Teams usually compare anonymous tools against forms, surveys, or manual suggestion boxes. The real question is whether the system produces useful, discussable feedback.",
      headers: ["Capability", "Static suggestion box", "Voxr approach"],
      rows: [
        [
          "Ongoing conversation",
          "Feedback usually disappears into a form submission queue.",
          "Employees can post, comment, react, and keep useful threads moving.",
        ],
        [
          "Workspace boundaries",
          "Submissions often live in a single inbox with little team context.",
          "Each workspace has its own private feedback feed and membership controls.",
        ],
        [
          "Trust signal",
          "Many systems say feedback is anonymous but still feel surveilled.",
          "Voxr is positioned around anonymous internal feedback as the core product promise.",
        ],
      ],
    },
    sections: [
      {
        title: "Why teams look for anonymous feedback software",
        paragraphs: [
          "The main problem is rarely a lack of survey tools. It is the gap between what employees really think and what they feel safe saying out loud. When feedback channels are too visible, too formal, or too tied to hierarchy, useful signals disappear.",
          "Anonymous feedback software helps close that gap. It creates a place where people can raise concerns early, share blunt observations, and suggest improvements before small issues become cultural debt.",
        ],
        bullets: [
          "Surface friction before it becomes attrition, burnout, or silent disengagement.",
          "Give quieter employees a channel that does not depend on confidence in a live meeting.",
          "Collect a broader mix of praise, ideas, and concerns than a traditional complaint box.",
          "Keep feedback close to the team that can act on it instead of burying it in HR admin work.",
        ],
      },
      {
        title: "How Voxr fits the category",
        paragraphs: [
          "Voxr is built around anonymous internal company feedback inside a workspace. Employees can share feedback, ideas, praise, concerns, and comments visible only to members of that same workspace.",
          "That structure matters. It keeps feedback contextual and makes the product useful for modern teams that need lightweight, always-on internal feedback rather than a heavyweight annual process.",
        ],
      },
      {
        title: "Who this type of software is for",
        paragraphs: [
          "Anonymous feedback software is especially useful for startups, high-growth teams, distributed companies, and managers trying to improve trust without forcing people into public vulnerability.",
          "It is also valuable for teams that have already tried forms or surveys but found them too episodic to drive day-to-day improvement.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is anonymous feedback software used for?",
        answer:
          "It is used to collect honest employee input on team health, ideas, blockers, leadership, communication, and workplace concerns without requiring employees to reveal their identity.",
      },
      {
        question: "How is this different from a pulse survey?",
        answer:
          "Pulse surveys measure sentiment at set intervals. Anonymous feedback software supports ongoing input and discussion whenever employees have something worth sharing.",
      },
      {
        question: "Is anonymous feedback only for complaints?",
        answer:
          "No. Strong systems also capture ideas, praise, process improvements, and observations that help teams work better.",
      },
    ],
    relatedLinks: [
      {
        href: "/product",
        label: "See the Voxr product overview",
        description: "Understand how workspaces, posts, comments, and forms fit together.",
      },
      {
        href: "/guides/how-to-collect-anonymous-employee-feedback",
        label: "Learn how to collect anonymous employee feedback",
        description: "A practical guide to rollout, moderation, and trust-building.",
      },
      {
        href: "/resources/anonymous-feedback-policy-template",
        label: "Use an anonymous feedback policy template",
        description: "Set expectations for what employees should share and how leaders should respond.",
      },
    ],
    cta: {
      title: "Turn anonymous input into a real internal feedback loop",
      body:
        "Voxr gives each workspace a private place to collect honest employee feedback, discuss it safely, and keep useful ideas visible.",
      primary: {
        href: "/auth",
        label: "Create a Voxr workspace",
      },
      secondary: {
        href: "/product",
        label: "Explore the product",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Anonymous feedback software", href: "/solutions/anonymous-feedback-software" },
    ],
    publishedTime,
  },
  {
    slug: "employee-feedback-platform",
    type: "solution",
    path: "/solutions/employee-feedback-platform",
    title: "Employee Feedback Platform for Honest Internal Communication",
    description:
      "See what an employee feedback platform should do for modern teams and how Voxr supports private, workspace-based employee feedback.",
    eyebrow: "Solution page",
    intro:
      "An employee feedback platform should make it easier for teams to hear what is true, not just what is easy to say in front of a manager.",
    definition:
      "A useful employee feedback platform combines trust, structure, and visibility. Employees need a safe way to speak. Leaders need feedback they can understand and act on.",
    summaryPoints: [
      "Designed for continuous internal feedback, not just annual review cycles.",
      "Supports comments, reactions, and structured forms in one workspace.",
      "Keeps feedback scoped to the team that needs it.",
      "Works well for startups and modern teams that want lightweight adoption.",
    ],
    sections: [
      {
        title: "What teams expect from an employee feedback platform",
        paragraphs: [
          "The category is broader than anonymous feedback alone. Teams also need a way to organize input, understand what deserves attention, and keep useful feedback from disappearing after submission.",
          "In practice, that means the platform needs enough structure to support action without becoming a bureaucratic process people avoid.",
        ],
        bullets: [
          "Simple submission flow so employees actually use it.",
          "Clear boundaries on who can view and discuss feedback.",
          "Enough context to understand whether the issue is local, recurring, or actionable.",
          "Low friction for managers who want to respond without making employees regret speaking up.",
        ],
      },
      {
        title: "Where Voxr is different",
        paragraphs: [
          "Voxr centers the platform around private workspaces rather than public company-wide exposure by default. That makes the product suitable for honest feedback inside a team, department, or company environment where trust still needs reinforcement.",
          "Because employees can share ideas, praise, concerns, and comments inside the same environment, the platform becomes a practical employee voice system instead of a single-purpose complaint channel.",
        ],
      },
      {
        title: "Best fit use cases",
        paragraphs: [
          "Voxr is a good fit for teams that want a lightweight employee feedback platform without building an oversized HR process around every piece of input.",
          "It is especially relevant when leaders want to improve communication, surface friction, and encourage suggestions while preserving psychological safety.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who owns an employee feedback platform inside a company?",
        answer:
          "Ownership varies. HR, people operations, founders, and team leads can all use it, but the platform works best when response expectations and moderation boundaries are clearly defined.",
      },
      {
        question: "Should all employee feedback be anonymous?",
        answer:
          "Not always. Many teams benefit from a mix of anonymous and non-anonymous channels. Anonymous options matter most when the topic is sensitive or hierarchy distorts candor.",
      },
      {
        question: "Can a feedback platform replace surveys?",
        answer:
          "It can reduce overreliance on surveys, but many teams still use both. Surveys are useful for periodic measurement. Feedback platforms help with ongoing dialogue and real-time issues.",
      },
    ],
    relatedLinks: [
      {
        href: "/features",
        label: "Review Voxr features",
        description: "See the product capabilities that support ongoing employee feedback.",
      },
      {
        href: "/guides/internal-feedback-best-practices",
        label: "Read internal feedback best practices",
        description: "Use practical rules that keep anonymous channels constructive.",
      },
      {
        href: "/glossary/employee-voice",
        label: "Understand employee voice",
        description: "Clarify what teams mean when they talk about employee voice programs.",
      },
    ],
    cta: {
      title: "Build a lighter employee feedback system",
      body:
        "Use Voxr to give each workspace a private, discussion-ready place for employee voice instead of another feedback form that no one revisits.",
      primary: {
        href: "/auth",
        label: "Start with Voxr",
      },
      secondary: {
        href: "/features",
        label: "See core features",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Employee feedback platform", href: "/solutions/employee-feedback-platform" },
    ],
    publishedTime,
  },
  {
    slug: "internal-feedback-tool",
    type: "solution",
    path: "/solutions/internal-feedback-tool",
    title: "Internal Feedback Tool for Teams That Need Faster Signals",
    description:
      "Evaluate what an internal feedback tool should do and how Voxr helps teams collect honest input without relying on exposed channels.",
    eyebrow: "Solution page",
    intro:
      "An internal feedback tool should help teams learn what employees are seeing in the day-to-day reality of work, not just what surfaces in formal meetings.",
    definition:
      "The most useful internal feedback tools reduce the cost of speaking up. They make it easier for employees to share what is working, what is broken, and what could improve.",
    summaryPoints: [
      "Built for private, workspace-based internal feedback.",
      "Useful when teams want quicker signals than quarterly reviews or surveys.",
      "Supports anonymous discussion instead of one-way submissions only.",
      "Helps modern teams capture operational friction and employee ideas in one place.",
    ],
    sections: [
      {
        title: "Why internal feedback tools matter",
        paragraphs: [
          "Most teams have process debt they do not fully see. Workarounds, manager blind spots, unclear ownership, and communication friction often show up first in informal comments, not formal reports.",
          "A dedicated internal feedback tool makes those signals easier to collect. That matters most when a company is growing quickly or moving across teams, locations, or time zones.",
        ],
      },
      {
        title: "What to look for in the tool",
        paragraphs: [
          "The right tool should be simple enough for repeat use, but structured enough that feedback stays readable and actionable. Too little structure produces noise. Too much structure kills honesty.",
        ],
        bullets: [
          "Fast submission for suggestions, blockers, and concerns.",
          "Private visibility controls so feedback is not overexposed.",
          "A discussion layer for clarifying context and next steps.",
          "Forms when the team needs more structured inputs than an open post.",
        ],
      },
      {
        title: "Why Voxr works for modern teams",
        paragraphs: [
          "Voxr keeps feedback inside workspaces so the conversation stays relevant to the members who need to see it. It also supports both open-ended posts and structured forms, which gives teams flexibility without switching tools.",
          "That makes it a practical internal feedback tool for startups, operations-heavy teams, and managers who want a steady feedback loop without building a heavyweight program.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the difference between an internal feedback tool and an employee engagement tool?",
        answer:
          "Engagement tools often focus on measurement dashboards and periodic surveys. An internal feedback tool is more directly about collecting and discussing input from employees.",
      },
      {
        question: "Can teams use an internal feedback tool for ideas as well as problems?",
        answer:
          "Yes. Many of the highest-value submissions are process improvements, product ideas, and observations that would never justify a formal escalation.",
      },
      {
        question: "Does an internal feedback tool need anonymity?",
        answer:
          "Not for every message, but anonymous options are often what make the tool valuable when employees need to raise sensitive issues honestly.",
      },
    ],
    relatedLinks: [
      {
        href: "/solutions/employee-suggestion-box-software",
        label: "Compare with suggestion box software",
        description: "See how modern internal feedback tools go beyond passive suggestion collection.",
      },
      {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Read the workplace trust guide",
        description: "Learn the trust conditions that make internal feedback channels work.",
      },
      {
        href: "/product",
        label: "Explore the product",
        description: "See how Voxr combines feedback posts, forms, and private workspaces.",
      },
    ],
    cta: {
      title: "Give your team a faster way to surface internal signals",
      body:
        "Voxr helps teams collect useful feedback before issues become hidden process debt.",
      primary: {
        href: "/auth",
        label: "Create a workspace",
      },
      secondary: {
        href: "/solutions/employee-feedback-platform",
        label: "See employee feedback use cases",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      { label: "Internal feedback tool", href: "/solutions/internal-feedback-tool" },
    ],
    publishedTime,
  },
  {
    slug: "employee-suggestion-box-software",
    type: "solution",
    path: "/solutions/employee-suggestion-box-software",
    title: "Employee Suggestion Box Software for Modern Teams",
    description:
      "See how employee suggestion box software compares with modern anonymous feedback tools and where Voxr fits for private internal feedback.",
    eyebrow: "Solution page",
    intro:
      "Employee suggestion box software sounds simple, but most teams do not need a digital box that quietly collects ideas. They need a system employees trust and leaders actually revisit.",
    definition:
      "A modern suggestion box should feel alive. It should make it easy to share suggestions, attach context, and keep useful input from disappearing after submission.",
    summaryPoints: [
      "A better fit than a one-way suggestion box for ongoing internal feedback.",
      "Useful for ideas, praise, improvements, and concerns.",
      "Private workspace structure keeps feedback relevant.",
      "Helps teams replace stale inbox-style suggestion systems.",
    ],
    comparison: {
      title: "Suggestion box software vs a modern anonymous feedback platform",
      headers: ["Question", "Suggestion box software", "Voxr"],
      rows: [
        [
          "What gets shared?",
          "Mostly ideas or complaints sent into a one-way inbox.",
          "Ideas, praise, concerns, comments, and structured form responses.",
        ],
        [
          "What happens next?",
          "Leaders review submissions offline, often with weak follow-through.",
          "Feedback stays visible inside the workspace so discussion can continue.",
        ],
        [
          "How does it feel to employees?",
          "Useful, but often passive and distant.",
          "More like an internal feedback loop with a clear place in team communication.",
        ],
      ],
    },
    sections: [
      {
        title: "Why traditional suggestion boxes stall",
        paragraphs: [
          "Suggestion boxes are attractive because they look simple. The problem is that many of them become dead ends. Employees submit ideas with little signal that anyone read them, much less acted on them.",
          "When that happens, the channel stops building trust. It teaches employees that feedback disappears once it enters the box.",
        ],
      },
      {
        title: "What better suggestion box software should do",
        paragraphs: [
          "The better model is a lightweight feedback environment that still protects employees. It should support anonymous posting, discussion, and enough structure to keep follow-up manageable.",
        ],
        bullets: [
          "Keep submission friction low.",
          "Preserve anonymity where candor depends on it.",
          "Support comments or clarification when context matters.",
          "Make the channel feel like part of team operations, not a forgotten archive.",
        ],
      },
      {
        title: "Why teams choose Voxr instead",
        paragraphs: [
          "Voxr works well when a team wants more than a simple digital suggestion box. The product is designed for anonymous internal feedback inside a workspace, which makes it useful for both continuous improvement ideas and more sensitive concerns.",
          "That combination helps teams build a stronger employee voice system without making the channel too formal or exposed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is suggestion box software still useful?",
        answer:
          "Yes, but only if employees trust it and leadership responds consistently. The weak version is a passive inbox. The stronger version is a living internal feedback channel.",
      },
      {
        question: "Should suggestion boxes be anonymous?",
        answer:
          "Often yes. Anonymity lowers the social cost of sharing critical suggestions or concerns, especially in smaller teams or hierarchical environments.",
      },
      {
        question: "Can suggestion box software be used by startups?",
        answer:
          "Yes. Startups often benefit from a lightweight tool because small process problems and interpersonal friction become expensive quickly.",
      },
    ],
    relatedLinks: [
      {
        href: "/resources/employee-feedback-template",
        label: "Use the employee feedback template",
        description: "Structure suggestions so employees know what a good submission looks like.",
      },
      {
        href: "/guides/internal-feedback-best-practices",
        label: "Apply internal feedback best practices",
        description: "Keep the channel constructive and worth using.",
      },
      {
        href: "/glossary/employee-suggestion-box",
        label: "Read the suggestion box glossary page",
        description: "Clarify the differences between suggestion boxes and broader employee voice systems.",
      },
    ],
    cta: {
      title: "Replace the dead suggestion box with a real feedback loop",
      body:
        "Use Voxr when your team needs anonymous suggestions, better follow-through, and a place where internal feedback stays visible enough to matter.",
      primary: {
        href: "/auth",
        label: "Start a workspace",
      },
      secondary: {
        href: "/solutions/anonymous-feedback-software",
        label: "See anonymous feedback software",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/solutions" },
      {
        label: "Employee suggestion box software",
        href: "/solutions/employee-suggestion-box-software",
      },
    ],
    publishedTime,
  },
];

export const guidePages: ContentPageRecord[] = [
  {
    slug: "what-is-anonymous-employee-feedback",
    type: "guide",
    path: "/guides/what-is-anonymous-employee-feedback",
    title: "What Is Anonymous Employee Feedback?",
    description:
      "A practical definition of anonymous employee feedback, why it matters, where it helps, and how Voxr supports it inside private workspaces.",
    eyebrow: "Guide",
    intro:
      "Anonymous employee feedback is input from employees that can be acted on without attaching a visible personal identity to the person who shared it.",
    definition:
      "In practice, anonymous employee feedback exists to protect candor. It gives employees a safer route to share what they actually think when status, politics, or fear of retaliation would otherwise filter the message.",
    summaryPoints: [
      "Useful for concerns, friction, ideas, praise, and process feedback.",
      "Most valuable when hierarchy or team dynamics reduce candor.",
      "Works best when leaders explain how the channel will be used.",
      "Strong systems pair anonymity with clear response norms.",
    ],
    sections: [
      {
        title: "Why anonymous employee feedback exists",
        paragraphs: [
          "Employees do not stay silent because they have no opinions. They stay silent because saying the thing out loud can feel costly. The cost might be social, political, or managerial. In some companies it is enough to stop useful feedback entirely.",
          "Anonymous employee feedback lowers that cost. It gives teams a way to hear what would otherwise remain hidden, especially around trust, communication, role clarity, workload, leadership, and process friction.",
        ],
      },
      {
        title: "What anonymous feedback is not",
        paragraphs: [
          "It is not a substitute for every conversation. Teams still need direct communication, manager one-to-ones, and other channels. Anonymous feedback is a complement for situations where openness is unrealistic or the topic is too sensitive.",
          "It is also not automatically useful just because submissions are anonymous. Trust only improves when employees can see that feedback is taken seriously and handled responsibly.",
        ],
      },
      {
        title: "How Voxr supports anonymous employee feedback",
        paragraphs: [
          "Voxr gives each workspace a private place to collect anonymous internal feedback, ideas, praise, concerns, and comments. That structure helps teams capture candor without turning every sensitive issue into a public company-wide event.",
          "Because the product supports comments and forms as well as feedback posts, teams can use the same environment for day-to-day input and more structured collection moments.",
        ],
      },
    ],
    faqs: [
      {
        question: "When is anonymous employee feedback most useful?",
        answer:
          "It is most useful when employees need to speak honestly about sensitive topics or when a team has enough hierarchy, politics, or fear that people self-censor in public channels.",
      },
      {
        question: "Does anonymous feedback reduce accountability?",
        answer:
          "It can if the channel is poorly managed. Good systems set clear norms, moderation rules, and response expectations so feedback stays constructive.",
      },
      {
        question: "Should companies rely only on anonymous channels?",
        answer:
          "No. Anonymous channels are important, but they work best alongside direct conversations, manager coaching, and other communication systems.",
      },
    ],
    relatedLinks: [
      {
        href: "/solutions/anonymous-feedback-software",
        label: "See anonymous feedback software",
        description: "Move from concept to platform criteria.",
      },
      {
        href: "/guides/how-to-collect-anonymous-employee-feedback",
        label: "Learn how to collect anonymous feedback well",
        description: "Use rollout and moderation practices that protect trust.",
      },
      {
        href: "/glossary/anonymous-feedback",
        label: "Read the anonymous feedback glossary page",
        description: "Get a faster, definition-focused version of the concept.",
      },
    ],
    cta: {
      title: "Make anonymous employee feedback part of real team operations",
      body:
        "Voxr gives modern teams a private place to collect honest employee input without forcing every message into a visible channel.",
      primary: {
        href: "/auth",
        label: "Start with Voxr",
      },
      secondary: {
        href: "/product",
        label: "See the product",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Guides", href: "/guides" },
      { label: "What is anonymous employee feedback", href: "/guides/what-is-anonymous-employee-feedback" },
    ],
    publishedTime,
  },
  {
    slug: "how-to-collect-anonymous-employee-feedback",
    type: "guide",
    path: "/guides/how-to-collect-anonymous-employee-feedback",
    title: "How to Collect Anonymous Employee Feedback Safely",
    description:
      "A practical guide to collecting anonymous employee feedback, setting expectations, and using Voxr to keep the channel safe and useful.",
    eyebrow: "Guide",
    intro:
      "Collecting anonymous employee feedback is not just a tooling problem. The process needs trust, clear boundaries, and visible follow-through, or employees will stop using it.",
    definition:
      "The goal is simple: create a channel employees believe is safe, then prove through action that speaking up is worth the effort.",
    summaryPoints: [
      "Explain the purpose of the channel before you launch it.",
      "Define what types of feedback belong there.",
      "Tell employees who can see posts and how responses will work.",
      "Close the loop consistently so the channel earns repeat usage.",
    ],
    sections: [
      {
        title: "Start with the operating model, not the form",
        paragraphs: [
          "Before you collect a single submission, decide what the channel is for. Is it for broad employee voice, process improvements, sensitive concerns, or all of the above? Employees need a clear answer so they know when to use it.",
          "You also need a response model. Teams lose trust when anonymous feedback enters a system with no owner, no review rhythm, and no expectation of follow-through.",
        ],
        bullets: [
          "Define ownership for moderation and response.",
          "Explain visibility boundaries in plain language.",
          "Set norms for respectful, specific, useful feedback.",
          "Tell employees how often the channel is reviewed.",
        ],
      },
      {
        title: "Collect feedback in a way that feels safe",
        paragraphs: [
          "Safety is both technical and social. Employees need confidence that the product supports anonymity, but they also need evidence that leadership will not use the channel as a trap for identifying critics.",
          "This is why rollout language matters. Avoid overpromising. Be precise about what the tool does, what leaders will see, and how the company will handle patterns or serious concerns.",
        ],
      },
      {
        title: "Close the loop after collection",
        paragraphs: [
          "The fastest way to kill an anonymous feedback channel is to make it feel like a void. If employees never see acknowledgment, clarification, or action, participation drops.",
          "Closing the loop does not mean solving every issue immediately. It means showing that feedback is read, prioritized, and converted into visible next steps whenever possible.",
        ],
      },
    ],
    faqs: [
      {
        question: "How often should a company review anonymous feedback?",
        answer:
          "Often enough that employees believe the channel is alive. The right cadence varies, but most teams need a regular review rhythm and a clear owner.",
      },
      {
        question: "Should employees be allowed to submit anonymous praise as well as concerns?",
        answer:
          "Yes. Anonymous channels become healthier when they capture ideas and praise too, not only problems.",
      },
      {
        question: "What is the main mistake companies make?",
        answer:
          "Launching the channel without clear expectations or without any visible follow-through. The problem is usually operational, not technical.",
      },
    ],
    relatedLinks: [
      {
        href: "/resources/anonymous-feedback-policy-template",
        label: "Use the anonymous feedback policy template",
        description: "Turn your rollout rules into a clear written policy.",
      },
      {
        href: "/guides/internal-feedback-best-practices",
        label: "Review internal feedback best practices",
        description: "Keep the channel constructive after launch.",
      },
      {
        href: "/product",
        label: "See how Voxr supports collection",
        description: "Use workspaces, comments, and forms in one product.",
      },
    ],
    cta: {
      title: "Launch anonymous feedback with clearer operating rules",
      body:
        "Voxr gives teams a private workspace for anonymous feedback so the process can feel safer, lighter, and easier to sustain.",
      primary: {
        href: "/auth",
        label: "Create a workspace",
      },
      secondary: {
        href: "/resources/anonymous-feedback-policy-template",
        label: "Get the policy template",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Guides", href: "/guides" },
      {
        label: "How to collect anonymous employee feedback",
        href: "/guides/how-to-collect-anonymous-employee-feedback",
      },
    ],
    publishedTime,
  },
  {
    slug: "internal-feedback-best-practices",
    type: "guide",
    path: "/guides/internal-feedback-best-practices",
    title: "Internal Feedback Best Practices for Modern Teams",
    description:
      "Use practical internal feedback best practices to keep anonymous employee feedback useful, trusted, and actionable with Voxr.",
    eyebrow: "Guide",
    intro:
      "Internal feedback works when employees trust the channel and leaders treat the signal seriously enough to act on it.",
    definition:
      "The best practices are less about wording and more about operating discipline: clear purpose, visible ownership, useful moderation, and consistent follow-through.",
    summaryPoints: [
      "Keep the channel narrow enough to feel clear, but broad enough to be useful.",
      "Reward specificity, not volume.",
      "Treat moderation as stewardship, not image control.",
      "Show what happened after feedback was raised.",
    ],
    sections: [
      {
        title: "Design the channel around usefulness",
        paragraphs: [
          "Employees are more likely to submit useful feedback when they understand what the channel is for and what a strong submission looks like. A vague prompt invites vague complaints.",
          "Encourage feedback that describes the issue, the impact, and the improvement the employee would like to see. That simple pattern raises quality quickly.",
        ],
      },
      {
        title: "Protect trust while moderating responsibly",
        paragraphs: [
          "Internal feedback channels need moderation, but the goal should be to keep the conversation useful and respectful, not to scrub away criticism. Heavy-handed moderation teaches employees that honesty is unsafe.",
          "State the moderation rules clearly and apply them consistently. Employees should know the line between legitimate critical feedback and unproductive abuse.",
        ],
      },
      {
        title: "Build a response rhythm that people can feel",
        paragraphs: [
          "A feedback channel becomes credible when employees can point to changes, acknowledgments, or follow-up questions that came from it. The response does not need to be perfect. It needs to be visible.",
          "Even a short update such as what was heard, what is being evaluated, and what will happen next can materially improve trust.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the single most important best practice?",
        answer:
          "Visible follow-through. Employees stop using internal feedback channels when they believe nothing happens after submission.",
      },
      {
        question: "Should internal feedback be open to every topic?",
        answer:
          "Not without guidance. Teams should explain which topics belong in the channel and where urgent or highly sensitive issues should go instead.",
      },
      {
        question: "Can managers participate in the discussion?",
        answer:
          "Yes, when it helps clarify context or explain next steps. The tone matters: managers should respond to learn and act, not to defend themselves.",
      },
    ],
    relatedLinks: [
      {
        href: "/resources/manager-response-template-anonymous-feedback",
        label: "Use the manager response template",
        description: "Respond to anonymous feedback without becoming defensive or vague.",
      },
      {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Read the workplace trust guide",
        description: "See the trust conditions that determine whether feedback channels work.",
      },
      {
        href: "/solutions/internal-feedback-tool",
        label: "Explore internal feedback tooling",
        description: "Match the best practices to a product model that supports them.",
      },
    ],
    cta: {
      title: "Put stronger internal feedback habits into practice",
      body:
        "Voxr gives teams a private workspace where clear norms, lightweight moderation, and visible follow-through are easier to maintain.",
      primary: {
        href: "/auth",
        label: "Start with Voxr",
      },
      secondary: {
        href: "/features",
        label: "See product features",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Guides", href: "/guides" },
      { label: "Internal feedback best practices", href: "/guides/internal-feedback-best-practices" },
    ],
    publishedTime,
  },
  {
    slug: "workplace-trust-feedback-guide",
    type: "guide",
    path: "/guides/workplace-trust-feedback-guide",
    title: "Workplace Trust and Feedback: A Practical Guide",
    description:
      "Understand how workplace trust affects employee feedback quality and how Voxr can support safer, more honest internal communication.",
    eyebrow: "Guide",
    intro:
      "Feedback quality is strongly shaped by trust. If employees expect social cost, retaliation, or quiet defensiveness, they will edit themselves long before they speak.",
    definition:
      "Workplace trust in feedback systems means employees believe they can say something true without creating unnecessary personal risk.",
    summaryPoints: [
      "Trust is built through operating behavior, not launch copy.",
      "Employees watch how leaders respond to uncomfortable feedback.",
      "Anonymity helps, but it does not fix a defensive culture by itself.",
      "Private workspace channels can reduce performative communication pressure.",
    ],
    sections: [
      {
        title: "Why trust changes the signal you receive",
        paragraphs: [
          "Low-trust environments produce filtered feedback. Employees share safe opinions, speak in abstractions, or wait until frustration becomes severe. That means leaders receive less useful information and receive it later.",
          "The result is not just poorer communication. It is worse operating insight. Teams miss early warnings that could have been addressed cheaply.",
        ],
      },
      {
        title: "How anonymous channels support trust",
        paragraphs: [
          "Anonymous channels help when the social cost of honesty is still too high. They let employees say the thing that would be hard to say in a public Slack thread, a team standup, or a manager conversation.",
          "That said, anonymity only supports trust if the company uses it responsibly. Employees will notice quickly if the channel exists in name but not in spirit.",
        ],
      },
      {
        title: "Signals that the system is earning trust",
        paragraphs: [
          "You can usually tell a feedback system is working when employees move from vague dissatisfaction to specific, useful observations and ideas. The tone becomes more practical because the channel feels safer.",
          "You also see better leadership behavior: more acknowledgment, less reflexive defense, and more visible action based on what was heard.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can software create workplace trust on its own?",
        answer:
          "No. Software can lower friction and protect anonymity, but trust is created by leadership behavior, response quality, and repeated evidence that speaking up is safe.",
      },
      {
        question: "Why do employees stay silent even when a company says feedback is welcome?",
        answer:
          "Because stated openness and lived experience are different. Employees respond to what has happened before, not just to policy language.",
      },
      {
        question: "What role does anonymity play in trust?",
        answer:
          "Anonymity reduces the personal cost of honesty. It is often the bridge that lets teams hear the truth while broader trust is still being built.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/what-is-anonymous-employee-feedback",
        label: "Understand anonymous employee feedback",
        description: "Connect the trust problem to the channel design.",
      },
      {
        href: "/security",
        label: "Read about Voxr security and privacy",
        description: "See how the product is described for handling internal feedback safely.",
      },
      {
        href: "/glossary/workplace-trust",
        label: "Review the workplace trust glossary page",
        description: "Get a shorter definition-oriented summary of the term.",
      },
    ],
    cta: {
      title: "Create a feedback channel that earns trust over time",
      body:
        "Voxr helps teams give employees a safer route to honest internal feedback inside a private workspace.",
      primary: {
        href: "/auth",
        label: "Create a Voxr workspace",
      },
      secondary: {
        href: "/security",
        label: "Review security and privacy",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Guides", href: "/guides" },
      { label: "Workplace trust and feedback", href: "/guides/workplace-trust-feedback-guide" },
    ],
    publishedTime,
  },
];

export const resourcePages: ContentPageRecord[] = [
  {
    slug: "employee-feedback-template",
    type: "resource",
    path: "/resources/employee-feedback-template",
    title: "Employee Feedback Template for Honest Internal Input",
    description:
      "Use this employee feedback template to collect more useful internal feedback and pair it with Voxr for a private employee feedback workflow.",
    eyebrow: "Template",
    intro:
      "A good employee feedback template should help employees say something specific enough to be actionable without turning the submission into a long form.",
    definition:
      "The strongest template asks for the issue, the impact, and the improvement. That simple structure produces more useful feedback than a blank text box alone.",
    summaryPoints: [
      "Use for ideas, friction, praise, and concerns.",
      "Short enough for repeat use, structured enough for action.",
      "Works well in anonymous channels and structured forms.",
      "Helps managers review feedback without guessing what matters.",
    ],
    sections: [
      {
        title: "Recommended employee feedback template",
        paragraphs: [
          "Use this prompt when you want employees to share feedback that is concise but still useful:",
          "What happened or what pattern are you noticing? Why does it matter? What would improve the situation? Add any context that would help the team understand the issue without revealing private details you do not want to share.",
        ],
        bullets: [
          "What is working well that the team should keep doing?",
          "What is causing friction, confusion, or delay?",
          "What idea or improvement would make the experience better?",
          "What context would help others understand the situation?",
        ],
      },
      {
        title: "When to use a template instead of an open prompt",
        paragraphs: [
          "Templates are useful when teams want feedback quality to improve without adding a heavy review process. They help employees organize their thoughts and make recurring themes easier to identify.",
          "They are especially useful for managers and operations teams that need consistency across many submissions.",
        ],
      },
      {
        title: "How Voxr can support this template",
        paragraphs: [
          "Voxr can be used as the ongoing home for employee feedback and structured forms. Teams can collect open-ended anonymous posts when speed matters and use forms when they want a more guided template flow.",
          "That gives you flexibility without splitting employee feedback across disconnected systems.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should an employee feedback template be anonymous?",
        answer:
          "It depends on the context, but anonymous options are often important when the feedback is critical or sensitive.",
      },
      {
        question: "How long should the template be?",
        answer:
          "Short. The goal is to make the next useful thing easy to say, not to force employees into a long writing exercise.",
      },
      {
        question: "Can the same template be used for praise and problems?",
        answer:
          "Yes. The same structure works for both as long as the prompt leaves room for what is going well and what should change.",
      },
    ],
    relatedLinks: [
      {
        href: "/resources/manager-response-template-anonymous-feedback",
        label: "Pair it with a manager response template",
        description: "Improve both the input and the follow-through.",
      },
      {
        href: "/solutions/employee-feedback-platform",
        label: "See the employee feedback platform page",
        description: "Connect the template to the broader platform decision.",
      },
      {
        href: "/guides/how-to-collect-anonymous-employee-feedback",
        label: "Read the collection guide",
        description: "Use the template inside a trustworthy rollout process.",
      },
    ],
    cta: {
      title: "Turn the template into a repeatable feedback workflow",
      body:
        "Use Voxr to collect employee feedback inside a private workspace and switch between open posts and structured forms when needed.",
      primary: {
        href: "/auth",
        label: "Start with Voxr",
      },
      secondary: {
        href: "/features",
        label: "See forms and feedback features",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources" },
      { label: "Employee feedback template", href: "/resources/employee-feedback-template" },
    ],
    publishedTime,
  },
  {
    slug: "anonymous-feedback-policy-template",
    type: "resource",
    path: "/resources/anonymous-feedback-policy-template",
    title: "Anonymous Feedback Policy Template for Internal Teams",
    description:
      "Use this anonymous feedback policy template to set expectations for employee submissions, moderation, and follow-through with Voxr.",
    eyebrow: "Template",
    intro:
      "An anonymous feedback policy template helps teams explain how the channel works before the first submission appears.",
    definition:
      "The policy should answer four questions clearly: what the channel is for, who can see feedback, how moderation works, and how leaders will respond.",
    summaryPoints: [
      "Clarifies purpose, visibility, moderation, and response expectations.",
      "Helps employees trust the system before they use it.",
      "Useful for startups, HR teams, and operations leads.",
      "Pairs naturally with a private workspace-based feedback tool.",
    ],
    sections: [
      {
        title: "Recommended anonymous feedback policy structure",
        paragraphs: [
          "A practical policy can be short. Start with the channel purpose. Explain that employees can use it for honest internal feedback, concerns, ideas, praise, and comments that may be difficult to raise publicly.",
          "Then define who can view feedback, how the company will moderate unproductive content, and how often the feedback is reviewed.",
        ],
        bullets: [
          "Purpose: why the channel exists and what it is designed to collect.",
          "Visibility: who can access posts and whether access is workspace-specific.",
          "Moderation: what kinds of content may be removed or redirected.",
          "Follow-through: how leaders acknowledge and respond to recurring themes.",
        ],
      },
      {
        title: "What not to promise in the policy",
        paragraphs: [
          "Avoid broad legal or compliance claims unless they are explicitly true. The goal is clarity, not overstatement. Employees trust precise language more than inflated guarantees.",
          "It is better to explain the product and process truthfully than to make sweeping promises that the team cannot consistently honor.",
        ],
      },
      {
        title: "How Voxr fits into the policy",
        paragraphs: [
          "Voxr gives teams a private workspace for anonymous internal feedback, which makes it easier to describe the system clearly. Employees can understand that their feedback stays inside the relevant workspace rather than becoming broadly exposed by default.",
          "That simplicity helps teams write a tighter policy and maintain it over time.",
        ],
      },
    ],
    faqs: [
      {
        question: "Who should own the anonymous feedback policy?",
        answer:
          "Ownership often sits with people operations, HR, founders, or department leadership, but the important part is that someone is clearly accountable for the channel.",
      },
      {
        question: "How detailed should the policy be?",
        answer:
          "Detailed enough to remove ambiguity, but concise enough that employees will actually read it. Most teams benefit from a short, plain-language version.",
      },
      {
        question: "Should the policy mention moderation?",
        answer:
          "Yes. Employees need to know what the rules are and how the company separates useful critical feedback from abusive or irrelevant content.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/how-to-collect-anonymous-employee-feedback",
        label: "Read the anonymous feedback collection guide",
        description: "Use the policy inside a complete rollout plan.",
      },
      {
        href: "/security",
        label: "Review security and privacy details",
        description: "Align the policy language with the product positioning.",
      },
      {
        href: "/resources/employee-feedback-template",
        label: "Pair it with the employee feedback template",
        description: "Set expectations for both the rules and the format of submissions.",
      },
    ],
    cta: {
      title: "Launch anonymous feedback with clearer expectations",
      body:
        "Use Voxr when you want the policy and the product to reinforce the same simple message: employees have a private place to speak honestly.",
      primary: {
        href: "/auth",
        label: "Create a workspace",
      },
      secondary: {
        href: "/security",
        label: "See security and privacy",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources" },
      {
        label: "Anonymous feedback policy template",
        href: "/resources/anonymous-feedback-policy-template",
      },
    ],
    publishedTime,
  },
  {
    slug: "manager-response-template-anonymous-feedback",
    type: "resource",
    path: "/resources/manager-response-template-anonymous-feedback",
    title: "Manager Response Template for Anonymous Feedback",
    description:
      "Use this manager response template to acknowledge anonymous feedback clearly and keep employee trust intact with Voxr.",
    eyebrow: "Template",
    intro:
      "Managers often damage trust by responding too defensively, too vaguely, or too late to anonymous feedback. A response template helps keep the tone grounded and useful.",
    definition:
      "The best manager response has four elements: acknowledgment, understanding of the issue, next step, and realistic timing.",
    summaryPoints: [
      "Helps managers respond without defensiveness.",
      "Useful for ideas, concerns, and process friction.",
      "Supports better follow-through in anonymous channels.",
      "Pairs well with workspace-based feedback discussions.",
    ],
    sections: [
      {
        title: "Recommended response template",
        paragraphs: [
          "A simple manager response can sound like this: Thank you for raising this. We understand the concern and why it matters. We are reviewing the issue with the relevant people. Here is what will happen next, and here is when we expect to share an update.",
          "That structure is enough to show employees the message was heard without overcommitting or slipping into self-protection.",
        ],
        bullets: [
          "Acknowledge the feedback directly.",
          "Reflect the issue back in plain language.",
          "Share the next step or decision path.",
          "Give a realistic timing signal for follow-up.",
        ],
      },
      {
        title: "What weak responses look like",
        paragraphs: [
          "Weak responses usually sound evasive. They focus on intent instead of impact, avoid specificity, or imply that the employee misunderstood the situation.",
          "Even if a manager disagrees with the framing, the first response should still communicate understanding and seriousness before pushing into nuance.",
        ],
      },
      {
        title: "How Voxr helps the response loop",
        paragraphs: [
          "Because Voxr keeps feedback visible inside the workspace, managers and admins can respond in the same environment where the feedback was raised. That makes the loop easier to follow than a private spreadsheet or inbox review process.",
          "The channel stays useful when employees can see that honest input leads to visible acknowledgment and action.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should managers respond to every anonymous post?",
        answer:
          "Not every post needs a long answer, but important feedback should not feel ignored. The right response depth depends on the topic and the action required.",
      },
      {
        question: "Can a manager disagree with anonymous feedback?",
        answer:
          "Yes, but the response should start by acknowledging the concern and clarifying what will be reviewed instead of becoming argumentative.",
      },
      {
        question: "Why use a response template at all?",
        answer:
          "Templates reduce defensive improvisation. They help managers respond consistently under pressure and preserve trust in the channel.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/internal-feedback-best-practices",
        label: "Read internal feedback best practices",
        description: "Use better response patterns as part of the full operating model.",
      },
      {
        href: "/resources/anonymous-feedback-policy-template",
        label: "Review the policy template",
        description: "Align manager responses with the stated rules of the channel.",
      },
      {
        href: "/solutions/employee-feedback-platform",
        label: "See the employee feedback platform page",
        description: "Connect better manager responses to the broader feedback system.",
      },
    ],
    cta: {
      title: "Make follow-through visible enough to build trust",
      body:
        "Voxr helps teams keep anonymous feedback and manager responses in the same private workspace so useful conversations do not disappear.",
      primary: {
        href: "/auth",
        label: "Start with Voxr",
      },
      secondary: {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Read the trust guide",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Resources", href: "/resources" },
      {
        label: "Manager response template",
        href: "/resources/manager-response-template-anonymous-feedback",
      },
    ],
    publishedTime,
  },
];

export const glossaryPages: ContentPageRecord[] = [
  {
    slug: "anonymous-feedback",
    type: "glossary",
    path: "/glossary/anonymous-feedback",
    title: "Anonymous Feedback Definition",
    description:
      "A glossary definition of anonymous feedback, when teams use it, and how Voxr supports anonymous internal feedback inside private workspaces.",
    eyebrow: "Glossary",
    intro:
      "Anonymous feedback is feedback shared without exposing a visible identity to the audience receiving it.",
    definition:
      "Teams use anonymous feedback when honesty depends on reducing the personal risk of speaking up. It is especially common in workplaces where hierarchy or social dynamics suppress candor.",
    summaryPoints: [
      "Used to reduce fear, politics, and social pressure.",
      "Most valuable when paired with clear operating rules.",
      "Can include ideas, concerns, praise, and process observations.",
      "Works best when the audience knows how to respond responsibly.",
    ],
    sections: [
      {
        title: "Why the term matters",
        paragraphs: [
          "Anonymous feedback is often discussed as a product feature, but it is really a trust mechanism. The anonymity matters because it changes what employees feel safe saying.",
          "That is why the most useful questions are not only technical. Teams also need to ask whether the channel will be reviewed seriously, moderated fairly, and used in a way that preserves trust.",
        ],
      },
      {
        title: "Where it is used at work",
        paragraphs: [
          "Companies use anonymous feedback for internal concerns, employee suggestions, ideas for improvement, leadership feedback, and sometimes recognition that employees prefer to share without visibility.",
          "It is especially helpful in smaller teams where a public message can feel unusually exposed.",
        ],
      },
      {
        title: "How Voxr relates to the term",
        paragraphs: [
          "Voxr is centered on anonymous internal company feedback. Employees can share feedback, ideas, praise, concerns, and comments inside a private workspace visible only to members of that workspace.",
          "That structure makes the term concrete rather than abstract: the goal is not anonymous feedback in theory, but anonymous internal feedback that teams can actually use.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is anonymous feedback the same as confidential feedback?",
        answer:
          "Not necessarily. Anonymous means the identity is not visible in the feedback itself. Confidential can mean the identity is known by a limited set of people but not broadly disclosed.",
      },
      {
        question: "Why is anonymous feedback controversial in some teams?",
        answer:
          "Because leaders worry about misuse or low-quality criticism. The answer is not to remove anonymity entirely, but to run the channel with clear norms and follow-through.",
      },
      {
        question: "What makes anonymous feedback useful instead of noisy?",
        answer:
          "Clear purpose, good prompts, fair moderation, and visible action. Without those, even well-intentioned channels degrade.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/what-is-anonymous-employee-feedback",
        label: "Read the full guide",
        description: "Go deeper than the glossary definition.",
      },
      {
        href: "/solutions/anonymous-feedback-software",
        label: "See the software category page",
        description: "Move from concept to product selection criteria.",
      },
      {
        href: "/glossary/employee-voice",
        label: "Read the employee voice glossary page",
        description: "See how anonymous feedback fits into the broader employee voice concept.",
      },
    ],
    cta: {
      title: "Put anonymous feedback into a safer team workflow",
      body:
        "Voxr gives teams a private workspace for anonymous internal feedback that is easier to sustain than a generic inbox or survey tool.",
      primary: {
        href: "/auth",
        label: "Create a workspace",
      },
      secondary: {
        href: "/product",
        label: "See how Voxr works",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Glossary", href: "/glossary" },
      { label: "Anonymous feedback", href: "/glossary/anonymous-feedback" },
    ],
    publishedTime,
  },
  {
    slug: "employee-voice",
    type: "glossary",
    path: "/glossary/employee-voice",
    title: "Employee Voice Definition",
    description:
      "A glossary definition of employee voice, why it matters, and how Voxr supports practical employee voice through anonymous internal feedback.",
    eyebrow: "Glossary",
    intro:
      "Employee voice describes the ways employees can share ideas, concerns, observations, and opinions that influence how work is experienced and improved.",
    definition:
      "In strong companies, employee voice is not just a survey score. It is the repeated ability for employees to say something useful and trust that it has a path to being heard.",
    summaryPoints: [
      "Broader than engagement surveys alone.",
      "Includes suggestions, concerns, praise, and operating insight.",
      "Depends on trust and response quality, not only tooling.",
      "Anonymous channels often play an important supporting role.",
    ],
    sections: [
      {
        title: "Why employee voice matters",
        paragraphs: [
          "Companies make better decisions when employees can share what leaders cannot directly see. That includes everyday process friction, customer-facing pain, team dynamics, and ideas for improvement.",
          "When employee voice is weak, organizations pay for it in silence, delayed problem discovery, and avoidable mistrust.",
        ],
      },
      {
        title: "How anonymous feedback supports employee voice",
        paragraphs: [
          "Not every form of employee voice should be anonymous. But anonymous options are often the route that keeps voice alive when the topic is sensitive or the power dynamics are uneven.",
          "That is why teams looking to improve employee voice often also look for an anonymous internal feedback channel.",
        ],
      },
      {
        title: "How Voxr supports employee voice",
        paragraphs: [
          "Voxr gives each workspace a private place where employees can share honest feedback, ideas, praise, concerns, and comments. That makes the product useful as a lightweight employee voice system for modern teams.",
          "The aim is not a generic communications feed. It is a protected internal environment where useful employee input is easier to surface.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is employee voice the same as employee engagement?",
        answer:
          "No. Engagement is about how people feel. Employee voice is about whether they can express useful input and influence how work improves.",
      },
      {
        question: "Can a company have strong employee voice without anonymity?",
        answer:
          "Sometimes, but many teams still need anonymous options for sensitive topics. Removing anonymity altogether often narrows what employees are willing to say.",
      },
      {
        question: "What is the biggest blocker to employee voice?",
        answer:
          "A lack of trust that speaking up is safe and worthwhile. Tooling matters, but leadership behavior matters more.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Read the workplace trust guide",
        description: "Trust is the condition that determines whether employee voice is real.",
      },
      {
        href: "/solutions/employee-feedback-platform",
        label: "See the employee feedback platform page",
        description: "Understand how the concept maps to product choice.",
      },
      {
        href: "/glossary/anonymous-feedback",
        label: "Read the anonymous feedback glossary page",
        description: "See one of the core mechanisms that supports employee voice.",
      },
    ],
    cta: {
      title: "Give employee voice a private place to live",
      body:
        "Voxr helps modern teams build a lightweight employee voice channel around anonymous internal feedback and actionable discussion.",
      primary: {
        href: "/auth",
        label: "Start with Voxr",
      },
      secondary: {
        href: "/solutions/employee-feedback-platform",
        label: "See the employee feedback platform page",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Glossary", href: "/glossary" },
      { label: "Employee voice", href: "/glossary/employee-voice" },
    ],
    publishedTime,
  },
  {
    slug: "employee-suggestion-box",
    type: "glossary",
    path: "/glossary/employee-suggestion-box",
    title: "Employee Suggestion Box Definition",
    description:
      "A glossary definition of employee suggestion boxes, how they compare to anonymous feedback tools, and where Voxr fits.",
    eyebrow: "Glossary",
    intro:
      "An employee suggestion box is a channel employees use to share ideas or concerns privately, often without expecting a live discussion.",
    definition:
      "The traditional suggestion box is simple but limited. Modern teams often want something closer to an anonymous feedback platform that supports context, discussion, and follow-through.",
    summaryPoints: [
      "Classic format for collecting ideas and concerns.",
      "Useful, but often too passive for modern teams.",
      "Can evolve into a broader anonymous feedback system.",
      "Best when paired with clear ownership and response patterns.",
    ],
    sections: [
      {
        title: "What the suggestion box gets right",
        paragraphs: [
          "The suggestion box lowers the barrier to sharing. Employees do not need a meeting or a manager conversation to raise an issue or idea. That simplicity is still valuable.",
          "It is one reason the concept remains familiar across startups, larger companies, and operations-heavy teams.",
        ],
      },
      {
        title: "Where the classic model falls short",
        paragraphs: [
          "Most suggestion boxes are one-way. Employees send something in, then wait. That makes the channel easy to ignore and hard to trust.",
          "Modern teams often need more than collection. They need a living internal feedback loop where useful themes stay visible long enough to influence action.",
        ],
      },
      {
        title: "Why Voxr is a modern alternative",
        paragraphs: [
          "Voxr is designed for anonymous internal feedback inside workspaces. That makes it more useful than a passive suggestion box when teams want ongoing dialogue, practical ideas, and sensitive concerns in the same product.",
          "It keeps the core benefit of safer input while making follow-through easier to see.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a suggestion box enough for employee voice?",
        answer:
          "Sometimes, but many teams outgrow it quickly. Once you need discussion, visibility, and repeat engagement, a broader feedback system is usually better.",
      },
      {
        question: "Should suggestion boxes be digital?",
        answer:
          "For most modern teams, yes. Digital tools make submission, review, organization, and follow-through more practical.",
      },
      {
        question: "Can a suggestion box handle sensitive concerns?",
        answer:
          "It can, but only if employees trust the system and understand who can access submissions. That is one reason private workspace-based tools are attractive.",
      },
    ],
    relatedLinks: [
      {
        href: "/solutions/employee-suggestion-box-software",
        label: "See the full suggestion box software page",
        description: "Compare the classic model with a modern alternative.",
      },
      {
        href: "/resources/employee-feedback-template",
        label: "Use the employee feedback template",
        description: "Improve the quality of what employees submit.",
      },
      {
        href: "/glossary/anonymous-feedback",
        label: "Read the anonymous feedback glossary page",
        description: "Understand the trust mechanism that powers better suggestion channels.",
      },
    ],
    cta: {
      title: "Move beyond a passive suggestion box",
      body:
        "Voxr helps teams turn safer employee input into a living internal feedback loop inside each workspace.",
      primary: {
        href: "/auth",
        label: "Create a Voxr workspace",
      },
      secondary: {
        href: "/solutions/employee-suggestion-box-software",
        label: "Explore the solution page",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Glossary", href: "/glossary" },
      { label: "Employee suggestion box", href: "/glossary/employee-suggestion-box" },
    ],
    publishedTime,
  },
  {
    slug: "workplace-trust",
    type: "glossary",
    path: "/glossary/workplace-trust",
    title: "Workplace Trust Definition",
    description:
      "A glossary definition of workplace trust in the context of employee feedback and how Voxr supports safer internal communication.",
    eyebrow: "Glossary",
    intro:
      "Workplace trust is the belief that people can communicate honestly, take reasonable interpersonal risk, and expect fair treatment in return.",
    definition:
      "In feedback systems, workplace trust means employees believe they can share something difficult without triggering unnecessary social or political damage.",
    summaryPoints: [
      "Core condition for honest employee feedback.",
      "Shaped by leadership behavior and operating norms.",
      "Supported, but not created, by anonymous tools.",
      "Improves the quality and speed of internal signals.",
    ],
    sections: [
      {
        title: "Why workplace trust matters for feedback",
        paragraphs: [
          "Employees edit themselves when trust is low. They say less, soften the truth, or wait until a problem is impossible to ignore. That reduces the quality of operational insight leaders receive.",
          "High-trust environments still benefit from anonymous channels, but low-trust environments depend on them much more heavily.",
        ],
      },
      {
        title: "How trust is earned",
        paragraphs: [
          "Trust is built through repeated evidence: fair responses, predictable handling of sensitive issues, and visible action based on feedback. It is not built by launch messaging alone.",
          "Employees learn what the system really is by watching what happens after someone speaks up.",
        ],
      },
      {
        title: "How Voxr helps",
        paragraphs: [
          "Voxr gives teams a private workspace for anonymous internal feedback so employees have a safer route to raise issues while trust is still being built.",
          "That does not remove the need for leadership discipline, but it gives companies a better structure for supporting honest communication.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can trust exist without anonymity?",
        answer:
          "Yes, but anonymity is often still useful for sensitive topics. Trust and anonymity are not opposites; they often work together.",
      },
      {
        question: "How do leaders damage workplace trust in feedback systems?",
        answer:
          "By reacting defensively, treating criticism as disloyalty, or letting feedback disappear without visible action.",
      },
      {
        question: "Why is workplace trust relevant to software selection?",
        answer:
          "Because the tool shapes how safe the channel feels. A well-scoped private system can lower the social cost of honesty.",
      },
    ],
    relatedLinks: [
      {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Read the full trust guide",
        description: "Go deeper on how trust shapes feedback quality.",
      },
      {
        href: "/security",
        label: "See security and privacy details",
        description: "Understand how the product is positioned for safer internal feedback.",
      },
      {
        href: "/glossary/employee-voice",
        label: "Read the employee voice definition",
        description: "Connect trust to the broader goal of employee voice.",
      },
    ],
    cta: {
      title: "Support workplace trust with a safer feedback channel",
      body:
        "Voxr helps teams create a private route for honest internal feedback while leaders build the response habits that make trust real.",
      primary: {
        href: "/auth",
        label: "Start with Voxr",
      },
      secondary: {
        href: "/guides/workplace-trust-feedback-guide",
        label: "Read the guide",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Glossary", href: "/glossary" },
      { label: "Workplace trust", href: "/glossary/workplace-trust" },
    ],
    publishedTime,
  },
];

export const allContentPages = [
  ...solutionPages,
  ...guidePages,
  ...resourcePages,
  ...glossaryPages,
];

export const homeCollections = {
  solutions: solutionPages.map(({ path, title, description }) => ({
    href: path,
    label: title,
    description,
  })),
  guides: guidePages.map(({ path, title, description }) => ({
    href: path,
    label: title,
    description,
  })),
  resources: [...resourcePages, ...glossaryPages].map(
    ({ path, title, description }) => ({
      href: path,
      label: title,
      description,
    })
  ),
};

import type { Locale } from "./i18n/config";
import {
  solutionPagesFr,
  guidePagesFr,
  resourcePagesFr,
  glossaryPagesFr,
  allContentPagesFr,
  homeCollectionsFr,
} from "./site-content-fr";

export function getSolutionPages(locale: Locale) {
  return locale === "fr" ? solutionPagesFr : solutionPages;
}
export function getGuidePages(locale: Locale) {
  return locale === "fr" ? guidePagesFr : guidePages;
}
export function getResourcePages(locale: Locale) {
  return locale === "fr" ? resourcePagesFr : resourcePages;
}
export function getGlossaryPages(locale: Locale) {
  return locale === "fr" ? glossaryPagesFr : glossaryPages;
}
export function getAllContentPages(locale: Locale) {
  return locale === "fr" ? allContentPagesFr : allContentPages;
}
export function getHomeCollections(locale: Locale) {
  return locale === "fr" ? homeCollectionsFr : homeCollections;
}

export const staticPublicPages = [
  {
    path: "/",
    priority: 1,
  },
  {
    path: "/product",
    priority: 0.9,
  },
  {
    path: "/features",
    priority: 0.85,
  },
  {
    path: "/security",
    priority: 0.8,
  },
  {
    path: "/solutions",
    priority: 0.8,
  },
  {
    path: "/guides",
    priority: 0.78,
  },
  {
    path: "/resources",
    priority: 0.76,
  },
  {
    path: "/glossary",
    priority: 0.7,
  },
];
