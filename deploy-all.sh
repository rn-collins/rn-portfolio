#!/bin/bash
# deploy-all.sh — paste into Mac Terminal and run: bash ~/rn-portfolio/deploy-all.sh
# Deploys 17 sites: 15 pending + Clerking + Aloha AI Consulting (updated this session)
# Rate-limit aware: retries with 5-min backoff. Logs to ~/deploy-all.log

NODE=/opt/homebrew/bin/node
VERCEL=/usr/local/bin/vercel
LOG=~/deploy-all.log

SITES=(
  "$HOME/clerking-site|24 Clerking"
  "$HOME/aloha-ai-consulting|26 Aloha AI Consulting"
  "$HOME/aloha-culture-monitor|07 Culture Monitor"
  "$HOME/aloha-behavioral-intelligence|09 Behavioral Intelligence"
  "$HOME/aloha-creator-rights|10 Creator Rights"
  "$HOME/aloha-encoding-effect|11 Encoding Effect"
  "$HOME/aloha-ai-governance|13 AI Governance"
  "$HOME/bm-intel|15 BM Intel"
  "$HOME/psych-ops-directory|20 Psych Ops Directory"
  "$HOME/fadiman-atlas|22 Fadiman Atlas"
  "$HOME/aiapc-site|27 AIAPC"
  "$HOME/entheogen-atlas|28 Entheogen Atlas"
  "$HOME/psychonaut-bookworm|29 Psychonaut Bookworm"
  "$HOME/destig-toolkit|30 Destig Toolkit"
  "$HOME/law-communication-library|31 Law Comm Library"
)

DONE_FILE=/tmp/deploy_done_$(date +%Y%m%d).txt
touch "$DONE_FILE"

echo "=== Deploy run started $(date) ===" | tee -a "$LOG"
echo "Tracking completed sites in: $DONE_FILE"

total=${#SITES[@]}
attempt=0

while true; do
  done_count=$(wc -l < "$DONE_FILE" | tr -d ' ')
  if [ "$done_count" -ge "$total" ]; then
    echo "✅ ALL $total SITES DEPLOYED — $(date)" | tee -a "$LOG"
    break
  fi

  attempt=$((attempt + 1))
  echo "--- Pass $attempt — $(date) ---" | tee -a "$LOG"
  rate_limited=0

  for ENTRY in "${SITES[@]}"; do
    DIR=$(echo "$ENTRY" | cut -d'|' -f1)
    NAME=$(echo "$ENTRY" | cut -d'|' -f2)

    if grep -qF "$NAME" "$DONE_FILE" 2>/dev/null; then
      echo "  SKIP (done): $NAME"
      continue
    fi

    if [ ! -d "$DIR" ]; then
      echo "  MISSING dir: $DIR — skipping $NAME" | tee -a "$LOG"
      continue
    fi

    echo -n "  Deploying $NAME ... "
    RESULT=$(cd "$DIR" && $NODE $VERCEL --yes --prod 2>&1 | tail -6)

    if echo "$RESULT" | grep -qiE 'ready|aliased|success|deployed'; then
      echo "✅ SUCCESS" | tee -a "$LOG"
      echo "$NAME" >> "$DONE_FILE"
    elif echo "$RESULT" | grep -qiE 'rate.limit|too many|429|limit exceeded'; then
      echo "⏳ RATE LIMITED" | tee -a "$LOG"
      rate_limited=1
    else
      echo "❌ ERROR" | tee -a "$LOG"
      echo "     $RESULT" | tee -a "$LOG"
    fi
  done

  done_count=$(wc -l < "$DONE_FILE" | tr -d ' ')
  echo "  Progress: $done_count / $total done" | tee -a "$LOG"

  if [ "$done_count" -ge "$total" ]; then
    echo "✅ ALL DONE — $(date)" | tee -a "$LOG"
    break
  fi

  if [ "$rate_limited" -eq 1 ]; then
    echo "  Rate limited — waiting 5 minutes..." | tee -a "$LOG"
    sleep 300
  else
    # No rate limit but still have pending sites — wait 30s and retry
    echo "  Waiting 30s before next pass..." | tee -a "$LOG"
    sleep 30
  fi
done

echo ""
echo "=== Completed sites ==="
cat "$DONE_FILE"
echo ""
echo "Log saved to: $LOG"
