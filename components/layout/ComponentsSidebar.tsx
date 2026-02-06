import { useState } from "react"
import { Cpu, Activity, Lightbulb, Box } from "lucide-react"
import { ExtensionMarketplace, MarketplaceItem } from "./ExtensionMarketplace"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DraggableItemProps {
  type: string
  label: string
  icon: React.ReactNode
}

function DraggableItem({ type, label, icon }: DraggableItemProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("componentType", type)
    e.dataTransfer.effectAllowed = "copy"
  }

  return (
    <div 
      draggable 
      onDragStart={handleDragStart}
      className="flex items-center gap-3 p-3 bg-card border rounded-md cursor-grab active:cursor-grabbing hover:border-primary transition-colors"
    >
      <div className="text-muted-foreground">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

export function ComponentsSidebar() {
  const [installedComponents, setInstalledComponents] = useState<DraggableItemProps[]>([
    { type: "ESP32", label: "ESP32-WROOM", icon: <Cpu className="h-5 w-5" /> },
    { type: "AD8232", label: "AD8232 Heart Sensor", icon: <Activity className="h-5 w-5" /> },
    { type: "LED", label: "LED (0603)", icon: <Lightbulb className="h-5 w-5" /> },
  ])

  const handleInstall = (item: MarketplaceItem) => {
    // Prevent duplicates
    if (installedComponents.find(c => c.type === item.id)) return

    setInstalledComponents(prev => [
      ...prev,
      {
        type: item.id,
        label: item.label,
        icon: item.icon // Or map to specific icons if needed, but item.icon is fine
      }
    ])
  }

  return (
    <div className="flex h-full flex-col bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Components</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-4">
          {installedComponents.map((comp) => (
            <DraggableItem 
              key={comp.type}
              type={comp.type}
              label={comp.label}
              icon={comp.icon}
            />
          ))}
        </div>

        <div className="my-2 border-t mx-4" />

        <ExtensionMarketplace onInstall={handleInstall} />
      </ScrollArea>
    </div>
  )
}
