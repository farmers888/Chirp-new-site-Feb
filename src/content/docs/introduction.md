---
title: Introduction
excerpt: Overview of Prime UI, how the content system works, and where to start.
---

## What Prime UI includes

Prime UI is a Next.js project that ships with a content-driven website out of the box:

- Marketing pages and app routes
- Blog, docs, changelog, and legal pages powered by Markdown/MDX
- A small set of MDX components (cards, grids, steps, tabs, and more) to keep pages consistent

## Start here

If you are new to the repo, follow the first two guides in order. If you are editing content, jump straight to the content authoring section.

<Grid countColumns={2}>
  <Card
    title="Installation"
    description="Install dependencies, run the dev server, and verify everything works locally."
    linkUrl="/docs/installation"
    linkText="Read installation"
    number={1}
  />
  <Card
    title="Configuration"
    description="Learn where settings live and how to customize the site structure and content."
    linkUrl="/docs/configuration"
    linkText="Read configuration"
    number={2}
  />
  <Card
    title="Content authoring"
    description="Where docs/blog/changelog/legal files live and how to edit them safely."
    linkUrl="/docs/content"
    linkText="Explore content"
    number={3}
  />
  <Card
    title="MDX components"
    description="Use cards, tabs, steps, and admonitions in a consistent way across docs."
    linkUrl="/docs/content/mdx-components"
    linkText="See components"
    number={4}
  />
</Grid>

## How the docs are organized

Documentation is intentionally split into small pages. Each section has an index page that explains what the section is for and links to the most important sub-pages.

This keeps each doc focused on one job: explain a concept, show an example, and point you to the next best place to read.

## Editing workflow

Most docs changes are just editing Markdown. When you add a new page, keep the slug stable and update `meta.json` only when you want explicit ordering in the sidebar.

<Steps>
  <Step title="Edit an existing page">
    Open a `.md` file under `src/content/docs`, update the content, and refresh the docs route to verify rendering.
  </Step>
  <Step title="Add a new page">
    Create a new `.md` file (or a folder with an `index.md`) and add a short `title` and `excerpt` in frontmatter.
  </Step>
  <Step title="Update the sidebar">
    If the page should appear in a specific order, update the nearest `meta.json` file for that folder.
  </Step>
</Steps>

## Conventions

To keep the documentation consistent and easy to scan, follow a few simple conventions across pages.

- Keep pages focused on one topic
- Use `##` headings to break up long sections
- Add a short paragraph before code blocks, components, and lists
- Prefer shared MDX components (Cards, Steps, Tabs) over one-off formatting

:::note

This documentation is MDX. Use `##` and deeper headings in content files (the page title is rendered automatically).

:::
