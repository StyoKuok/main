---
layout: post
title: "A Better Reconstruction Agent Can Be Less Faithful"
author: Zhenghe Guo
date: 2026-09-17 17:00:00 +0800
description: "When stronger priors remove visible defects faster than they recover evidence."
tags: 3d-reconstruction embodied-ai agents evaluation
categories: research-notes
related_posts: true
toc:
  sidebar: left
  collapse: expanded
---

_When stronger priors remove visible defects faster than they recover evidence_

There is a familiar kind of failure in classical 3D reconstruction: a chair leg disappears, a wall becomes noisy, or an unseen surface remains a hole. The result looks bad, but it is epistemically honest. The damage is visible exactly where the measurements were weak.

Now give the system an asset library, a text-to-3D generator, Blender, a vision-language model, a collision checker, and twenty chances to inspect and revise its own rendering. The hole disappears. The chair acquires four clean legs. The room becomes walkable. A human evaluator prefers the result.

Did reconstruction improve?

Sometimes yes. A structural prior can recover what a noisy sensor missed. Multi-step decomposition can prevent a monolithic model from forgetting small parts. Physical constraints can reject impossible geometry. But another thing can happen at the same time: the system becomes much better at replacing uncertainty with a coherent guess.

The uncomfortable property of agentic reconstruction is that every gain in plausibility can make evidential failure harder to see.

This is not an argument against generative priors or 3D agents. It is an argument that “better 3D” now hides three different questions:

1. Is the output internally consistent?
2. Is it plausible to a human or a foundation-model judge?
3. Is it supported by the input evidence?

An agent can improve the first two while leaving the third unchanged—or even making it less legible.

## The word “reconstruction” now covers incompatible contracts

Consider three tasks that increasingly share the same project-page vocabulary.

In measurement reconstruction, multiple images or depth observations constrain a scene. The desired output should explain those measurements, and uncertainty should grow where coverage is weak.

In image-conditioned asset creation, a single image is used to produce a useful editable 3D object. Unseen surfaces must be invented. Fidelity usually means that selected renderings resemble the input, not that every vertex has observational support.

In scene generation, a prompt or reference image specifies intent. The system retrieves or generates assets, arranges them, enforces collision and stability constraints, and optimizes the result for semantics, aesthetics, or functionality.

All three are legitimate. The problem begins when their evidence standards are allowed to drift into one another.

