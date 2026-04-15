const fs = require("node:fs/promises");
const path = require("node:path");
const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const repoRoot = path.resolve(__dirname, "..", "..");
const skillsDir = path.join(repoRoot, ".claude", "skills");
const publicDir = path.join(__dirname, "public");

async function getCommands() {
  const entries = await fs.readdir(skillsDir, { withFileTypes: true });
  const commands = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const skillPath = path.join(skillsDir, entry.name, "SKILL.md");

    try {
      await fs.access(skillPath);
      commands.push({
        command: `/${entry.name}`,
        skill: entry.name,
        path: path.relative(repoRoot, skillPath).replaceAll("\\", "/"),
      });
    } catch {
      // Skip directories without SKILL.md.
    }
  }

  commands.sort((a, b) => a.command.localeCompare(b.command));
  return commands;
}

app.get("/api/commands", async (_req, res) => {
  try {
    const commands = await getCommands();
    res.json({
      total: commands.length,
      commands,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to load commands",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.use(express.static(publicDir));

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Admin UI is running at http://localhost:${port}`);
});
