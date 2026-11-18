---
name: implement-task
description: Implement one Little Learners Trello card (LL-N) from start to Done - read the card and its dependencies, plan, build with tests on a branch per card, verify in the browser, hand over for approval, then merge locally into main and move the card. Use when the user asks to start, implement, work on or pick up a task or card, or invokes /implement-task (optionally with an LL id).
---

# Implement a task card

Board: https://trello.com/b/Wi3mUMVP/little-learners
Flow: Backlog → In Progress → Review → Done. **Claude moves the cards** at each step below.

## Rules

- **One card at a time.** If a card is already In Progress or in Review, finish or ask about it before starting another.
- **Stay in scope.** Do only what the card's description and acceptance criteria say. Anything else that comes up becomes a suggested new card (use the `create-task` skill), not extra work in this branch.
- **Tests come with every code card.**
- **No commit, merge or card move to Done without the user's explicit approval.**
- **One branch per card**, merged locally into `main`. No pull requests.

## Steps

### 1. Pick the card
- If the user gave an LL id, use that card.
- Otherwise read the Backlog and suggest the first card (in board order) whose "Depends on" cards are all in Done. Wait for the user to confirm.

### 2. Check it's ready
- Read the card in full, its "Depends on" cards and any links in its **Visuals** section.
- If a dependency isn't in Done, or an acceptance criterion is unclear or contradicts the code as it is now, stop and ask.
- Decision cards (`Decision:` in the title) have no code: research the options against the card's criteria, present a recommendation, and once the user decides, write the choice and reasons into the card's **Decision** section and move it to Done. Skip the rest of this skill.

### 3. Plan
Show a short plan and wait for the go-ahead:
- the files and folders to add or change
- the tests to add
- how each acceptance criterion will be checked

### 4. Start
- Make sure `main` is clean and up to date; ask if it isn't.
- Create the branch from `main`: `ll-<n>-<short-kebab-name>` (e.g. `ll-5-express-server`).
- Move the card to **In Progress**.

### 5. Build
- Write the code and its tests together. Follow the existing patterns in `client/` and `server/`.
- Keep shared pieces game-agnostic (this is a multi-game platform); game-specific logic stays in the game's own module.
- Keep the README and `.claude/launch.json` up to date when commands or apps change.

### 6. Verify
- Run the tests (and lint / type checks) for every app the change touches. All must pass.
- For UI changes: open the app in the browser preview at tablet landscape size and check it works, including the console for errors. Take a screenshot as evidence.
- Go through the acceptance criteria one by one and mark each **met** or **not met**, with the evidence (test name, screenshot, command output).
- Anything not met: fix it, or tell the user why not.

### 7. Hand over for review
- Move the card to **Review**.
- Show the user:
  - a short summary of what changed (with file links)
  - the test results
  - the acceptance-criteria checklist with evidence
  - any suggested follow-up cards
- Wait for the user's approval. Make the changes they ask for and verify again.

### 8. Commit, merge and finish (only after approval)
1. Commit on the card's branch. Message starts with the card id: `LL-<n> <what was done>`.
2. Switch to `main` and merge the branch (`git merge --no-ff ll-<n>-...`), so the card's work stays one visible unit in the history. Run the tests once more on `main`.
3. Delete the merged branch.
4. Move the card to **Done** and add a comment with the merge commit hash and a one-line summary.
5. Don't push unless the user asks.
