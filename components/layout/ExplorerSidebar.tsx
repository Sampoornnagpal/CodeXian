"use client"

import { FileIcon, FolderIcon } from "lucide-react"

interface ExplorerSidebarProps {
  files: {[key: string]: string};
  activeFile: string;
  onSelectFile: (fileName: string) => void;
}

export function ExplorerSidebar({ files, activeFile, onSelectFile }: ExplorerSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Explorer</h2>
      </div>
      <div className="flex flex-col gap-1 p-2">
        <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">FILES</div>
        {Object.keys(files).map((fileName) => (
          <button
            key={fileName}
            onClick={() => onSelectFile(fileName)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm hover:bg-accent/50 transition-colors ${
              activeFile === fileName ? "bg-accent text-accent-foreground" : "text-foreground"
            }`}
          >
            <span className="opacity-70">📄</span>
            {fileName}
          </button>
        ))}
      </div>
    </div>
  )
}
