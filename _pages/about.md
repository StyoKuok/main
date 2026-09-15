---
layout: about
title: about
permalink: /
subtitle: Embodied systems and spatial intelligence, with a focus on learned state representations, world modeling, and planning.
profile:
  align: left
  image: zhenghe-guo.jpg
  image_circular: false
  more_info: >
    <p>Zhejiang University · Hangzhou, China</p>
selected_papers: false
social: true
announcements:
  enabled: false
latest_posts:
  enabled: false
---

I am a final-year undergraduate at [Zhejiang University](https://www.zju.edu.cn/) and currently a research intern at [Inception3D](http://www.inception3d.fun/), led by [Prof. Anpei Chen](https://www.westlake.edu.cn/faculty/anpei-chen.html). I build physical systems that sense, reconstruct, and act under incomplete observations.

My primary research interest is learning representations and world models for physical agents. I am especially interested in mathematical representations that capture fluids and deformable objects, where geometry alone is not enough to describe how a scene will evolve.

Fluids and deformable objects are a demanding testbed for this question, not its boundary. My current projects also span capture-anchored 3D reconstruction, stereo hand-object perception, robot localization, and model-based control. I am interested in extending the same representation questions to generalist visuomotor and vision-language-action policies. See the [Research Statement]({{ '/research/' | relative_url }}) for details.

<div class="profile-links">
<a href="#publications">Publications</a> · <a href="#projects">Projects</a> · <a href="#education">Education</a> · <a href="#awards">Awards</a> · <a href="https://scholar.google.com/citations?user=aaaoBoEAAAAJ&hl=en">Google Scholar</a> · <a href="https://www.researchgate.net/profile/Zhenghe-Guo-2324807179/">ResearchGate</a> · <a href="https://www.linkedin.com/in/zhenghe-guo-318948378/">LinkedIn</a> · <a href="{{ '/assets/pdf/Zhenghe_Guo_CV.pdf' | relative_url }}">CV</a> · <a href="{{ '/research/' | relative_url }}">Research Statement</a>
</div>

<style>
.profile.float-left{width:22%;max-width:165px;min-width:130px;margin-right:1.4rem}.profile .more-info{font-size:.78rem;line-height:1.35}.profile-links{clear:both;padding-top:.75rem;line-height:1.8}
.home-entry{display:grid;grid-template-columns:minmax(190px,28%) 1fr;gap:1.35rem;padding:1.15rem 0;border-bottom:1px solid var(--global-divider-color);align-items:center}
.home-entry video,.home-entry img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:6px;background:#111}
.home-entry h3{font-size:1.05rem;margin:0 0 .35rem}.home-entry p{font-size:.92rem;line-height:1.55;margin:.3rem 0}
.entry-links a{font-size:.85rem;font-weight:600;margin-right:.75rem}.tagline{font-size:.78rem;color:var(--global-text-color-light);font-weight:600;text-transform:uppercase}
.section-heading{display:flex;align-items:baseline;justify-content:space-between;gap:1rem;margin-top:2rem;border-bottom:1px solid var(--global-divider-color)}.section-heading h2{margin:0;padding:0 0 .35rem;border:0}.section-heading a{font-size:.86rem;font-weight:600;white-space:nowrap}
.institution-list{display:grid;grid-template-columns:1fr 1fr;gap:1rem}.institution{display:grid;grid-template-columns:52px 1fr;gap:.75rem;align-items:center;border-left:3px solid var(--global-theme-color);padding:.35rem .8rem}.institution img{width:48px;height:48px;object-fit:contain}.institution span,.institution small{display:block}
@media(max-width:600px){.profile.float-left{width:32%;min-width:110px;max-width:130px;margin-right:1rem}.home-entry{grid-template-columns:1fr}.institution-list{grid-template-columns:1fr}}
</style>

<div class="section-heading"><h2 id="publications">Selected Publications</h2><a href="{{ '/publications/' | relative_url }}">View all</a></div>

<div class="home-entry">
<video autoplay loop muted playsinline poster="{{ '/assets/img/publication_preview/objecttwin-office2-poster.jpg' | relative_url }}"><source src="{{ '/assets/media/projects/objecttwin-office2.mp4' | relative_url }}" type="video/mp4"></video>
<div><div class="tagline">3D reconstruction · digital twins</div><h3>ObjectTwin: Measuring the Asset Correspondence Gap for Capture-Anchored Digital Twins</h3><p><strong>Zhenghe Guo</strong></p><p>Instance-level reconstruction from RGB-D captures, connecting segmentation, VLM filtering, generative asset completion, scan-guided composition, and pose refinement. The work evaluates when a visually convincing asset remains geometrically mismatched to its captured object.</p><div class="entry-links"><a href="https://styokuok.github.io/sim_ready/">Project</a><a href="{{ '/publications/#embodied' | relative_url }}">Abstract</a></div></div>
</div>

<div class="home-entry">
<img src="{{ '/assets/img/publication_preview/isac-paper-figure.png' | relative_url }}" alt="UAV-assisted ISAC system from the paper">
<div><div class="tagline">ISAC · optimization</div><h3>Rate Maximization for UAV-assisted ISAC System with Fluid Antennas</h3><p>X. Yang, <strong>Z. Guo</strong>, S. Liang, Z. Yang, C. Zhu, Z. Zhang · IEEE/CIC ICCC Workshops 2025</p><p>Joint optimization of UAV placement and fluid-antenna configuration for an integrated sensing and communication link, formulated to improve achievable rate under coupled sensing and communication constraints.</p><div class="entry-links"><a href="https://doi.org/10.1109/ICCCWorkshops67136.2025.11148178">Paper</a><a href="{{ '/publications/#inference' | relative_url }}">Abstract</a></div></div>
</div>

<div class="section-heading"><h2 id="projects">Featured Projects</h2><a href="{{ '/projects/' | relative_url }}">View all</a></div>

<div class="home-entry">
<video autoplay loop muted playsinline><source src="{{ '/assets/media/projects/robocup-web.mp4' | relative_url }}" type="video/mp4"></video>
<div><div class="tagline">Humanoid robotics · vision</div><h3>ZJUDancer RoboCup Humanoid Vision & Localization</h3><p>Vision-group development for autonomous soccer: ball/field/robot perception, self-localization, odometry integration, and on-robot debugging under changing field conditions.</p><p><strong>RoboCup China Open 2026 · Humanoid League (Small) · First Prize, Runner-up</strong></p><div class="entry-links"><a href="{{ '/projects/robocup-vision/' | relative_url }}">Details</a><a href="https://zjudancer.github.io/">Team</a></div></div>
</div>

<div class="home-entry">
<video autoplay loop muted playsinline><source src="{{ '/assets/media/projects/turtlebot-web.mp4' | relative_url }}" type="video/mp4"></video>
<div><div class="tagline">Mobile robotics · planning</div><h3>TurtleBot Autonomous Navigation with a Custom RRT* Planner</h3><p>A ROS navigation stack that compares Nav2 planning with a custom RRT* global planner using goal-biased sampling, KD-tree collision queries, obstacle inflation, rewiring, and path publication for real-robot execution.</p><div class="entry-links"><a href="{{ '/projects/turtlebot-navigation/' | relative_url }}">Details</a><a href="{{ '/assets/pdf/TurtleBot_Public_Technical_Brief.pdf' | relative_url }}">Technical brief</a></div></div>
</div>

<div class="home-entry">
<video autoplay loop muted playsinline poster="{{ '/assets/img/projects/dynamo-demo-poster.png' | relative_url }}"><source src="{{ '/assets/media/projects/dynamo-demo.mp4' | relative_url }}" type="video/mp4"></video>
<div><div class="tagline">Humanoid dynamics · optimization</div><h3>DYNAMO: Motion Planning for Unitree G1 Dance Performance</h3><p>DYNAMO turns expressive dance references into stable, executable Unitree G1 trajectories. It combines whole-body dynamics, contact scheduling, ZMP constraints, joint and motor limits, and energy-aware trajectory optimization to compare candidate motions before execution.</p><p><strong>Asia and Pacific Mathematical Contest in Modeling (APMCM) 2025 · National First Prize (top 2%)</strong></p><div class="entry-links"><a href="{{ '/projects/dynamo/' | relative_url }}">3D Demo & Details</a><a href="{{ '/assets/pdf/DYNAMO_Public_Technical_Brief.pdf' | relative_url }}">Technical brief</a></div></div>
</div>

<div class="home-entry">
<video autoplay loop muted playsinline><source src="{{ '/assets/media/projects/thuair-cloth.mp4' | relative_url }}" type="video/mp4"></video>
<div><div class="tagline">Embodied AI · handover</div><h3>THU AIR Stereo Hand-Object Handover</h3><p>Research-intern work on stereo hand-object understanding and robot handover, using the public <a href="https://qm-ipalab.github.io/StereoHO/">StereoHO</a> system as the perception baseline and a reproducible handover infrastructure for simulation-to-system integration.</p><div class="entry-links"><a href="{{ '/projects/thuair-handover/' | relative_url }}">Details</a><a href="https://github.com/AIR-DISCOVER">Lab</a><a href="https://qm-ipalab.github.io/StereoHO/">StereoHO</a></div></div>
</div>

## <span id="education">Education & research visits</span>

<div class="institution-list">
<div class="institution"><img src="{{ '/assets/img/institutions/zju.png' | relative_url }}" alt="Zhejiang University logo"><div><strong>Zhejiang University</strong><span>B.Eng. Agricultural Engineering · 2023–2027</span><small>Research with <a href="https://www.ce.cit.tum.de/en/air/people/alumni/httpswwwintumdei06peoplemingchuan-zhou-meng-1/">Mingchuan Zhou</a></small></div></div>
<div class="institution"><img src="{{ '/assets/img/institutions/nus.png' | relative_url }}" alt="National University of Singapore logo"><div><strong>National University of Singapore</strong><span>Visiting student, Data Science · Jun–Jul 2025 · GPA: 4.00/4.00</span><small>Decision-tree methods, instructed by <a href="https://pages.stat.wisc.edu/~loh/">Prof. Wei-Yin Loh</a></small></div></div>
<div class="institution"><img src="{{ '/assets/img/institutions/tsinghua.png' | relative_url }}" alt="Tsinghua University logo"><div><strong>Tsinghua University</strong><span>Visiting research intern</span><small>Institute for AI Industry Research (AIR), DISCOVER Lab · Jan–Feb 2026</small></div></div>
<div class="institution"><img src="{{ '/assets/img/institutions/westlake.jpg' | relative_url }}" alt="Westlake University logo"><div><strong>Westlake University</strong><span>Visiting research intern</span><small><a href="http://www.inception3d.fun/">Inception3D</a>, led by <a href="https://www.westlake.edu.cn/faculty/anpei-chen.html">Prof. Anpei Chen</a> · May–Oct 2026</small></div></div>
</div>

## <span id="awards">Selected awards</span>

- **RoboCup China Open 2026**, Humanoid League (Small): First Prize, Runner-up — ZJUDancer.
- **Asia and Pacific Mathematical Contest in Modeling (APMCM) 2025**: National First Prize (top 2%) — Unitree G1 motion planning.
- **Quantum Information Technology and Application Innovation Contest 2025**: National First Prize, Runner-up — LDPC decoding optimization.
- **DigitalCup 2025**: National First Prize in both Mathematics and Non-Mathematics groups.
