---
layout: page
permalink: /publications/
title: publications
description: Publications are grouped by research direction. Click any demo preview to enlarge it.
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

{% capture embodied_entries %}{% bibliography --query @*[keywords~=embodied] %}{% endcapture %}
{% capture res_dyn_project_link %}<a href="https://styokuok.github.io/res_dyn/" class="btn btn-sm z-depth-0" role="button">Project page</a>{% endcapture %}
{% capture res_dyn_links %}{{ res_dyn_project_link }} <a href="https://styokuok.github.io/res_dyn/report/#page=1" class="btn btn-sm z-depth-0" role="button">Report</a>{% endcapture %}
{% capture vis_phys_project_link %}<a href="https://styokuok.github.io/vis_phys/" class="btn btn-sm z-depth-0" role="button">Project page</a>{% endcapture %}
{% capture vis_phys_links %}{{ vis_phys_project_link }} <a href="https://styokuok.github.io/vis_phys/report/#page=1" class="btn btn-sm z-depth-0" role="button">Report</a>{% endcapture %}
{{ embodied_entries | replace: '>Website</a>', '>Project page</a>' | replace: '<a class="abstract btn btn-sm z-depth-0" role="button">Abs</a>', '' | replace: res_dyn_project_link, res_dyn_links | replace: vis_phys_project_link, vis_phys_links }}

</section>

<section data-publication-group="inference">
<h2 id="inference">Statistical & Mathematical Inference</h2>

{% bibliography --query @inproceedings[keywords~=inference] %}

{% bibliography --query @unpublished[keywords~=inference] %}

</section>

<style>
  [data-publication-group] ol.bibliography { list-style: none; padding-left: 0; }
  [data-publication-group] .links .btn { font-size: 1rem; padding: 0.4rem 0.7rem; line-height: 1.35; margin-top: 0.35rem; }

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
