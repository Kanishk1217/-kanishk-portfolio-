"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Settings, X, PenLine, User, CheckCircle, Loader } from "lucide-react"

interface AdminPanelProps {
  onBioEdit: () => void
  bioEditActive: boolean
  onBioSave: () => void
}

const TODAY = new Date().toISOString().split("T")[0]

export function AdminPanel({ onBioEdit, bioEditActive, onBioSave }: AdminPanelProps) {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<"home" | "post">("home")

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState("")
  const [content, setContent] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle")

  const handlePublish = async () => {
    if (!title || !content) return
    setStatus("loading")
    try {
      const res = await fetch("/api/admin/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          tags: tags.split(",").filter(Boolean),
          content,
          date: TODAY,
        }),
      })
      if (res.ok) {
        setStatus("done")
        setTimeout(() => {
          setTitle(""); setDescription(""); setTags(""); setContent("")
          setStatus("idle"); setTab("home")
        }, 2000)
      } else {
        setStatus("error")
        setTimeout(() => setStatus("idle"), 2000)
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 2000)
    }
  }

  return (
    <>
      {/* Toggle button — fixed bottom right above dock */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-24 right-6 z-50 w-9 h-9 rounded-full border border-border bg-background/90 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-all duration-200 shadow-lg"
      >
        {open ? <X size={14} /> : <Settings size={14} />}
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 24, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed bottom-36 right-6 z-50 w-80 rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="border-b border-border px-4 py-3 flex items-center justify-between">
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted-foreground">Admin Panel</span>
              <div className="flex gap-1">
                {(["home", "post"] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`font-mono text-[9px] px-2 py-1 rounded tracking-widest uppercase transition-colors ${
                      tab === t ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t === "home" ? "Profile" : "New Post"}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile tab */}
            {tab === "home" && (
              <div className="p-4 space-y-3">
                <p className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest mb-2">Edit Sections</p>

                <button
                  onClick={() => { onBioEdit(); setOpen(false) }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all duration-200 text-left ${
                    bioEditActive
                      ? "border-foreground/30 bg-foreground/5 text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground"
                  }`}
                >
                  <User size={13} />
                  <div className="flex-1">
                    <p className="font-mono text-[11px] font-medium">Bio & Profile</p>
                    <p className="font-mono text-[9px] text-muted-foreground/50 mt-0.5">
                      {bioEditActive ? "Click on bio text to edit, then save" : "Enable inline bio editing"}
                    </p>
                  </div>
                  {bioEditActive && (
                    <button
                      onClick={e => { e.stopPropagation(); onBioSave() }}
                      className="font-mono text-[8px] px-2 py-1 bg-foreground text-background rounded uppercase tracking-widest"
                    >
                      Save
                    </button>
                  )}
                </button>

                <button
                  onClick={() => setTab("post")}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground transition-all duration-200 text-left"
                >
                  <PenLine size={13} />
                  <div>
                    <p className="font-mono text-[11px] font-medium">Write a Blog Post</p>
                    <p className="font-mono text-[9px] text-muted-foreground/50 mt-0.5">Compose and publish instantly</p>
                  </div>
                </button>

                <div className="pt-2 border-t border-border">
                  <p className="font-mono text-[9px] text-muted-foreground/30 text-center">
                    Changes to bio are local only — push to GitHub to make permanent
                  </p>
                </div>
              </div>
            )}

            {/* New Post tab */}
            {tab === "post" && (
              <div className="p-4 space-y-3">
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Post title"
                  className="w-full font-mono text-[11px] bg-card border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-foreground/30 transition-colors"
                />
                <input
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Short description"
                  className="w-full font-mono text-[11px] bg-card border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-foreground/30 transition-colors"
                />
                <input
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="Tags: Python, SQL, Data Analysis"
                  className="w-full font-mono text-[11px] bg-card border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-foreground/30 transition-colors"
                />
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Write your post in markdown..."
                  rows={7}
                  className="w-full font-mono text-[11px] bg-card border border-border rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-foreground/30 transition-colors resize-none"
                />

                <button
                  onClick={handlePublish}
                  disabled={!title || !content || status === "loading"}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-foreground text-background font-mono text-[10px] tracking-widest uppercase disabled:opacity-40 transition-opacity"
                >
                  {status === "loading" && <Loader size={11} className="animate-spin" />}
                  {status === "done" && <CheckCircle size={11} />}
                  {status === "idle" && "Publish Post"}
                  {status === "loading" && "Publishing..."}
                  {status === "done" && "Published!"}
                  {status === "error" && "Error — try again"}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
