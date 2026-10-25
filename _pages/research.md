---
layout: page
permalink: /research/
title: Research Statement
nav: true
nav_order: 3
---

## Learning Physical Knowledge from Imperfect Experience

**Research interests:** Representation learning, physical modeling and learned dynamics, system identification, reinforcement learning and control, robotics, inference under uncertainty, and formal methods.

My research asks how learning systems can acquire useful physical knowledge from limited and imperfect experience. Observations are incomplete, measurements contain noise, and data may include systematic errors or misleading correlations. Yet a system must use this evidence to infer hidden conditions, anticipate consequences, and interact with a changing physical world. My long-term goal is to develop learning methods that acquire knowledge which can be **transferred, composed, and continually revised**, so that experience in one setting can support reasoning and adaptation in another.

I am drawn to difficult, open-ended problems where the relevant variables, assumptions, or even the right formulation remain unclear. I enjoy **uncovering the distinctions that make a problem tractable**. As powerful models and automated research tools make complex pipelines easier to construct, I see a growing need to establish which physical relationships a model has learned, what the evidence leaves unresolved, and which new inferences are justified. These questions guide both the methods I want to build and the experiments I use to study them.

### What should a learned representation preserve?

A representation determines which distinctions a learning system retains and which it treats as equivalent. In physical systems, these choices shape what can subsequently be inferred or predicted. Similar observations may conceal different velocities, contact conditions, or material responses; different observations may also express the same underlying physical relationship.

I want to develop representations that **preserve the distinctions needed across predictions and interactions**. This involves studying what is observable and identifiable, how history and additional sensing resolve ambiguity, and when a belief over possible states is necessary. Reuse raises a further question: under what assumptions can knowledge expressed through one observation process or representation remain meaningful in another? Mathematical and formal analysis can help specify these conditions, expose unavoidable ambiguities, and guide learning objectives and architectures.

### How should physics shape what is learned?

Physical structure can enter a learning system through its state variables, interaction structure, transition operators, constraints, and inference procedures. **Where physics enters changes what must be learned**: it determines what a model can express, what evidence it needs, and which conclusions its predictions can support.

I am interested in designing this division of responsibility. Established structure can constrain a model and reduce its data requirements, while uncertain or missing mechanisms require flexibility. A discrepancy may reflect an incorrect parameter, an omitted response, insufficient state information, or errors in the observations. Each explanation suggests a different update. I want to develop methods that determine when these explanations can be distinguished and use that understanding to choose what should be calibrated, learned, or reformulated.

This motivates my interest in neural representations, structured dynamical models, and learned corrections to physical simulators. I study how the location and parameterization of a learned component affect its meaning, identifiability, and transfer. Compositionality adds another challenge: under what conditions can learned relations or mechanisms be combined to support inference in configurations that were not directly observed?

### How can interaction improve what a model knows?

A system's predictions influence its actions and therefore the evidence it encounters next. Planning and optimization can bring a model into conditions poorly supported by its training experience. An adaptive system must therefore reason about both **what to do and what it needs to learn**.

I want to study how uncertainty can guide this process. It may reflect finite data, ambiguity in the observations, or an inadequate model family, with each source suggesting a different response. A system may need another observation, a more informative intervention, a narrower range of predictions, or a change in model structure. Ideas from active system identification, experimental design, and control provide a foundation for these choices. My goal is to develop methods that use interaction to resolve consequential ambiguities and revise models as evidence accumulates.

### How I approach research

My current work has shaped this approach through several distinct problems. In [ObjectTwin](https://styokuok.github.io/sim_ready/), I isolate the loss of correspondence introduced when a generated asset replaces the geometry of a captured instance, using fixed observations and metric anchors to define the comparison. In [residual dynamics](https://styokuok.github.io/res_dyn/), I study how the source of simulator discrepancy and the interface of a learned correction affect its usefulness across data and interaction conditions.

In [action-consequence learning](https://styokuok.github.io/vis_phys/), I construct restored-state comparisons that separately measure access to current physical information, recovery of action consequences, and realized decision utility. My work on context-aware magnetic navigation explores how interaction history supplies information needed for adaptation under changing physical conditions.

These projects have reinforced my interest in **turning explicit distinctions into new methods**. I make assumptions explicit, design comparisons that distinguish competing explanations, and use the resulting understanding to guide model construction. I want theoretical reasoning to clarify what can be concluded under stated conditions, and experiments to reveal which distinctions matter in richer systems.

Ultimately, I hope to establish how physical knowledge can be learned from imperfect experience and remain useful as observations, dynamics, and goals change. This requires representations that preserve relevant structure, models that can be revised, and interactions that produce informative evidence. Understanding and developing these capabilities together is the research direction I want to pursue.
