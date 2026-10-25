---
layout: page
permalink: /research/
title: Research Statement
nav: true
nav_order: 3
---

## Learning Physical Knowledge from Imperfect Experience

**Research interests:** Representation learning, physical modeling and learned dynamics, system identification, reinforcement learning and control, robotics, inference under uncertainty, and formal methods.

Recent progress in video representation learning and model-based reinforcement learning has made it possible to learn predictive models from sensory experience and use them for planning. These systems, however, do not all learn the same kind of knowledge. [PlaNet](https://arxiv.org/abs/1811.04551) infers a latent state from observation and action history so that an agent can plan from images. [TD-MPC2](https://arxiv.org/abs/2310.16828) learns a control-oriented latent model whose predictions are used to estimate returns and optimize actions, without reconstructing every future observation. [V-JEPA 2](https://arxiv.org/abs/2506.09985) separates large-scale action-free video representation learning from the later training of an action-conditioned model for robot planning.

These approaches succeed partly because they make deliberate choices about what a model should retain and predict. A model trained to reconstruct observations, predict rewards, or compare latent features may preserve different aspects of the same physical process. Those choices are often appropriate for the task at hand, but they also determine what the model can later infer when the available observations, actions, or goals change. This leads to the question that motivates my research: **how can a learning system acquire physical knowledge that remains useful beyond the conditions that produced its training data?**

My long-term goal is to develop learning methods that acquire knowledge from limited and imperfect experience and make it **transferable, composable, and continually revisable**. Measurements may be noisy, important conditions may remain hidden, and several physical explanations may be compatible with the same data. A useful system must therefore do more than fit a predictive pattern. It must retain information relevant to future decisions, use physical structure where that structure is justified, and obtain new evidence when its current explanation is inadequate.

I am drawn to difficult, open-ended problems in which the main challenge is not simply optimizing a larger model, but determining what the model should represent, what the available evidence can establish, and what kind of additional experiment would resolve the remaining ambiguity.

### What should a learned representation preserve?

A single image of a pendulum can show its position without revealing whether it is moving to the left or to the right. The two situations may look identical at one moment while implying different future trajectories. A history of images and actions can make the hidden motion partly recoverable, but only if the representation preserves the information that distinguishes those possibilities.

This is the role played by the latent state in PlaNet. The model uses observation and action history to infer a distribution over the current hidden state, then plans in the resulting latent space. The contribution is not simply that images are compressed into vectors. The representation is useful because it retains information needed to predict future rewards and consequences under candidate actions.

That example makes a broader problem concrete. A representation can be adequate for predicting familiar observations or rewards while remaining insufficient for a different decision. For instance, two hidden contact conditions might produce almost identical images before an action but lead to different outcomes after contact. If the representation treats them as equivalent, the model may appear accurate on the data used to train it while failing on the decision that depends on their difference.

I want to study representations through this connection between **what is hidden and what a later decision requires**. Rather than asking only whether a representation predicts held-out observations, I am interested in whether it preserves the information needed to compare possible actions, anticipate their consequences, and adapt when the physical context changes. This raises concrete questions:

- When can observation history distinguish two hidden physical situations?
- When does history remain insufficient?
- What additional measurement or interaction would make the distinction observable?
- Which uncertainties can be safely averaged over, and which ones change the correct action?

These questions connect representation learning with state estimation, observability, and identifiability. Mathematical analysis can determine when two explanations are indistinguishable under the available data. Learning methods can then be designed around those limits instead of treating every prediction error as an ordinary optimization problem.

### How should physics shape what is learned?

Physical structure can reduce the amount of behavior that a model must learn from data. The [Hamiltonian Neural Network](https://arxiv.org/abs/1906.01563) provides a clear example: it learns an energy-like function and constructs the dynamics through Hamiltonian equations, thereby enforcing the corresponding conservation structure. For systems where that structure is appropriate, the model does not need to rediscover energy conservation from a finite collection of trajectories.

The same example also shows why physical structure cannot be inserted without qualification. A frictionless pendulum and a system with dissipation, external forcing, or intermittent contact do not obey the same equations. A structural assumption that improves learning in one setting can become an error source in another. The important design question is therefore **which relationships are sufficiently known to constrain, which mechanisms remain uncertain, and how the model should represent the difference**.

This perspective leads to a practical division of responsibility between physical models and learned components. A known kinematic relation may be imposed directly. An uncertain force response may be estimated from data. A simulator may capture the dominant dynamics while a learned correction accounts for a systematic discrepancy. The scientific problem is to determine whether a mismatch comes from an incorrect parameter, an omitted mechanism, insufficient state information, or an error in the observations. These explanations require different data and different updates.

I want to develop structured learning methods that make this division explicit and revisable. A learned component should have a meaningful interface with the physical model: its input should correspond to the information needed to explain the discrepancy, and its output should change the part of the prediction that the evidence actually supports. This connects neural representations with system identification, hybrid dynamical models, and learned corrections to simulators.

The same issue appears when knowledge must be reused in a new configuration. A learned response may depend on geometry, material properties, contact conditions, or the way the system was observed. To compose such knowledge safely, we need to understand which dependencies are essential and which can be abstracted away. I am interested in models and analyses that make those dependencies visible enough to support transfer, while leaving genuinely unknown mechanisms open to adaptation.

### How can interaction improve what a model knows?

A system does not merely receive evidence from the environment. Its actions determine which evidence becomes available next. A small movement may make a hidden contact state easier to infer. A carefully chosen probe may distinguish two competing dynamics before the system commits to a costly action. The value of that probe depends on both its immediate effect and the decisions that the new information will enable later.

This is the central idea behind **dual control**. In [work on dual control for approximate Bayesian reinforcement learning](https://arxiv.org/abs/1510.03591), an action affects the physical state and also changes the controller's future belief about the unknown dynamics. The formal problem is difficult because planning must account for possible future observations, model updates, and their effects on later decisions. That difficulty explains why practical methods often use approximations.

This perspective changes how uncertainty should be treated. Uncertainty is not a single numerical quantity with one universal response. If repeated measurements are noisy, the system may need better sensing or averaging. If two physical explanations make identical predictions for the current action but different predictions for another action, an informative intervention may be more useful. If the model continues to disagree with observations in a systematic way, the problem may be model misspecification rather than insufficient data.

I want to study methods that connect these different forms of uncertainty to concrete decisions. A learning system should be able to determine whether it needs:

- another observation of the same situation;
- an action that distinguishes competing physical explanations;
- a more conservative plan while uncertainty remains unresolved; or
- a change in the structure or parameterization of its model.

This gives active system identification and model-based reinforcement learning a shared research question: **how should a system choose actions when the actions themselves determine what it can learn?** Theoretical analysis can clarify when an experiment can distinguish two hypotheses and how much uncertainty is relevant to a decision. Learning and control methods can then use that analysis to choose informative interactions without requiring exact Bayesian planning over every possible future.

### How I approach research

I am interested in difficult problems where the right formulation is initially unclear. My research process begins by identifying a concrete prediction or decision that fails, then listing the physical explanations that could account for the failure. I ask what observations would distinguish those explanations, what structure is already justified, and what part of the model should remain flexible. I then design comparisons or interventions that isolate those factors.

This gives mathematical analysis and experimentation distinct but connected roles. Analysis clarifies what can be inferred under stated assumptions and where ambiguity is unavoidable. Experiments test whether the distinctions identified by the analysis matter in a richer physical setting. A useful method should therefore expose its assumptions clearly enough that its successes and failures can be interpreted.

My current work has developed this approach across several settings. In [ObjectTwin](https://styokuok.github.io/sim_ready/), I study the geometric correspondence lost when a generated asset replaces a captured instance, using fixed observations and metric anchors to define the comparison. In [residual dynamics](https://styokuok.github.io/res_dyn/), I investigate how the source of simulator discrepancy and the interface of a learned correction affect its usefulness across data and interaction conditions.

In [action-consequence learning](https://styokuok.github.io/vis_phys/), I construct restored-state comparisons that separately measure access to current physical information, recovery of action consequences, and realized decision utility. My work on context-aware magnetic navigation explores how interaction history supplies information needed for adaptation under changing physical conditions.

These projects have reinforced my interest in **turning a clearer account of a problem into a new learning method**. I want to develop systems that use imperfect evidence productively, preserve information relevant to future decisions, incorporate physical structure at the right level, and revise their knowledge when interaction reveals that the current explanation is incomplete.

Robotics provides a particularly demanding setting for these questions because sensing is partial, dynamics can change with contact and configuration, and learned predictions must support actions rather than only produce plausible reconstructions. The broader research direction, however, is not limited to one robot or application. I want to understand how finite, noisy, and sometimes misleading experience can become physical knowledge that remains useful when observations, dynamics, and goals change.
