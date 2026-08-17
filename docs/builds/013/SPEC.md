# Build 013 — AI Workflow Consequence Scanner

## Job
Show where consequential risk enters and propagates through a real AI workflow.

## Lineage
Uses Build 012 consequence and control mapping. Creates `cap:013`.

## Product contract
A maps real stages, directed handoffs, evidence-bearing risks, owners, controls, stop authority, and monitoring. It directly calls `assessAIUseControls`, traces each risk through reachable downstream stages, exposes uncontrolled stages, and returns contained, gap, or uncontrolled-propagation states. B turns the same proposition into an interactive risk circuit.

## Boundary
Exposure is a prioritization heuristic—not probability, legal conclusion, formal risk assessment, compliance determination, safety approval, or deployment permission.

## Sources
- NIST AI RMF Core and Playbook: https://airc.nist.gov/airmf-resources/airmf/5-sec-core/
- NIST SP 800-218A: https://doi.org/10.6028/NIST.SP.800-218A
