---
layout: page
title: THU AIR Stereo Hand-Object Handover
description: Stereo hand-object perception and embodied handover infrastructure.
importance: 4
category: embodied-robotics
img: assets/img/projects/thuair-preview.jpg
permalink: /projects/thuair-handover/
---

<video controls autoplay muted loop playsinline style="width:100%;max-height:560px;background:#111"><source src="{{ '/assets/media/projects/thuair-cloth.mp4' | relative_url }}" type="video/mp4"></video>

## Overview

A research-intern project at Tsinghua University's Institute for AI Industry Research (AIR), DISCOVER Lab, on visual hand-object understanding and robotic handover. The system connects stereo reconstruction of a hand-object interaction with a reproducible perception-to-action pipeline for physical transfer.

## System

- [StereoHO](https://qm-ipalab.github.io/StereoHO/) as the principal public perception baseline: wide-baseline stereo RGB observations are combined into a hand-object shape representation and decoded into reconstructed geometry.
- Segmentation-based outlier removal and point-cloud processing prepare the reconstructed object for downstream grasp and transfer planning.
- Hand-eye calibration maps the perception output into the robot base frame; a selected grasp target then drives the 6-DoF handover sequence.
- Experiment infrastructure covers data preparation, inference, visualization, calibration, and robot-side execution.

## My contribution

Baseline integration, experiment infrastructure, visualization, and sim-to-system testing during the Jan-Feb 2026 research visit.

## Result

A working research pipeline that exposes the intermediate stereo reconstruction and coordinate transforms needed to connect hand-object perception with a repeatable handover experiment.

## Resources

[StereoHO project](https://qm-ipalab.github.io/StereoHO/) · [StereoHO code](https://github.com/QM-IPAlab/StereoHO) · [AIR-DISCOVER](https://github.com/AIR-DISCOVER)
