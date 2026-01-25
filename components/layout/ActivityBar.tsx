import { Files, Search, Brain, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActivityBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function ActivityBar({ activeTab, onTabChange }: ActivityBarProps) {
  const tabs = [
    { id: 'explorer', icon: <Files className="h-5 w-5" />, label: "Files" },
    { id: 'search', icon: <Search className="h-5 w-5" />, label: "Search" },
    { id: 'ai', icon: <Brain className="h-5 w-5" />, label: "AI Copilot" },
    { id: 'components', icon: <Cpu className="h-5 w-5" />, label: "Components" },
  ]

  return (
    <div className="flex w-12 flex-col items-center border-r bg-muted/40 py-2">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          size="icon"
          className={`mb-2 h-10 w-10 text-muted-foreground hover:text-foreground ${
            activeTab === tab.id ? "bg-background text-foreground border-l-2 border-primary rounded-none" : ""
          }`}
          onClick={() => onTabChange(tab.id)}
          title={tab.label}
        >
          {tab.icon}
        </Button>
      ))}
    </div>
  )
}
