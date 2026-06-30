import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mic, Check } from "lucide-react";

export function QuickCapture() {
  const [v, setV] = useState("");
  const [saved, setSaved] = useState(false);

  const saveNote = () => {
    if (!v.trim()) return;

    localStorage.setItem("forceforge-quick-note", v);
    window.dispatchEvent(new Event("quick-note-updated"));

    setSaved(true);

    setTimeout(() => setSaved(false), 1500);

    setV("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="fixed bottom-6 right-6 z-30 w-[360px] max-w-[calc(100vw-3rem)]"
    >
      <div className="glass-card rounded-2xl p-2 shadow-[0_20px_60px_-20px_oklch(0_0_0/0.6)]">
        <div className="flex items-center gap-2 px-2 pt-1 text-[11px] text-muted-foreground">
          <Sparkles className="size-3 text-accent" />
          Quick capture
        </div>

        <div className="flex items-center gap-2 p-2">

          <input
            value={v}
            onChange={(e) => setV(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveNote();
              }
            }}
            placeholder="What's on your mind?"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
          />

          <button
            onClick={() => alert("🎤 Voice input coming soon!")}
            className="grid size-8 place-items-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
          >
            <Mic className="size-4" />
          </button>

        </div>

        {saved && (
          <div className="flex items-center gap-1 px-2 pb-2 text-xs text-green-400">
            <Check className="size-3" />
            Saved
          </div>
        )}
      </div>
    </motion.div>
  );
}