[Agentic 3D Scene Generation with Spatially Contextualized VLMs](https://arxiv.org/abs/2505.20129), for example, is explicit about being a generation framework. It constructs spatial context, generates individual assets, plans a layout, verifies environment setup, and makes ergonomic adjustments. It evaluates text alignment with CLIP and BLIP, aesthetic quality, functional plausibility, image similarity, and, in a controlled setting, Chamfer distance and IoU. Its auto-verification improves water, lighting, atmosphere, scale, and placement. These are useful capabilities.

But notice how many meanings of “faithful” are present. A Victorian apartment can be faithful to a textual style, a reference composition, common-sense ergonomics, and measured geometry in different degrees. Improving one does not logically improve the others.

This is why a beautiful result is not enough to tell us what the agent reconstructed. We also need to know what it was allowed to invent.

## An agent optimizes the feedback it can see

The most useful way to understand a 3D agent is not as an intelligent wrapper around a reconstruction model. It is as an optimizer with a peculiar set of sensors and actuators.

Its actuators may include retrieving an asset, editing Blender code, regenerating a mesh, moving an object, changing a material, running a physics simulation, or asking a VLM to critique a rendering. Its sensors may include a rendered RGB view, a collision report, CLIP similarity, a language-model judgment, or the fact that code executed without error.

The agent will become good at satisfying those feedback channels. Nothing guarantees that those channels are equivalent to the original evidence.

[Scenethesis](https://arxiv.org/abs/2505.02836) is a clean example. It combines language-based coarse planning, visual layout refinement, physics-aware optimization, and a scene judge. Its metrics include CLIP, BLIP, VQA, human and GPT-4o judgments of layout realism, collision and stability rates, reachability, and walkability. This is a thoughtful evaluation for interactive scene generation. Yet almost every metric rewards a property of the final scene. None, by itself, asks whether a particular mug, support surface, or occluded chair leg came from the input rather than the prior.

Again, that is not a criticism of the stated task. It is a warning about interpretation. If the output is later used as a “digital twin,” the contract has changed. A simulator-ready room is not automatically an evidence-preserving copy of a room.

The distinction is easiest to see through a counterfactual. Remove half of the input views. A faithful reconstruction system should become less certain in predictable regions. A powerful generative agent may instead preserve visual quality by leaning harder on its asset generator and scene prior. If the headline metrics barely change, that stability could be evidence of robustness—or evidence that the output was never strongly tied to the measurements.

Without an input-removal test, those explanations are confounded.

## More reasoning steps do not create more measurements

[3D-CoS](https://arxiv.org/abs/2606.10478) provides an unusually revealing controlled comparison. The task is to generate executable Blender code from a single image. The paper compares single-call generation, explicit planning, retrieval-augmented generation, few-shot prompting, and a component-wise agent. The agent first decomposes an object into parts, writes and executes code for each part, repairs failures, and assembles the object.

The part-wise agent improves what the paper calls part-balanced recovery. For some models, it yields the best structural-balance metric and strong Chamfer distance. Yet it is not uniformly best. Separately generated parts disagree in scale, placement, and inter-part relations. RAG wins some visible-view metrics; few-shot prompting wins others. A dedicated model, InstantMesh, still leads the agent on aggregate geometry-centric reconstruction metrics.

This is more informative than a simple “agents improve reconstruction” result. Decomposition changes the error distribution. A one-shot model may omit a leg; a part-wise agent remembers the leg but places it at the wrong scale. The agent has improved component coverage without necessarily improving the global explanation of the image.

And there is a deeper limit. Every agent paradigm in this experiment still begins from one image. Planning, RAG, retries, and execution can rearrange prior knowledge. They cannot directly observe the back of the object. When the result there looks reasonable, the system has made a good prediction, not recovered missing evidence.

That prediction may be exactly what the application wants. The danger is not invention. The danger is invention without provenance.

## Verification can become prior agreement

“But the agent verifies its output” sounds stronger than it often is.

Verification is only independent when the verifier has access to evidence or failure modes that the generator does not share. If a VLM proposes a scene and another invocation of a similar VLM judges a rendering, both may prefer the same culturally typical room layout. Iteration then sharpens agreement with a shared prior.

The loop can look like this:

\[
\text{generate} \rightarrow \text{render} \rightarrow \text{judge plausibility} \rightarrow \text{revise}.
\]

For scene authoring, that is productive. For reconstruction, a different loop is needed:

\[
\text{hypothesize} \rightarrow \text{predict measurement} \rightarrow
\text{compare with observation} \rightarrow \text{retain or reject}.
\]

The difference is the object of verification. Does the verifier ask “does this look like a bedroom?” or “would this exact geometry have produced the observed pixels, depths, contacts, and camera trajectory?”

[SceneAssistant](https://arxiv.org/abs/2603.12238) unintentionally supplies a useful case study. Its visual-feedback agent outperforms baselines in human-rated layout correctness, object quality, and preference. Collision feedback is necessary; without it, raw rendered views do not reliably expose interpenetration. Yet the limitations section reports that the agent often underuses its camera-moving tools even when the scene is visually ambiguous. It can be overconfident, fail to notice malformed assets, manipulate too many objects in one step, and require several independent runs before a satisfactory result appears.

That combination matters. The agent has the ability to obtain a better view but often prefers to continue editing from inadequate evidence. “More agency” has increased the action space, not guaranteed epistemic behavior.

The natural fix is not merely a stronger visual critic. It is to reward the agent for resolving uncertainty: move the camera, request another image, preserve competing hypotheses, or explicitly mark an element as unsupported.

## The missing object is an evidence ledger

Traditional reconstruction stores geometry, appearance, and perhaps per-point uncertainty. An agentic pipeline needs something more explicit: a record of why each part of the scene exists.

Call it an evidence ledger. For every object, surface, or relation, the system should be able to distinguish:

- directly measured from one or more observations;
- triangulated or optimized from geometry;
- inferred by a learned depth or reconstruction prior;
- retrieved from an asset database;
- completed by a generative model;
- inserted to satisfy physics or ergonomic constraints;
- selected among alternatives by a visual or language verifier;
- manually constrained;
- currently plausible but unsupported.

This is not cosmetic metadata. It enables questions that a final mesh cannot answer.

If one input view is removed, which regions lose support? If a retrieved asset is swapped, which conclusions change? If the verifier is replaced, which objects move? Can a user request a “measurement-only” rendering that restores holes instead of hiding them? Can the robot decide where a new observation would collapse the largest consequential ambiguity?

The ledger also separates accuracy from honesty. A generated chair back may happen to match reality. It is accurate, but it was not measured. An uncertain, noisy surface may be less accurate in Euclidean distance while being more faithful about the available evidence. Applications care about different mixtures: a game designer may want the plausible chair; a robotic contact planner may need to know which centimeter is imaginary.

## Five tests that current demos rarely show

The next generation of evaluations should include counterfactuals aimed at the agent’s epistemic behavior.

**The evidence-removal curve.** Progressively remove views, depth samples, or masks. Measure not only output quality but whether uncertainty and unsupported area increase monotonically. A model whose confidence remains unchanged after its evidence disappears is advertising its prior as perception.

**The retry curve.** Give the agent more tool calls and independent restarts. Plot measurement consistency and geometric error alongside visual preference. If preference keeps rising while evidence consistency saturates, retries are polishing rather than reconstructing.

**The verifier swap.** Replace the visual-language judge with a photometric, geometric, physics-based, or human verifier. Large changes reveal that the scene was adapted to the evaluator rather than constrained by the input.

**The competing-hypothesis test.** Construct inputs with two plausible hidden geometries that make similar visible renderings. A reconstruction agent should preserve the ambiguity or request a discriminating observation. Prematurely selecting the more common asset is not resolution.

**The intervention test.** Ask the system to choose one additional measurement. A genuinely reconstruction-oriented agent should prefer the view, touch, or motion that separates its leading hypotheses—not merely the angle that makes its current output look best.

These tests would make agentic systems look worse before they make them better. That is a feature. They expose the boundary between recovering a world and authoring one.

## Strong priors are not the enemy

There are important cases where the prior should dominate. Single-view asset creation is mathematically underdetermined; refusing to complete the back of every object would make the tool useless. Sparse-view reconstruction can have lower expected error with a learned category prior than with purely geometric optimization. Physics and ergonomic constraints can eliminate solutions that fit pixels but could not exist. An agent that combines these sources may be more accurate in the world, not just more attractive in a rendering.

The claim here is narrower: plausibility, accuracy, and evidential support should not be collapsed into one score.

What would change my mind about the risk? An agentic system that, as tool budget increases, improves held-out measurement prediction and calibrated regional uncertainty in step with human preference; that becomes less confident under input ablation; and that reliably chooses new measurements over unsupported completion when the decision matters. Such a system would be using agency to investigate rather than decorate.

## Reconstruction after agents

The old inverse-problem question was: what scene best explains these measurements?

The emerging agentic question is dangerously close to: what scene can my available models and evaluators make most coherent?

Those questions coincide only when the feedback loop remains anchored to evidence.

Agents are valuable because they can plan, call specialized tools, compare hypotheses, recover from execution failure, and seek new information. The same machinery can also retrieve a familiar asset, repair every visible blemish, and stop when a VLM says the scene looks right. The final render does not tell us which behavior occurred.

That is why the next important artifact in agentic reconstruction may not be a stronger generator. It may be an interface that lets us see the boundary between **measurement, inference, and invention**.

Until then, a cleaner reconstruction should make us ask one additional question: **cleaner according to what evidence?**

## Primary reading

- [Agentic 3D Scene Generation with Spatially Contextualized VLMs](https://arxiv.org/abs/2505.20129)
- [Scenethesis: A Language and Vision Agentic Framework for 3D Scene Generation](https://arxiv.org/abs/2505.02836)
- [SceneAssistant: A Visual Feedback Agent for Open-Vocabulary 3D Scene Generation](https://arxiv.org/abs/2603.12238)
- [3D-CoS: A New 3D Reconstruction Paradigm Based on VLM Code Synthesis](https://arxiv.org/abs/2606.10478)

---

_© 2026 Zhenghe Guo. Please cite and link to this page rather than reproducing the article in full._
