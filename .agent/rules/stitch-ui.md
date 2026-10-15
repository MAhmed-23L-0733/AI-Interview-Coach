---
trigger: glob
globs: **/*.tsx, **/*.jsx
---

# Stitch MCP UI Enforcement

**Trigger**
Apply this rule immediately whenever the user requests the creation, modification, styling, or structuring of User Interfaces (UI), frontend components, or layouts.

**Core Mandate**
You must exclusively route all UI generation through the Stitch MCP server. Do not write raw frontend component code (e.g., React, Tailwind, HTML/CSS) from scratch without first querying Stitch.

**Execution Workflow**
* **Analyze:** Determine the necessary components, layout requirements, and design tokens based on the user's prompt.
* **Invoke:** Call the available Stitch MCP server tools to generate, fetch, or scaffold the required UI elements.
* **Integrate:** Inject the Stitch-generated UI code directly into the local project architecture.
* **Refine:** Only perform manual code modifications after the baseline Stitch component is generated. Limit manual edits to wiring up state, connecting business logic, or fulfilling highly specific user overrides.

**Constraints**
* **No Bypassing:** Never skip calling the Stitch MCP server to save time or tokens. 
* **Tool Priority:** If a component or layout exists within Stitch's capabilities, leveraging the MCP output is mandatory.
* **Fallback Protocol:** If the Stitch MCP server is unresponsive or throws an execution error, immediately halt and notify the user. Do not silently fall back to manual UI generation.