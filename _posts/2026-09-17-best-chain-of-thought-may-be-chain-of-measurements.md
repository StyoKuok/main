---
layout: post
title: "The Best Chain of Thought for a Robot May Be a Chain of Measurements"
author: Zhenghe Guo
date: 2026-09-17 18:00:00 +0800
description: "Why embodied reasoning should decide what to observe before it decides what to do."
tags: robotics embodied-ai reasoning active-perception
categories: research-notes
related_posts: true
toc:
  sidebar: left
  collapse: expanded
---

_Why embodied reasoning should decide what to observe before it decides what to do_

A robot sees a cup near the edge of a table. It spends a second describing the scene, another second identifying the cup, another decomposing the task, and another explaining that the handle appears reachable. By the time it acts, a person has moved the cup.

The reasoning trace is coherent. The action is wrong. Worse, the coherence can make the failure look intelligent.

Chain-of-thought has an obvious appeal in robotics. It promises more than an action token: a robot can name objects, decompose a long task, expose mistakes, accept language corrections, and transfer semantic knowledge from vision-language models into control. Recent embodied chain-of-thought systems show that some of this promise is real.

But embodiment changes the economics of reasoning. In a static math problem, an extra token does not make the premises older. In a robot, reasoning consumes wall-clock time while the world continues. The initial image may be ambiguous; the camera may be occluded; contact may change the object; a cached plan may outlive its scene.

This suggests a different question from “How should a robot reason longer?”

> When should the output of reasoning be another action—and when should it be another measurement?

The best chain of thought for a robot may sometimes be a chain of epistemic actions: lean left, look behind the occluder, touch lightly, verify the grasp, then commit.

## First, the case for embodied chain of thought is strong

It is tempting to dismiss verbal reasoning as decorative narration. The evidence does not support such a simple view.

