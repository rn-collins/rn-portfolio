#!/bin/bash
# push-all.sh — commit & push all sites to GitHub
# Vercel auto-deploys on push — no manual deploy step needed
# Run: bash ~/rn-portfolio/push-all.sh
# Optional custom message: bash ~/rn-portfolio/push-all.sh "your message"

MSG="${1:-update site content}"
LOG=~/push-all.log
echo "=== Push run: $(date) ===" | tee -a "$LOG"

SITES=(
  "$HOME/clerking-site|Clerking"
  "$HOME/aloha-ai-consulting|Aloha AI Consulting"
  "$HOME/aiapc-site|AIAPC"
  "$HOME/fadiman-atlas|Fadiman Atlas"
  "$HOME/aloha-culture-monitor|Culture Monitor"
  "$HOME/aloha-behavioral-intelligence|Behavioral Intelligence"
  "$HOME/aloha-creator-rights|Creator Rights"
  "$HOME/aloha-encoding-effect|Encoding Effect"
  "$HOME/aloha-ai-governance|AI Governance"
  "$HOME/bm-intel|BM Intel"
  "$HOME/psych-ops-directory|Psych Ops Directory"
  "$HOME/aloha-dea-tracker|DEA Tracker"
  "$HOME/aloha-governance-audit|Governance Audit"
  "$HOME/aloha-legal-ai-monitor|Legal AI Monitor"
  "$HOME/aloha-suppression-sweep|Suppression Sweep"
  "$HOME/aloha-third-asset|Third Asset"
  "$HOME/nsag-site|NSAG"
  "$HOME/entheogen-atlas|Entheogen Atlas"
  "$HOME/psychonaut-bookworm|Psychonaut Bookworm"
  "$HOME/destig-toolkit|Destig Toolkit"
  "$HOME/law-communication-library|Law Comm Library"
)

ok=0; skipped=0; failed=0

for ENTRY in "${SITES[@]}"; do
  DIR=$(echo "$ENTRY" | cut -d'|' -f1)
  NAME=$(echo "$ENTRY" | cut -d'|' -f2)

  if [ ! -d "$DIR/.git" ]; then
    echo "  ⚠️  $NAME — no git repo, skipping" | tee -a "$LOG"
    skipped=$((skipped+1))
    continue
  fi

  cd "$DIR"
  CHANGES=$(git status --short)
  AHEAD=$(git rev-list @{u}..HEAD 2>/dev/null | wc -l | tr -d ' ')

  if [ -z "$CHANGES" ] && [ "$AHEAD" -eq 0 ]; then
    echo "  — $NAME: nothing to push"
    skipped=$((skipped+1))
    continue
  fi

  git add -A 2>/dev/null
  git commit -m "$MSG" 2>/dev/null | tail -1
  if git push origin main 2>&1 | tee -a "$LOG" | grep -qiE 'error|fatal|denied'; then
    echo "  ❌ $NAME: push failed" | tee -a "$LOG"
    failed=$((failed+1))
  else
    echo "  ✅ $NAME: pushed → GitHub (Vercel auto-deploying)" | tee -a "$LOG"
    ok=$((ok+1))
  fi
done

echo ""
echo "Done: $ok pushed, $skipped skipped, $failed failed" | tee -a "$LOG"
echo "Vercel picks up changes automatically within ~30 seconds."
