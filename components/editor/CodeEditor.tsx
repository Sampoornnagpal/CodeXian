
"use client"

import { Editor } from "@monaco-editor/react"
import { useCopilotReadable } from "@copilotkit/react-core"

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  // useCopilotReadable({
  //   description: "The current KiCad PCB S-expression code",
  //   value: value,
  // })

  return (
    <div className="h-full w-full bg-[#1e1e1e]">
       <Editor
        height="100%"
        defaultLanguage="clojure"
        value={value}
        onChange={onChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'Geist Mono', monospace",
          scrollBeyondLastLine: false,
          padding: { top: 16 }
        }}
      />
    </div>
  )
}

