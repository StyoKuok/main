---
layout: page
title: DYNAMO · Unitree G1 Motion Planning
description: Dynamics-aware humanoid dance optimization; Asia and Pacific Mathematical Contest in Modeling (APMCM) 2025 National First Prize, top 2%.
importance: 3
category: modeling
img: assets/img/projects/dynamo-demo.gif
permalink: /projects/dynamo/
---

<div id="dynamo-demo" style="width:100%;height:min(72vh,620px);min-height:420px;background:#f4f6f8;position:relative"></div>
<script type="module" src="{{ '/assets/js/dynamo-demo.js' | relative_url }}"></script>

## Overview

DYNAMO converts an expressive candidate dance motion into a dynamically feasible, energy-comparable trajectory for a Unitree G1 humanoid. Its inputs are the reference motion, intended foot-contact sequence, robot geometry, joint and motor limits, and execution timing. The output is a whole-body trajectory that preserves the character of the motion while maintaining stable support transitions and respecting the robot's physical constraints.

## System

- **Dynamic model.** Lagrangian rigid-body and centroidal dynamics connect joint motion, center-of-mass acceleration, ground reaction, and support.
- **Contact plan.** A contact schedule marks single- and double-support phases so the optimizer treats foot exchange explicitly rather than assuming continuous support.
- **Stability constraints.** Zero-moment-point constraints keep the projected load inside the active support region during weight transfer.
- **Whole-body optimization.** Joint trajectories are optimized together under kinematic ranges, velocity and torque limits, motion-tracking costs, and contact consistency.
- **Energy comparison.** Motor work, regenerative terms, and thermal penalties provide a consistent way to compare candidate amplitudes and timings.

## What it solves

Directly replaying a dance reference can produce foot slip, unstable center-of-mass motion, infeasible joint commands, or unnecessarily high motor load. DYNAMO resolves those conflicts before execution: it searches for a coordinated trajectory that follows the intended motion, satisfies contact and stability conditions, stays within actuator limits, and exposes the energy cost of alternative versions.

## Interactive demo

Drag to rotate the camera. Use the controls to change motion amplitude and playback speed. The moving humanoid shows joint coordination, support exchange, center-of-mass travel, and ZMP/support tracking. It is a public method visualization rather than a release of the private contest solver or its tuned parameters.

## Result

**Asia and Pacific Mathematical Contest in Modeling (APMCM) 2025 · National First Prize · top 2%.**

[Public technical brief]({{ '/assets/pdf/DYNAMO_Public_Technical_Brief.pdf' | relative_url }})
