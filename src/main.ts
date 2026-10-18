import "./style.css";
import { profile, projects, papers, experience, calligraphy } from "./content";
import everpureLogo from "./icons/everpure.svg?raw";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const link = (href: string | undefined, text: string) =>
  href
    ? `<a href="${esc(href)}" class="underline decoration-neutral-400 underline-offset-4 hover:decoration-current">${esc(text)}</a>`
    : esc(text);

// Inline markup for prose: **bold**, and {everpure} for the logo icon.
const rich = (s: string) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold whitespace-nowrap text-neutral-900">$1</strong>')
    .replace(
      /\{everpure\}/g,
      `<span class="mr-1 inline-block h-[1em] align-[-0.125em] [&>svg]:h-full [&>svg]:w-auto" aria-hidden="true">${everpureLogo}</span>`,
    );

const section = (id: string, title: string, body: string) => `
  <section id="${id}" class="scroll-mt-16">
    <h2 class="mb-6 text-sm font-medium uppercase tracking-widest text-neutral-500">${title}</h2>
    ${body}
  </section>`;

const row = (left: string, right: string) => `
  <li class="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-6">
    <span class="whitespace-nowrap text-sm tabular-nums text-neutral-500">${left}</span>
    <div>${right}</div>
  </li>`;

// Outline icons (Lucide shapes) drawn in currentColor so they follow link hover.
const navIcons: Record<string, string> = {
  about: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  projects:
    '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  research:
    '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
  experience:
    '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
};

const nav = ["about", "projects", "research", "experience"]
  .map(
    (id) =>
      `<a href="#${id}" class="inline-flex items-center gap-1.5 hover:text-moss-dark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-[0.95em] w-[0.95em]" aria-hidden="true">${navIcons[id]}</svg>${id}</a>`,
  )
  .join("");

const about = `
  <div class="space-y-4 leading-relaxed">
    ${profile.about.map((p) => `<p>${rich(p)}</p>`).join("")}
  </div>
  <div class="mt-6 grid gap-6 sm:grid-cols-2">
    ${profile.interests
      .map(
        (g) => `
      <div>
        <p class="font-medium text-neutral-900">${esc(g.label)}</p>
        <ul class="mt-2 list-disc space-y-1 pl-5 leading-relaxed marker:text-moss">
          ${g.items
            .map((i: string | { text: string; sub: string[] }) =>
              typeof i === "string"
                ? `<li>${rich(i)}</li>`
                : `<li>${rich(i.text)}
                    <ul class="mt-1 list-[circle] space-y-1 pl-5 text-neutral-600">
                      ${i.sub.map((x) => `<li>${rich(x)}</li>`).join("")}
                    </ul>
                  </li>`,
            )
            .join("")}
        </ul>
      </div>`,
      )
      .join("")}
  </div>
  <p class="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
    ${profile.links.map((l) => link(l.href, l.label)).join("")}
    ${link(`mailto:${profile.email}`, "Email")}
  </p>`;

const bracketLink = (href: string | undefined, text: string) =>
  href
    ? `<span><span class="text-neutral-400">[</span><a href="${esc(href)}" class="text-sky-700 hover:underline">${text}</a><span class="text-neutral-400">]</span></span>`
    : "";

// Shared card for projects and papers: thumbnail on the left, details on the right.
const card = (c: {
  title: string;
  image?: string;
  authors?: string;
  meta?: string;
  links: { label: string; href?: string }[];
  summary?: string;
}) => `
  <li class="grid gap-5 sm:grid-cols-[16rem_1fr] sm:items-center sm:gap-8">
    ${
      c.image
        ? `<a href="${esc(c.links[0]?.href ?? c.image)}" class="block overflow-hidden rounded-lg border border-neutral-300 bg-white">
            <img src="${esc(c.image)}" alt="" loading="lazy" class="w-full">
          </a>`
        : "<div></div>"
    }
    <div>
      <h3 class="font-serif text-lg leading-snug text-neutral-900">${esc(c.title)}</h3>
      ${c.authors ? `<p class="mt-1 text-sm">${rich(c.authors)}</p>` : ""}
      ${c.meta ? `<p class="mt-1 text-sm italic text-neutral-500">${esc(c.meta)}</p>` : ""}
      ${
        c.links.some((l) => l.href)
          ? `<p class="mt-2 flex gap-4 text-sm">${c.links.map((l) => bracketLink(l.href, l.label)).join("")}</p>`
          : ""
      }
      ${c.summary ? `<p class="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">${esc(c.summary)}</p>` : ""}
    </div>
  </li>`;

const paper = (p: (typeof papers)[number]) =>
  card({
    title: p.title,
    image: p.image,
    authors: p.authors,
    meta: p.venue,
    links: [
      { label: "paper", href: p.href },
      { label: "code", href: p.code },
    ],
    summary: p.summary,
  });

const projectList = `
  <ul class="space-y-10">
    ${projects
      .map((p) =>
        card({
          title: p.name,
          image: p.image,
          authors: p.authors,
          meta: p.tags.join(" · "),
          links: p.links ?? [],
          summary: p.description,
        }),
      )
      .join("")}
  </ul>`;

const paperYears = [...new Set(papers.map((p) => p.year))].sort((a, b) => b - a);

const paperList = `
  <div class="space-y-12">
    ${paperYears
      .map(
        (y) => `
      <div>
        <div class="mb-6 flex items-center gap-4">
          <span class="text-xl tabular-nums text-neutral-500">${y}</span>
          <span class="h-px flex-1 bg-neutral-300"></span>
        </div>
        <ul class="space-y-10">
          ${papers.filter((p) => p.year === y).map(paper).join("")}
        </ul>
      </div>`,
      )
      .join("")}
  </div>`;

const jobList = `
  <ul class="space-y-6">
    ${experience
      .map((j) =>
        row(
          esc(j.period),
          `<h3 class="font-medium text-neutral-900">${
             j.icon
               ? `<span class="mr-2 inline-block h-[1em] align-[-0.125em] [&>svg]:h-full [&>svg]:w-auto" aria-hidden="true">${j.icon}</span>`
               : ""
           }${esc(j.org)}</h3>
           <p class="text-sm text-neutral-500">${esc(j.role)}</p>
           <p class="mt-1 text-sm leading-relaxed">${esc(j.summary)}</p>`,
        ),
      )
      .join("")}
  </ul>`;

const calligraphyMark = (side: "left" | "right") => `
  <div class="calligraphy calligraphy-${side}">
    <span class="calligraphy-glyph">${esc(calligraphy[side].text)}</span>
    <p class="calligraphy-note">${rich(calligraphy[side].note)}</p>
  </div>`;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  ${calligraphyMark("left")}
  ${calligraphyMark("right")}
  <div class="mx-auto max-w-[49rem] px-6 py-16 sm:py-24">
    <header class="mb-16">
      <h1 class="text-3xl font-medium tracking-tight text-neutral-950">${esc(profile.name)}</h1>
      <p class="mt-1 text-lg text-neutral-500">${esc(profile.tagline)}</p>
      <nav class="mt-6 flex gap-5 text-base font-medium text-moss">${nav}</nav>
    </header>
    <main class="space-y-16">
      ${section("about", "About", about)}
      ${section("projects", "Projects", projectList)}
      ${section("research", "Research", paperList)}
      ${section("experience", "Experience", jobList)}
    </main>
  </div>`;
