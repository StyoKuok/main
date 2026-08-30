---
layout: page
permalink: /publications/
title: publications
description: Publications grouped by research direction.
nav: true
nav_order: 1
---

<div class="portfolio-filter" role="group" aria-label="Filter publications">
  <button type="button" class="active" data-publication-filter="all" aria-pressed="true">All</button>
  <button type="button" data-publication-filter="embodied" aria-pressed="false">3D & Embodied AI</button>
  <button type="button" data-publication-filter="inference" aria-pressed="false">Statistical & Mathematical Inference</button>
</div>

<section data-publication-group="embodied">
<h2 id="embodied">3D & Embodied AI</h2>

{% bibliography --query @*[keywords~=embodied] %}

</section>

<section data-publication-group="inference">
<h2 id="inference">Statistical & Mathematical Inference</h2>

{% bibliography --query @inproceedings[keywords~=inference] %}

{% bibliography --query @unpublished[keywords~=inference] %}

</section>

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
  document.querySelectorAll("[data-publication-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.publicationFilter;
      document.querySelectorAll("[data-publication-filter]").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      document.querySelectorAll("[data-publication-group]").forEach((group) => {
        group.hidden = filter !== "all" && group.dataset.publicationGroup !== filter;
      });
    });
  });
</script>
