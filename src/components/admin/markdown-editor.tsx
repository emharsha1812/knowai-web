"use client";

import { useRef, useState } from "react";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Eye, Code2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** Minimum height for the textarea in px */
  minHeight?: number;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your markdown content here…",
  minHeight = 500,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result;
      if (typeof text === "string") onChange(text);
    };
    reader.readAsText(file);
    // reset so the same file can be re-uploaded
    e.target.value = "";
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-border bg-muted/30 px-3 py-1.5 shrink-0">
        <button
          type="button"
          onClick={() => setActiveTab("write")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            activeTab === "write"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Code2 className="h-3.5 w-3.5" />
          Write
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("preview")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            activeTab === "preview"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Eye className="h-3.5 w-3.5" />
          Preview
        </button>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
            title="Upload .md file"
          >
            <Upload className="h-3.5 w-3.5" />
            Upload .md
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.txt"
            className="hidden"
            onChange={handleFileUpload}
          />
          <span className="text-xs text-muted-foreground tabular-nums">
            {value.length.toLocaleString()} chars
          </span>
        </div>
      </div>

      {/* Panels — split on large screens, tabbed on smaller */}
      <div 
        className="grid lg:grid-cols-2 lg:divide-x lg:divide-border"
        style={{ height: "max(80vh, 600px)" }}
      >
        {/* Write panel */}
        <div
          className={cn(
            "h-full overflow-y-auto bg-[#1e1e1e] dark:bg-[#1e1e1e]",
            activeTab === "write" ? "block" : "hidden lg:block"
          )}
        >
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-full min-h-full resize-none bg-transparent px-6 py-5 font-mono text-sm leading-relaxed text-[#d4d4d4] placeholder:text-muted-foreground focus:outline-none"
            spellCheck={false}
          />
        </div>

        {/* Preview panel */}
        <div
          className={cn(
            "h-full overflow-y-auto bg-background",
            activeTab === "preview" ? "block" : "hidden lg:block"
          )}
        >
          {value.trim() ? (
            <div className="px-8 py-8 md:px-12">
              <MarkdownRenderer content={value} />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-sm text-muted-foreground">
              Nothing to preview yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
