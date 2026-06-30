# ForceForge AI JSON Schemas

## Purpose

This document defines the standard data contracts used between:

Gemini

↓

FastAPI Backend

↓

React Frontend

Every AI capability must return structured JSON.

The frontend should never parse free-form text.

---

# Universal AI Response

Every AI response follows this format.

```json
{
  "success": true,
  "module": "planner",
  "timestamp": "2026-06-29T10:00:00Z",
  "version": "1.0",
  "data": {}
}
```

---

# Common Objects

## Task

```json
{
  "id": "",
  "title": "",
  "description": "",
  "priority": "Low | Medium | High",
  "status": "Pending | In Progress | Completed",
  "estimatedMinutes": 30,
  "deadline": "",
  "objectiveId": ""
}
```

---

## Objective

```json
{
  "id": "",
  "title": "",
  "description": "",
  "priority": "",
  "deadline": ""
}
```

---

## Next Best Action

```json
{
  "title": "",
  "description": "",
  "estimatedMinutes": 25,
  "reason": ""
}
```

---

## Forge Queue Item

```json
{
  "taskId": "",
  "title": "",
  "estimatedMinutes": 20,
  "priority": "",
  "reason": ""
}
```

---

## Risk

```json
{
  "level": "Low | Medium | High",
  "reason": "",
  "recommendation": ""
}
```

---

## AI Reasoning

```json
{
  "summary": "",
  "explanation": ""
}
```

---

# Planner Response

```json
{
  "success": true,
  "module": "planner",
  "data": {
    "objective": {},
    "tasks": [],
    "nextBestAction": {},
    "forgeQueue": [],
    "executionPlan": [],
    "risk": {},
    "followUpQuestions": [],
    "reasoning": {}
  }
}
```

---

# Coach Response

```json
{
  "success": true,
  "module": "coach",
  "data": {
    "strategy": "Guide",
    "observation": "",
    "reasoning": "",
    "recommendation": "",
    "requiresReplanning": false,
    "updatedRisk": {}
  }
}
```

---

# Reflection Response

```json
{
  "success": true,
  "module": "reflection",
  "data": {
    "summary": "",
    "wins": [],
    "challenges": [],
    "insights": [],
    "tomorrowAdjustments": [],
    "carryForward": [],
    "motivation": ""
  }
}
```

---

# Risk Analyzer Response

```json
{
  "success": true,
  "module": "risk-analyzer",
  "data": {
    "overallRisk": {},
    "riskFactors": [],
    "recoveryStrategy": [],
    "requiresReplanning": false
  }
}
```

---

# Error Response

Every AI module returns errors using the same format.

```json
{
  "success": false,
  "module": "planner",
  "error": {
    "code": "AI_TIMEOUT",
    "message": "Unable to generate plan."
  }
}
```

---

# Validation Rules

The backend must validate every response before sending it to the frontend.

Validation includes:

• Required fields exist

• Correct data types

• Allowed enum values

• Non-empty required arrays

• Valid timestamps

Invalid AI responses should never reach the frontend.

---

# Versioning

Every response includes

```json
{
  "version": "1.0"
}
```

Future changes should increment the version while maintaining backward compatibility.

---

# Design Principles

Every schema should be:

Consistent

Predictable

Easy to validate

Easy to extend

Friendly for frontend rendering

No free-form responses unless explicitly intended for display.
