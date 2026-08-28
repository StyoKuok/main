---
layout: page
title: TurtleBot Autonomous Navigation with RRT*
description: Nav2 baseline and a custom collision-aware RRT* global planner on a real mobile robot.
importance: 2
category: embodied-robotics
img: assets/img/projects/turtlebot-preview.jpg
permalink: /projects/turtlebot-navigation/
---

<video controls autoplay muted loop playsinline style="width:100%;max-height:560px;background:#111"><source src="{{ '/assets/media/projects/turtlebot-web.mp4' | relative_url }}" type="video/mp4"></video>

## Overview

A ROS mobile-navigation project comparing the Nav2 planner with a custom RRT\* global planner in simulation and on a physical TurtleBot.

## System

- Goal-biased random sampling and fixed-step tree expansion.
- KD-tree queries for obstacle distance and rewiring neighborhoods.
- Collision checks along each candidate edge with robot radius, map resolution, and configurable obstacle inflation.
- Best-parent selection and local rewiring to reduce path cost.
- Path backtracking, midpoint interpolation, publication to the ROS global-path topic, and RViz visualization.

## My contribution

Implemented and tuned the RRT\* planner, integrated it with the course navigation stack, compared it with the Nav2 baseline, and validated the resulting paths in screen recordings and physical-robot trials.

[Public technical brief]({{ '/assets/pdf/TurtleBot_Public_Technical_Brief.pdf' | relative_url }})
