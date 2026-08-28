---
layout: page
title: RoboARM · Vision-Guided Gomoku Manipulation
description: A ROS perception-decision-manipulation loop for a six-axis arm playing Gomoku.
importance: 5
category: embodied-robotics
img: assets/img/projects/chessbot-preview.jpg
permalink: /projects/chessbot/
---

<video controls autoplay muted loop playsinline style="width:100%;max-height:560px;background:#111"><source src="{{ '/assets/media/projects/chessbot.mp4' | relative_url }}" type="video/mp4"></video>

## Overview

RoboARM closes the loop from board perception to game decision and physical stone placement with a six-axis collaborative arm.

## System

- Astra Pro RGB sensing, YOLO stone/board detection, and an 11×11 vision representation whose inner 9×9 region defines executable board coordinates.
- ArUco-assisted frame registration and hand-eye transform configuration.
- A browser frontend posts the detected board state through an HTTP bridge to a ROS service; a Python Negamax agent returns the next move.
- Robodyno six-axis kinematics over CAN, with pneumatic/vacuum end-effector control.
- The move is mapped from board coordinates into the calibrated robot frame and executed as a Cartesian pick-and-place trajectory from the stone box to the board.
- ROS services, launch files, calibration configuration, and board-state visualization make the complete loop inspectable and repeatable.

## My contribution

System integration across perception, decision, calibration, arm motion, and end-effector control; hardware debugging and execution of the vision-to-placement loop.

## Result

An end-to-end physical Gomoku system that turns a camera observation into a legal move and places the stone autonomously with a six-axis arm.

## Resources

[Code](https://github.com/StyoKuok/ChessBot) · [Technical report]({{ '/assets/pdf/chessbot-report.pdf' | relative_url }})
