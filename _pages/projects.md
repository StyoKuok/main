---
layout: page
title: projects
permalink: /projects/
description: Technical project reports with videos, code, and reproducible resources.
nav: true
nav_order: 2
---

{% assign sorted_projects = site.projects | sort: "importance" %}

<div class="portfolio-filter" role="group" aria-label="Filter projects">
  <button type="button" class="active" data-project-filter="all" aria-pressed="true">All</button>
  <button type="button" data-project-filter="embodied-robotics" aria-pressed="false">Embodied AI & Robotics</button>
  <button type="button" data-project-filter="modeling" aria-pressed="false">Modeling & Optimization</button>
</div>

<div class="projects">
{% for project in sorted_projects %}
<div data-project-group="{{ project.category }}">
{% include projects.liquid %}
</div>
{% endfor %}
</div>

<style>
  .portfolio-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    margin: 0 0 1.5rem;
  }
  .portfolio-filter button {
    border: 1px solid var(--global-divider-color);
    border-radius: 0;
    background: var(--global-bg-color);
    color: var(--global-text-color);
    min-height: 2.4rem;
    padding: 0.45rem 0.85rem;
  }
  .portfolio-filter button:first-child {
    border-radius: 6px 0 0 6px;
  }
  .portfolio-filter button:last-child {
    border-radius: 0 6px 6px 0;
  }
  .portfolio-filter button + button {
    margin-left: -1px;
  }
  .portfolio-filter button.active {
    background: var(--global-theme-color);
    border-color: var(--global-theme-color);
    color: var(--global-bg-color);
  }
  @media (max-width: 600px) {
    .portfolio-filter {
      display: grid;
      grid-template-columns: 1fr;
    }
    .portfolio-filter button,
    .portfolio-filter button:first-child,
    .portfolio-filter button:last-child {
      border-radius: 0;
      width: 100%;
    }
    .portfolio-filter button:first-child {
      border-radius: 6px 6px 0 0;
    }
    .portfolio-filter button:last-child {
      border-radius: 0 0 6px 6px;
    }
    .portfolio-filter button + button {
      margin-left: 0;
      margin-top: -1px;
    }
  }
</style>

<script>
  document.querySelectorAll("[data-project-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.projectFilter;
      document.querySelectorAll("[data-project-filter]").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      document.querySelectorAll("[data-project-group]").forEach((group) => {
        group.hidden = filter !== "all" && group.dataset.projectGroup !== filter;
      });
    });
  });
</script>
