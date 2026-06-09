export type Phase = "ignition" | "ascent" | "separation" | "orbit" | "deploy";

export const PHASES: { id: Phase; label: string; code: string }[] = [
  { id: "ignition", label: "Ignition", code: "T-00:10" },
  { id: "ascent", label: "Ascent", code: "T+00:30" },
  { id: "separation", label: "Stage Sep", code: "T+02:15" },
  { id: "orbit", label: "Orbital Insertion", code: "T+08:42" },
  { id: "deploy", label: "Payload Deploy", code: "T+12:00" },
];

export const SKILL_BOOSTERS = [
  {
    id: "auth",
    name: "Auth Booster",
    color: "#00D4FF",
    techs: ["OAuth2", "OpenID Connect", "RBAC", "MFA", "JWT", "SSO"],
    blurb: "Identity & access control engineered for zero-trust environments.",
  },
  {
    id: "payments",
    name: "Payments Booster",
    color: "#FF4B00",
    techs: ["Stripe", "Braintree", "Subscriptions", "Invoicing", "PCI-DSS"],
    blurb: "Revenue infrastructure with idempotency and reconciliation built in.",
  },
  {
    id: "api",
    name: "API Booster",
    color: "#00FFB2",
    techs: ["REST", "GraphQL", "gRPC", "Webhooks", "OpenAPI"],
    blurb: "Versioned, observable contracts that scale with your product.",
  },
  {
    id: "data",
    name: "Data Booster",
    color: "#B400FF",
    techs: ["PostgreSQL", "Redis", "MongoDB", "Data Lake", "Kafka"],
    blurb: "Storage, caching, and pipelines tuned for billions of rows.",
  },
  {
    id: "infra",
    name: "Infra Booster",
    color: "#FFB800",
    techs: ["Kubernetes", "Docker", "AWS", "GCP", "CI/CD", "Terraform"],
    blurb: "Self-healing deployments with infrastructure as code.",
  },
];

export const PROJECTS = [
  {
    id: "dgnus",
    name: "DGNUS Commerce",
    type: "LLC Commerce Platform",
    metric: "Live · dgnus.com",
    stack: ["Go", "Stripe", "M-Pesa", "Resend", "API Gateway", "React", "Strapi CMS"],
    blurb:
      "Full-stack commerce system for a business LLC: Go backend orchestrating international Stripe payments and M-Pesa mobile money, transactional email via Resend, and a unified API gateway feeding a React storefront powered by a Strapi CMS.",
    color: "#00FFB2",
    url: "https://dgnus.com",
  },
  {
id: "dfi",
name: "Dida Foundation International",
type: "501(c)(3) Nonprofit Platform",
metric: "Live · dfi-us.org",
stack: [
"Next.js",
"TypeScript",
"React",
"Tailwind CSS",
"Node.js",
"MySQL",
"Linux",
"Nginx",
"VPS Infrastructure",
],
blurb:
"Mission-driven nonprofit platform supporting Islamic education, faith-based research, holistic wellness, and youth leadership. Designed and deployed a multilingual web ecosystem featuring program management, donation workflows, educational content delivery, and scalable backend infrastructure hosted on Linux VPS environments.",
color: "#DC2626",
url: "https://dfi-us.org",
},
];
