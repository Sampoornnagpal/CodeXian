import { Cpu, Activity, Lightbulb } from "lucide-react"

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
  return (
    <div className="flex h-full flex-col bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">Components</h2>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <DraggableItem 
          type="ESP32" 
          label="ESP32-WROOM" 
          icon={<Cpu className="h-5 w-5" />} 
        />
        <DraggableItem 
          type="AD8232" 
          label="AD8232 Heart Sensor" 
          icon={<Activity className="h-5 w-5" />} 
        />
         <DraggableItem 
          type="LED" 
          label="LED (0603)" 
          icon={<Lightbulb className="h-5 w-5" />} 
        />
      </div>
    </div>
  )
}
