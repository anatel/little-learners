---
name: create-task
description: Create one or more task cards on the Little Learners Trello board in the project's standard format (LL-N id, Depends on line, Description / Visuals / Acceptance criteria / Out of scope), with a visual helper (mockup, diagram, design artifact) when one makes the task clearer. Use whenever the user asks to create, add or open a task, card or ticket for this project, or invokes /create-task.
---

# Create a task card

Board: https://trello.com/b/Wi3mUMVP/little-learners
Flow: Backlog → In Progress → Review → Done. New cards always go to **Backlog**.

## Steps

1. **Read the board** with `trelloReadCard` `list_by_board`, `filter: "all"` (archived cards keep their numbers too).
   - Find the highest `LL-<n>` in any card title. New cards are numbered from n+1, in the order given.
   - Find the Backlog list id.
   - Check that no existing card already covers the task. If one does, tell the user instead of creating a duplicate.
2. **Decide whether the card needs a visual helper** (see "Visual helpers" below). If it does, make it now, so the link can go into the card.
3. **Agree on the content first.** If the user has only floated an idea, or the scope, dependencies or acceptance criteria aren't settled, show the draft card(s) and visuals and wait for an explicit go-ahead. Create right away only when the user has clearly said to create these specific tasks.
4. **Create the cards** with `trelloWriteCard` `create` on the Backlog list.
   - Set `pos` so the Backlog reads in priority order: put new cards after the existing ones, using sequential numbers (for example 1000000, 1001000, 1002000, ...) so cards created in parallel keep their order.
5. **Verify** by reading the board back: each card's title, number, position and visual links are right.
6. **Report** a short table of id, title and link (and the visual's link, where there is one).

## Visual helpers

Add a visual when a picture explains the task faster than words. Typical cases:

| Card is about | Visual |
| --- | --- |
| A screen or UI component (layout, sizes, states) | A mockup: a Design artifact or an HTML page showing the screen at tablet landscape size, in Hebrew RTL |
| A flow (game loop, navigation between screens) | A flow diagram |
| An API or data shape | A diagram of request → response, or of how the pieces connect |
| A decision between options | A side-by-side comparison of the options (e.g. sample pictures in each style) |

Rules:
- Skip it for tasks that are plain setup or config (server setup, docs, env vars). Don't add a visual just to have one.
- Publish it with the Artifact tool (it's private by default), and put its link in the card's **Visuals** section.
- The visual shows intent, not a final design. Say so on the visual and in the card, so the implementation isn't held to pixel-exactness.
- One visual can serve several related cards (e.g. one mockup for the game screen and its feedback states). Link it from each.
- When the task's scope changes, update the visual in place (same URL), not a new one.

## Card format

Title: `LL-<n> <short title in sentence case>`

Description (markdown), sections in this order:

```markdown
**Depends on:** LL-2, LL-4        ← or "none"

## Description
What and why, in 2–5 sentences. Name the folders, routes or components involved.

## Visuals                         ← only when the card has one
- [Game screen mockup](<artifact link>): layout and sizes; intent, not final design.

## Acceptance criteria
- Concrete, checkable statements.
- For code tasks: the tests that come with it (unit, API or component tests).
- For UI: checked in Chrome DevTools tablet mode (and on the real tablet when relevant).

## Out of scope
What this card deliberately doesn't do, and which card does it, if one does.
```

### Decision cards

For research or decision tasks that produce a choice rather than code, prefix the title with `Decision:` (e.g. `LL-9 Decision: picture source and style`) and use these sections:

```markdown
**Depends on:** none

## Question
The decision to make, and why it's needed now.

## Options to compare
- Option A: ...
- Option B: ...

## Criteria
What matters (cost, quality, Hebrew support, consistency, licensing, ...).

## Visuals                         ← optional: a side-by-side comparison
## Decision
_To be filled in when decided: the choice and the reasons._
```

When the decision is made, write it into the **Decision** section of the card before moving it to Done.

## Writing rules

- Professional wording: say "the player" or "the user". Never use a child's name.
- This is a **multi-game platform**. Shared pieces (content, feedback, audio, the game list) must be game-agnostic; put game-specific rules in the game's own cards.
- One card = one reviewable piece of work. If a card needs more than ~6 acceptance criteria, consider splitting it.
- Every code card includes its tests in the acceptance criteria.
- Dependencies list only direct prerequisites, by LL id.