[Robotic Control via Embodied Chain-of-Thought Reasoning](https://arxiv.org/abs/2407.08693), usually called ECoT, augments a vision-language-action policy with structured steps such as task interpretation, subtask planning, object grounding, gripper localization, and motion primitives. On its aggregate real-robot evaluation, ECoT improves over Octo, OpenVLA, RT-2-X, and a naive CoT baseline, including under an out-of-distribution viewpoint. The per-task table is not uniformly positive—there are tasks where a baseline wins—but the aggregate gain is substantial.

The most convincing part is not the leaderboard. It is intervention. On selected difficult tasks, a human can interrupt once with a correction such as “the screwdriver is in the back right corner” or “release the mushroom now.” The corrected reasoning is fed back into the policy. ECoT’s success rises from 32% to 80%, a 48-percentage-point gain, larger than the corresponding gains for non-CoT baselines.

This reveals a real advantage of language reasoning: it creates an addressable interface. A human can repair a belief or subgoal without teleoperating every joint.

So the interesting critique is not “CoT does nothing.” It is more specific: a trace can be useful as a training signal, an interface, and a temporal abstraction without being a faithful or sufficiently fresh account of the controller’s actual decision.

Those roles are often conflated.

## A reasoning trace can improve the policy without explaining it

The most direct evidence comes from [Do Vision-Language-Action Models Mean What They Say?](https://arxiv.org/abs/2607.04681). The authors compare supervised and RL-post-trained versions of an autonomous-driving VLA. If better trajectories came from better verbal reasoning, improvements should move together. They often do not. RL can reduce trajectory error while the accompanying rationale stays unchanged, remains ungrounded, or is judged worse. The action policy appears able to improve around the trace.

The paper then constructs 66 counterfactual driving scenes by inserting hazards such as roadway fires, contraflow vehicles, or fallen cyclists. It asks whether the language notices the hazard, whether the waypoints react, and whether the two responses are causally aligned. A faithfulness-trained planner performs best, but the absolute joint scores remain low. One qualitative failure is exactly the kind that should worry us: a model says it will slow down for a cyclist while its trajectory increases speed.

This is not merely a problem of dishonest explanations. A robot’s words can become an internal control interface. If later modules, human supervisors, or safety checks rely on the trace, an unfaithful sentence is state corruption.

[Altered Thoughts, Altered Actions](https://arxiv.org/abs/2603.12717) complicates the picture further. Perturbing a reasoning VLA’s CoT does affect actions, but selectively. Swapping entity references is damaging; changing word order, some spatial terms, or generic tokens matters much less. The action decoder appears to use the trace as a structured carrier of object identity while relying on vision for other variables. In some instruction attacks, the reasoning stage amplifies the error: a corrupted instruction produces a wrong object reference, then the action decoder faithfully executes the wrong plan.

The conclusion is not that CoT is causal or non-causal. It can be partially causal in a highly nonuniform way. “The model generated a detailed rationale” tells us almost nothing about which parts of that rationale the action actually depends on.

## Fast ECoT accidentally reveals what the robot repeats to itself

Efficiency work exposes another hidden fact: much embodied reasoning is temporally redundant.

[Fast ECoT](https://arxiv.org/abs/2506.07639) measures how often ECoT’s reasoning stages change between steps. High-level planning updates by only 8.4% on average, meaning 91.6% of its content is reused. Caching high-level reasoning for five frames while refreshing low-level content can slightly improve success, apparently by smoothing noisy fluctuations. But making both high- and low-level reasoning stale drops success, and never updating them collapses performance to 35%. The failures are intuitive: the robot completes a grasp but does not notice that it should transition to placement.

The original ECoT paper reports a similarly revealing speed experiment. Regenerating the full chain every step reaches 63% success on a small task subset. Freezing it for five steps raises success to 72% while speeding inference by 24%; asynchronous reasoning reaches 65% with a 40% speed-up but doubles compute. Fast ECoT later reports that temporal mismatch in its asynchronous variant also lowers action faithfulness.

This tells us that a robot does not need one homogeneous “thought rate.” Semantic plans, object bindings, contact state, and motor corrections live on different clocks. A high-level plan may remain valid for seconds. A slip signal can expire in milliseconds. Turning both into a single autoregressive paragraph forces the control system to serialize variables that should update asynchronously.

The design question should therefore be: which belief changed enough to justify recomputation?

That is already closer to state estimation than to essay writing.

## Latent reasoning weakens the case that words are the essential computation

[LaRA-VLA](https://arxiv.org/abs/2602.01166) takes the next step. It uses a curriculum to move from explicit textual and visual reasoning into continuous latent reasoning. In its ablations, explicit textual CoT provides only a marginal gain over no CoT. Latent textual reasoning gives a much larger improvement, and adding latent visual prediction performs best. The model reports 135 ms inference and up to a 90% latency reduction compared with explicit CoT approaches.

There are caveats: latent tokens are harder to inspect, the paper constrains their number to avoid collapse, and benchmark gains do not prove an interpretable world model. Still, the result changes the burden of proof. If a compact predictive latent produces better actions faster than a paragraph, the paragraph may have been scaffolding for learning rather than the runtime substrate of intelligence.

This distinction matters because verbal CoT is unusually easy to evaluate aesthetically. A trace with object names, spatial relations, and a sensible plan looks thoughtful. A latent state cannot impress a reader. It must earn its value through prediction and control.

The risk is that embodied AI inherits a language-model habit: judging the quality of internal computation by the fluency of its externalization.

## Reasoning on a stale image is not closed-loop intelligence

Suppose the initial observation does not show whether the cup handle is blocked by another object. A long CoT can enumerate possibilities, recall common cup geometry, and produce a confident grasp plan. It cannot reveal the hidden handle.

The robot has three options:

1. choose an action under uncertainty;
2. spend more compute reasoning about the same pixels;
3. acquire evidence that changes the belief.

Only the third changes the information set.

Classical active perception has studied this for decades, but its lesson is easy to lose inside modern VLA pipelines. [ActPerMoMa](https://arxiv.org/abs/2310.00433), for example, selects mobile-manipulator motions by balancing information gain for scene reconstruction with grasp reachability. In simple scenes, a naive strategy is already excellent: 95.2% success versus 95.4% for the active method. Active perception is not automatically worth its cost. In complex scenes with hard grasps, the difference becomes large: 61.8% success for ActPerMoMa, compared with 43.8% for the naive strategy and 47.2% for a next-best-view baseline.

This boundary is crucial. “Always gather another observation” is as shallow as “always think longer.” Measurements cost motion, time, energy, and sometimes safety. The value of active perception rises when uncertainty is decision-relevant and the next observation can resolve it.

The right controller needs a stopping rule: act when the expected value of information falls below the cost of acquiring it.

## The missing primitive is an epistemic action

Most VLA action spaces treat camera motion, touch, and manipulation as ordinary task actions. But some actions are chosen primarily to change what the robot knows.

Moving the wrist camera five centimeters may not advance the manipulation task geometrically, yet it can reveal whether two objects overlap. Closing the gripper until first contact may not be the grasp itself; it can estimate pose and compliance. Nudging an object reversibly may expose whether it is free, attached, or heavier than expected. Asking a person “the blue cup or the green one?” is another measurement, taken through language.

A useful reasoning loop would therefore look less like

\[
\text{image} \rightarrow \text{long rationale} \rightarrow \text{action}
\]

and more like

\[
\text{observe} \rightarrow
\text{identify decision-relevant uncertainty} \rightarrow
\text{choose measurement} \rightarrow
\text{update belief} \rightarrow
\text{act when sufficiently resolved}.
\]

The reasoning product is not necessarily a sentence. It may be a distribution over hypotheses, a predicted observation under a candidate probe, or a trigger saying that the current plan is stale.

This also offers a stricter meaning of corrigibility. A model is not corrigible merely because a human can edit its prose. It is corrigible if contradictory evidence causes its belief and action to change. A fluent trace that absorbs every new observation into the original story is the opposite: coherence has become inertia.

## A fair experiment: tokens versus measurements

The claim can be tested without deciding in advance that active perception is superior.

Give two agents the same wall-clock budget, compute budget, initial observation, and control authority.

Agent A may spend the extra budget on more reasoning tokens, larger test-time search, or self-consistency over action plans.

Agent B may spend it on one additional measurement: a changed viewpoint, a tactile probe, a short reversible motion, or a clarification question. Its reasoning model remains smaller or shorter.

Evaluate not only task success but:

- calibration before and after the extra budget;
- recovery from an incorrect initial belief;
- performance when the scene changes during inference;
- frequency of irreversible mistakes;
- information gained per second of latency;
- whether confidence responds when evidence is removed;
- whether the chosen measurement separates the agent’s own leading hypotheses.

The most revealing cases are those where more text and more evidence disagree. If extra reasoning repeatedly rationalizes the initial perception while one camera move corrects it, the bottleneck was observability. If measurements add little but semantic decomposition solves the task, the bottleneck was abstraction. If both help, the architecture should allocate budget adaptively.

Current comparisons usually keep the observation fixed and vary the reasoning machinery. They can establish that one policy uses a fixed input better. They cannot establish that reasoning was the best use of the robot’s next 500 milliseconds.

## When language reasoning should remain explicit

There are several strong reasons not to replace all CoT with opaque latent state.

Long-horizon tasks benefit from stable semantic plans. Human collaboration benefits from an editable interface. Safety review benefits when a system can state which object, rule, or subgoal it is using. Language can transfer abstract knowledge across embodiments whose low-level actions differ. ECoT’s intervention experiment demonstrates this value directly.

The important condition is that the language trace be treated as a control surface with measured causal influence, not a free explanation attached to an action. We should know which fields affect the decoder, how stale they are allowed to become, and what sensory event invalidates them. A plan that says “place the cup” may persist. A field that says “gripper is aligned” should be refreshed from geometry or contact, not cached because the sentence still sounds plausible.

What would weaken the chain-of-measurements argument? Dynamic, partially observed benchmarks where additional sensing actions are available, yet appropriately compute-scaled CoT consistently beats measurement-seeking policies under equal latency and energy budgets. That would show that the missing information can usually be supplied by learned priors. We need those comparisons.

## From readable thoughts to testable beliefs

The current embodied-reasoning wave has made robots easier to talk about. They can narrate subtasks, point to objects, and justify motions in a vocabulary humans understand. That is valuable.

The next step is to make their beliefs easier to challenge.

A reasoning system should reveal not only what it plans to do, but what observation would make it change the plan. It should know when a phrase is merely a prior, when a visual fact is stale, and when the cheapest route to a better action is to look again.

The most intelligent sentence a robot can produce may sometimes be:

> I cannot distinguish these two states from here. I need another measurement.

And then it should stop talking and move the camera.

## Primary reading

- [Robotic Control via Embodied Chain-of-Thought Reasoning](https://arxiv.org/abs/2407.08693)
- [Fast ECoT: Efficient Embodied Chain-of-Thought via Thoughts Reuse](https://arxiv.org/abs/2506.07639)
- [Latent Reasoning VLA: Latent Thinking and Prediction for Vision-Language-Action Models](https://arxiv.org/abs/2602.01166)
- [Do Vision-Language-Action Models Mean What They Say? On the Role of Faithfulness in Embodied Reasoning](https://arxiv.org/abs/2607.04681)
- [Altered Thoughts, Altered Actions: Probing Chain-of-Thought Vulnerabilities in VLA Robotic Manipulation](https://arxiv.org/abs/2603.12717)
- [Active-Perceptive Motion Generation for Mobile Manipulation](https://arxiv.org/abs/2310.00433)

---

_© 2026 Zhenghe Guo. Please cite and link to this page rather than reproducing the article in full._
