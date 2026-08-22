# Builds 001–003 — Security / Misuse Review

Checked: 2026-08-15. Scope: current browser implementations on `workstream/build-003`.

## Shared controls
- User text is rendered through React text nodes/values; no active-build path intentionally injects user text with `dangerouslySetInnerHTML`.
- Core deterministic A-side interactions do not require external network calls or accounts.
- No build-specific secret/API credential is required client-side.
- Explicit exports create local browser downloads.
- Optional browser AI is feature-detected and never receives external tool/action authority from these builds.

## 001
Threat surface: free-text descriptions may contain sensitive/confidential material. They are used to compose a local protocol/result. Current build-specific code does not transmit or persist them. React escaping prevents entered markup from becoming executable UI. Export is explicit and local. User remains responsible for device/browser confidentiality.
Misuse boundary: a high score must not be represented as legal compliance, safety certification, or proof that review works in practice.

## 002
Threat surface: source/locked text may be sensitive; explicit URL-fragment sharing embeds source state in the link and therefore can disclose it to anyone who receives/sees that URL. UI/public record must disclose this before sharing. Core deterministic adaptation does not transmit text. Optional browser-managed LanguageModel/Translator may process through the browser's built-in capability; the site does not give those models tools or external action authority.
Prompt-injection boundary: source text can attempt to instruct the optional generator. Generated output is untrusted content. The system prompt constrains the task, but prompt wording is not treated as a security boundary. Independent deterministic anchor checks rerun after generation, and consequential communication requires human review. No generator output is permitted to execute code/actions.

## 003
Threat surface: situation/decision text may be sensitive. Core deterministic score/hypotheses do not transmit it. Optional browser-managed LanguageModel receives the text only after explicit user action and has no external tool/action authority.
Prompt-injection boundary: local-model hypotheses are untrusted suggestions and never become evidence of demand. Deterministic scoring and the `discovery != validation` boundary remain independent of model output.

## Recheck triggers
- any server persistence, analytics, connector, external model/API, RAG, agent/tool execution, collaboration, authentication, or public sharing feature is added;
- a framework/rendering change introduces raw HTML execution paths;
- browser built-in AI privacy/data-flow behavior changes materially;
- a build begins handling regulated/specially protected data as an intended use case.
