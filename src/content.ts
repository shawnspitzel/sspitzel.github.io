// All site content lives here. Edit this file to update the website.
// Everything in [brackets] is a placeholder: replace it with real details.

import hqgLogo from "./icons/hqg-logo.svg?raw";
import everpureLogo from "./icons/everpure.svg?raw";
import mindsLogo from "./icons/minds-logo.svg?raw";

export type Link = { label: string; href: string };

export type Project = {
  name: string;
  description: string;
  tags: string[];
  authors?: string; // wrap your own name in **bold**
  image?: string; // thumbnail, served from public/
  links?: Link[];
};

export type Paper = {
  title: string;
  authors: string; // wrap your own name in **bold**
  venue: string;
  year: number;
  image?: string; // thumbnail, served from public/
  summary?: string;
  href?: string;
  code?: string;
};

export type Job = {
  role: string;
  org: string;
  icon?: string; // inline SVG markup for the small logo shown before the org name
  period: string; // e.g. "Spring '26 – Present"
  summary: string;
};

export const profile = {
  name: "shawn spitzel",
  tagline: "prev swe intern @ everpure",
  email: "shawnspitzel@gmail.com",
  about: [
  "fourth-year cs + math student at the university of connecticut, interested in systems & virtualization.",
"previously interned at **everpure** {everpure}on the modern virtualization org (kubernetes, go). currently apart of the **minds** (machine intelligence & data science) lab, researching graph foundational model safety.",
  ],
  interests: [
    {
      label: "technical interests",
      items: [
        { text: "high performance computing", sub: ["parallel comp, optimization"] },
        // "programming languages & compilers",
        { text: "operating systems", sub: ["virtualization, security"] },
        "lllms & agentic frameworks",
                
       "database systems" 
      ],
    },
    {
      label: "non-technical interests",
      items: ["music theory & production", "basketball", "art & animation" ],
    },
  ],
  links: [
    { label: "GitHub", href: "#" },
    { label: "LinkedIn", href: "#" },

  ] satisfies Link[],
};

export const projects: Project[] = [
   {
    name: "Husky Quantitative Group",
    description:
      "Engineering lead for UConn's student-run systematic equities fund. Built a backtesting engine 13x faster than QuantConnect's and the AWS platform behind it.",
    tags: ["Python", "C++", "Docker", "AWS"],
    image: "projects/hqg.png",
    links: [
      { label: "site", href: "https://uconnquant.com/" },
      { label: "code", href: "https://github.com/Husky-Quantitative-Group" },
    ],
  },
 {
    name: "CodeShuffler 2.0",
    description:
      "Turns code into shuffled, paper-based exam questions with partial-credit scoring and multi-version exams. Published at ASEE 2026.",
    tags: ["Python", "PyQt"],
    image: "papers/codeshuffler.png",
    links: [
      { label: "paper", href: "https://nemo.asee.org/public/conferences/374/papers/50733/view" },
      { label: "code", href: "https://github.com/hasanbaig/CodeShuffler" },
    ],
  },

  {
    name: "TriALL: Hierarchical Memory System for Agents",
    description:
      "A self-learning L1/L2/L3 memory hierarchy for LLM context that treats cache misses as training signal. 2.1x context scaling over sliding window at 91% reconstruction fidelity.",
    tags: ["Python", "PyTorch"],
    image: "projects/semantic-forgetfulness.svg",
    links: [{ label: "code", href: "https://github.com/shawnspitzel/semantic-forgetfulness" }],
  },
  {
    name: "Winsynth",
    description:
      "A real-time audio synthesizer written from scratch in C++20 using only Win32 calls, with an ImGui + Direct3D interface you play from the keyboard.",
    tags: ["C++20", "Win32", "Direct3D"],
    image: "projects/winsynth.svg",
    links: [{ label: "code", href: "https://github.com/shawnspitzel/winsynth" }],
  },
];

export const papers: Paper[] = [
  {
    title: "On the Safety of Graph Representation Learning",
    authors:
      "Xiaoguang Guo, Zehong Wang, Ziming Li, **Shawn Spitzel**, Soonwoo Kwon, Tianyi Ma, Yanfang Ye, Chuxu Zhang",
    venue: "International Conference on Learning Representations (ICLR), 2027 · under review",
    year: 2026,
    image: "papers/grl-safety.png",
    summary:
      "A benchmark testing twelve graph learning methods, from DeepWalk to graph foundation models, across five safety axes. No model is safest across the board.",
    href: "https://arxiv.org/abs/2605.06576",
    code: "https://github.com/GXG-CS/GRL-Safety",
  },
  {
    title: "Generalizing GNNs with Tokenized Mixture of Experts",
    authors:
      "Xiaoguang Guo, Zehong Wang, Jiazheng Li, **Shawn Spitzel**, Qi Yang, Kaize Ding, Jundong Li, Chuxu Zhang",
    venue: "ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD), 2026",
    year: 2026,
    image: "papers/stem-gnn.png",
    summary:
      "A frozen GNN can't be accurate, shift-robust, and stable all at once. STEM-GNN routes inputs through tokenized experts to better balance all three.",
    href: "https://arxiv.org/abs/2602.09258",
    code: "https://github.com/GXG-CS/STEM-GNN",
  },
];

export const experience: Job[] = [
  {
    role: "Engineering Lead",
    org: "Husky Quantitative Group",
    icon: hqgLogo,
    period: "Spring 2026 – Present",
    summary:
      "Lead engineering for a 12-student systematic equities fund running a $50k+ long/short portfolio. Built our backtesting engine and a Redis-backed job scheduler on pre-warmed Docker containers.",
  },
   {
    role: "Software Engineer Intern",
    org: "Everpure (f.k.a Pure Storage)",
    icon: everpureLogo,
    period: "Summer 2026",
    summary:
      "Shipped pike, a go controller that surfaces flasharray alerts as kubernetes events on the affected pods, and extended purity//fa's c++ alert suite with low-capacity and qos-throttling detection.",
  },
 {
    role: "Undergraduate Research Assistant",
    org: "MINDs (Machine Intelligence and Data Science) Lab",
    icon: mindsLogo,
    period: "Fall 2026 – Present",
    summary:
      "Co-authored two papers on GNN safety and graph foundation models (KDD '26, ICLR '27 under review). Built a tokenized mixture-of-experts GNN encoder in PyTorch and cut output variance 14% with Lipschitz-regularized heads.",
  },

];

// Calligraphy down either side of the page, with the note shown on hover.
export const calligraphy = {
  left: { text: "李霞", pinyin: "lǐ xiá", note: "my girlfriend's name" },
  right: { text: "肖恩", pinyin: "xiào ēn", note: "my name — shawn, written in chinese" },
};
