---
layout: page
title: ZJUDancer RoboCup Humanoid Vision & Localization
description: On-robot perception, localization, and odometry integration; RoboCup China Open 2026 First Prize and Runner-up.
importance: 1
category: embodied-robotics
img: assets/img/projects/robocup-preview.jpg
permalink: /projects/robocup-vision/
---

<video controls autoplay muted loop playsinline style="width:100%;max-height:560px;background:#111"><source src="{{ '/assets/media/projects/robocup-web.mp4' | relative_url }}" type="video/mp4"></video>

## Overview

ZJUDancer develops fully autonomous humanoid soccer robots. I worked in the vision group on the perception and state-estimation loop needed to turn camera observations and proprioception into a stable field-relative robot state.

## System

- Calibrated camera capture and image-to-field projection feed ball, goal, obstacle, line, corner, and center-circle observations into a ROS vision node.
- Ball estimates are checked against the field geometry, projected into robot and global coordinates, filtered over time, and used to drive head tracking.
- Field features and motion odometry update AMCL-based self-localization, with explicit quality and consistency signals exposed for match-time debugging.
- Camera exposure, extrinsics, heading offsets, detector thresholds, and odometry alignment are tuned on the robot and at the field.
- The engineering stack is informed by the public [B-Human code release](https://github.com/bhuman/BHumanCodeRelease) and adapted for ZJUDancer hardware and ROS interfaces.

## My contribution

Vision-module integration, localization and recognition debugging, odometry alignment, field tests, and match preparation.

## Result

**2026 China Robot Competition & RoboCup China Open · Beijing Shunyi · 2–4 May 2026**  
Humanoid League (Small) · **First Prize, Runner-up** · Team ZJUDancer · Certificate Y2604T0622753.

[Team website](https://zjudancer.github.io/) · [B-Human reference](https://docs.b-human.de/coderelease2025/)
