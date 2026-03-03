#!/bin/bash
set -euo pipefail

# Only run in remote Claude Code on the web sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# No external npm dependencies — Node.js built-ins only.
# Run npm install to generate package-lock.json and verify the environment.
npm install
