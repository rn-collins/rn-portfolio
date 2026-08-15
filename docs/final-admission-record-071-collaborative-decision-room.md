# Final Admission Record — Build 071

Status: ADMITTED / canon convergence

## 071 — Collaborative Decision Room

**Public question:** Can a group make a decision without hiding disagreement, evidence, assumptions, uncertainty, or tradeoffs?

**Public job:** Give a group one shared place to compare options, attach evidence, surface disagreements, change assumptions, and leave behind a readable decision record.

**Novice first-value path:** Start alone or invite others. Name the decision. Add 2–5 options. Add what matters. Participants can react to criteria, attach evidence, add concerns, and mark assumptions. The room shows where people agree, where they disagree, and which evidence or assumption is driving the difference. A visitor can use a fully simulated group without creating an account.

**Comprehension rule:** A general visitor should understand the primary path without knowing terms such as CRDT, multi-criteria decision analysis, argument graph, consensus model, or provenance. Expert terminology belongs in methodology and advanced controls.

**Expert depth:** decision criteria; weighting; structured argumentation; evidence provenance; uncertainty; anonymous vs attributed input; facilitation; consensus vs consent vs majority rules; minority/dissent preservation; asynchronous participation; decision rights; auditability; sensitivity analysis; participatory governance.

**A technological ceiling:** real-time collaborative state using CRDT/operational-transform class techniques as warranted; presence and asynchronous synchronization; structured option/criterion/evidence/assumption graph; source provenance; participant permissions; anonymous or attributed modes; argument/disagreement graph; multi-criteria comparison with transparent weights; sensitivity analysis showing which assumptions/weights change the result; decision-rule plugins; conflict-safe editing; offline/reconnect behavior; accessible keyboard/screen-reader interaction; version history; decision snapshot/export; replay; audit trail; privacy controls; optional bounded AI facilitation that summarizes only source-visible contributions and never fabricates consensus.

**What the visitor must not be required to know:** decision-science vocabulary, collaboration protocols, graph theory, database synchronization, statistics, governance theory, or AI.

**B-Web public proposition:** Consensus is not the absence of visible disagreement. Good group decisions make disagreement inspectable.

**B-Web interaction mechanism:** a live decision space begins with four participants apparently agreeing. The visitor opens the underlying criteria and discovers different reasons, weights, assumptions, and evidence. They can change one assumption, attach/remove evidence, alter a criterion weight, preserve a dissenting position, or switch decision rule. The consensus/disagreement topology recomputes in real time. In multi-user mode, actual participant cursors/state can drive the visualization; in solo mode, transparent simulated participants demonstrate the mechanism.

**B-Web technological ceiling:** WebSocket/realtime collaboration; CRDT-backed shared state; interactive argument/evidence graph; animated topology using SVG/Canvas/WebGL only if node scale warrants; live sensitivity analysis; multi-user presence; temporal replay; accessible linear/table alternative; reduced-motion mode; no collision-prone free-floating text.

**B-LinkedIn 4:5 MP4 concept:** Four people appear to agree on a decision. The screen then opens to reveal that they are weighting different things and relying on different evidence. One hidden assumption changes; the apparent consensus breaks. Evidence is added, disagreement becomes explicit, and the final frame reads: `GOOD DECISIONS DO NOT HIDE DISAGREEMENT.` Silent-first; every frame readable at feed speed; interaction is translated into choreography rather than screen-recorded.

**Saveable payload:** `OPTIONS → CRITERIA → EVIDENCE → ASSUMPTIONS → DISAGREEMENT → DECISION → RECORD`

**Evidence/limitations:** The system can structure deliberation and make assumptions/disagreement visible. It cannot determine that a group’s chosen decision is ethically, legally, scientifically, or substantively correct merely because the process was well documented. Decision rules and weighting choices are themselves governance choices and must remain visible.

**Uses earlier build capability:** 008 decision-ready action framing; 020 evidence/decision lineage; 023 permissions/rights patterns; 029 version/change history; 030 inclusive interaction; 035/036 portability and offline resilience; 058 source provenance; 061 decision memory; 063 living evidence.

**Creates capability:** real-time collaborative state; participatory decision object model; disagreement/argument graph; multi-user evidence linking; sensitivity analysis; deliberation replay; collaborative decision record.

**Later consumers:** 084 benefit-sharing negotiations; 095 participatory governance observation; 099 commons governance; 100 collaborative island decision room.

**Verdict:** KEEP / admitted as the replacement for the public slot freed by consolidating former 045 + 071.