import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const { title, description, tags, content, date } = await req.json()

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")

    const frontmatter = `---
title: "${title}"
date: "${date}"
description: "${description}"
tags: [${tags.map((t: string) => `"${t.trim()}"`).join(", ")}]
---

${content}`

    const filePath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`)
    fs.writeFileSync(filePath, frontmatter, "utf-8")

    return NextResponse.json({ success: true, slug })
  } catch {
    return NextResponse.json({ error: "Failed to write post" }, { status: 500 })
  }
}
