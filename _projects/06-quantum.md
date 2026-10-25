---
layout: page
title: QUBO-Based Hybrid LDPC Decoding for Coherent Optical Optimization
description: Coherent-Ising-machine-assisted LDPC decoding; 2025 national First Prize and Runner-up.
importance: 6
category: modeling
img: assets/img/projects/quantum-ldpc.png
permalink: /projects/quantum-ldpc/
---

<img src="{{ '/assets/img/projects/quantum-ldpc.png' | relative_url }}" alt="LDPC decoder benchmark" style="width:100%">

## Overview

An engineering prototype that maps difficult LDPC subproblems to QUBO form and combines a coherent Ising machine interface with classical decoding and post-processing.

## System

- LDPC encoding, channel simulation, and belief-propagation baseline.
- Adaptive QUBO penalties informed by Tanner-graph degree and channel reliability.
- Partitioned solving for larger parity-check graphs.
- Candidate selection using channel likelihood and parity-violation penalties.
- Reproducible BER/FER, convergence, and runtime comparisons.

## Result

**2025 Quantum Information Technology and Application Innovation Contest · National First Prize, Runner-up.**

[Problem](https://github.com/StyoKuok/qubo-hybrid-ldpc-decoding/blob/main/competition_problem_B_en.pdf) · [Paper](https://github.com/StyoKuok/qubo-hybrid-ldpc-decoding/blob/main/ldpc_decoding_ieee_en.pdf)
