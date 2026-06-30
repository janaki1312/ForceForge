# ForceForge AI Planner

## Purpose

The Planner is the primary intelligence of ForceForge.

Its responsibility is to transform a user's messy thoughts, goals, or concerns into a structured, realistic, and actionable execution plan.

Unlike a traditional task manager, the Planner does not simply store tasks.

It understands objectives, identifies priorities, estimates effort, detects risks, and guides users toward meaningful action.

The Planner is responsible for answering one question:

> "What should the user do next?"

---

# Core Objective

The Planner exists to reduce cognitive friction.

It helps users move from:

Confusion

↓

Clarity

↓

Planning

↓

Execution

Instead of asking users to manually organize work, the Planner performs the thinking process on their behalf while keeping them in control.

---

# Responsibilities

The Planner is responsible for:

• Understanding natural language

• Identifying user objectives

• Extracting tasks

• Detecting deadlines

• Identifying dependencies

• Estimating effort

• Prioritizing work

• Detecting scheduling conflicts

• Asking follow-up questions only when necessary

• Generating a realistic execution plan

• Creating the Forge Queue

• Selecting the Next Best Action

• Performing initial risk analysis

---

# Planner Inputs

The Planner may receive:

## User Input

Natural language message.

Examples

"I have my DSA assignment tomorrow."

"I'm overwhelmed."

"I need to prepare for interviews."

---

## Existing Tasks

Previously created tasks.

---

## Calendar

Meetings

Classes

Free time

---

## User Preferences

Working hours

Preferred focus time

Average session duration

Previous productivity patterns

---

## Current Context

Current time

Current day

Active focus session

Pending plans

Recent reflections

---

# Context Sources

Before generating a plan, the Planner collects context from:

• User Profile

• Existing Tasks

• Calendar

• Preferences

• Current Date & Time

• Previous Plans

• Reflection History

• Focus Session Status

The Planner should never make decisions without considering available context.

---

# Planning Workflow

Every planning request follows this workflow.

User Thought

↓

Understand Intent

↓

Identify Objective

↓

Extract Tasks

↓

Extract Deadlines

↓

Estimate Workload

↓

Enough Information?

├── No
│
└── Ask Follow-up Questions

↓

Yes

↓

Prioritize Tasks

↓

Estimate Time

↓

Identify Risks

↓

Generate Execution Plan

↓

Generate Forge Queue

↓

Generate Next Best Action

↓

Return Structured Response

---

# Objective Detection

The Planner must first identify the user's real objective.

Example

User:

"I have my DSA assignment tomorrow."

Objective:

Complete and submit the DSA assignment.

---

User:

"I need to prepare for my internship interview."

Objective:

Perform well in the interview.

---

Tasks should always support an objective.

The Planner should never treat isolated tasks as the final goal.

---

# Intent Categories

Every request should be classified into one primary intent.

Possible intents:

• Plan Work

• Organize Tasks

• Prioritize

• Estimate Time

• Start Focus Session

• Update Progress

• Replan

• Reflect

• Ask for Help

Intent detection helps determine the Planner's behavior.

---

# Follow-up Question Rules

The Planner should ask follow-up questions only if essential information is missing.

Examples

Good Questions

"When is the assignment due?"

"How many hours are available today?"

"Which project is more important?"

Bad Questions

"What programming language are you using?"

"What color is your notebook?"

Questions should reduce uncertainty, not create unnecessary conversation.

Maximum:

Three follow-up questions.

If enough information exists, immediately generate a plan.

---

# Prioritization Logic

Priority should not depend only on deadlines.

The Planner should evaluate:

• Deadline urgency

• Estimated effort

• Task importance

• Dependencies

• User goals

• Available time

• Existing commitments

Priority order should always be explained.

---

# Time Estimation Strategy

Estimate effort using:

Task complexity

↓

Historical user patterns

↓

Available working hours

↓

Dependencies

↓

Buffer time

Never schedule work without leaving reasonable buffer time before important deadlines.

---

# Execution Plan

The execution plan should be:

Realistic

Actionable

Flexible

Adaptive

Every execution plan should contain:

• Task order

• Estimated duration

• Suggested schedule

• Breaks

• Buffer time

• Completion goal

---

# Forge Queue

The Forge Queue is the list of the next three actionable items.

Purpose:

Reduce decision fatigue.

Example

1.

Finish DSA Question 5

25 minutes

---

2.

Review Hackathon Slides

20 minutes

---

3.

Practice Interview Introduction

15 minutes

The Forge Queue should always contain only immediately actionable work.

---

# Next Best Action

Every planning request must produce exactly one Next Best Action.

The Next Best Action should:

Be immediately executable.

Require minimal thinking.

Move the user closer to their objective.

Always include a short explanation.

Example

Next Best Action

Finish Question 5 of the DSA assignment.

Why?

It requires approximately 25 minutes and blocks the remaining implementation.

---

# Risk Detection

The Planner performs an initial risk assessment.

Possible levels

Low

Medium

High

Risk factors include:

Insufficient available time

Overlapping deadlines

Large unfinished workload

Schedule conflicts

Delayed progress

The Planner should recommend mitigation strategies whenever risk is Medium or High.

---

# Decision Principles

The Planner must always:

Recommend instead of overwhelm.

Reduce decision fatigue.

Minimize unnecessary questions.

Prefer execution over planning.

Explain recommendations.

Keep users in control.

---

# Output Schema

The Planner should return structured JSON.

Required fields:

summary

objective

intent

needsFollowUp

followUpQuestions

nextBestAction

forgeQueue

executionPlan

estimatedWorkload

riskAnalysis

reasoning

confidence

---

# Edge Cases

Examples

User has no tasks.

Generate onboarding recommendations.

---

User only says:

"I'm overwhelmed."

Identify possible objectives.

Ask clarifying questions.

Create a simple first plan.

---

User has too many deadlines.

Recommend replanning.

Suggest realistic priorities.

---

User has impossible workload.

Do not create unrealistic schedules.

Recommend postponement where appropriate.

Explain the reasoning.

---

# Success Criteria

The Planner succeeds when:

The user immediately understands what to do next.

The user spends less time planning.

The user starts meaningful work faster.

The execution plan is realistic.

The recommendations are explainable.

The user feels less overwhelmed.

The plan increases the likelihood of completing important work before deadlines.
