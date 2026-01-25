"use client"

import { useState } from "react"
import { Send, Bot, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  role: "ai" | "user"
  content: string
}

interface AISidebarProps {
  onAutoRoute: () => void
}

export function AISidebar({ onAutoRoute }: AISidebarProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! I am Codexian AI. I can help you design and route your PCB. Try asking me to 'route the heart sensor'." }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg = input
    setMessages(prev => [...prev, { role: "user", content: userMsg }])
    setInput("")
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      let aiResponse = "I'm not sure how to do that yet."
      
      if (userMsg.toLowerCase().includes("route") || userMsg.toLowerCase().includes("heart")) {
        aiResponse = "I see an ESP32 and an AD8232. Optimizing placement and routing tracks for a Heart Beat Sensor..."
        onAutoRoute() // This triggers the "Magic" in MainLayout
      }

      setMessages(prev => [...prev, { role: "ai", content: aiResponse }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex h-full flex-col bg-background border-r">
      <div className="p-4 border-b flex items-center gap-2">
        <Bot className="h-5 w-5 text-primary" />
        <h2 className="text-sm font-semibold">Codexian AI</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${m.role === "ai" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                {m.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className={`px-3 py-2 rounded-md text-sm max-w-[85%] ${m.role === "ai" ? "bg-muted" : "bg-primary text-primary-foreground"}`}>
                {m.content}
              </div>
            </div>
          ))}
          {isTyping && (
             <div className="flex gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4" />
              </div>
              <div className="px-3 py-2 rounded-md text-sm bg-muted text-muted-foreground animate-pulse">
                Thinking...
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t gap-2 flex">
        <Input 
          placeholder="Ask AI to route..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <Button size="icon" onClick={handleSend}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
