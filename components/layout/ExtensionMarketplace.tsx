import { Download, Box, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface MarketplaceItem {
  id: string
  label: string
  description: string
  icon: React.ReactNode
}

interface ExtensionMarketplaceProps {
  onInstall: (item: MarketplaceItem) => void
}

const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: "DHT11",
    label: "DHT11 Sensor",
    description: "Temp & Humidity",
    icon: <Box className="h-5 w-5" />
  },
  {
    id: "OLED",
    label: "OLED Display",
    description: "128x64 I2C Screen",
    icon: <Box className="h-5 w-5" />
  },
  {
    id: "SERVO",
    label: "Servo Motor",
    description: "SG90 Micro Servo",
    icon: <Box className="h-5 w-5" />
  },
  {
    id: "ULTRASONIC",
    label: "Ultrasonic",
    description: "HC-SR04 Distance",
    icon: <Box className="h-5 w-5" />
  },
]

export function ExtensionMarketplace({ onInstall }: ExtensionMarketplaceProps) {
  return (
    <div className="flex flex-col gap-2 p-4 pt-0">
      <div className="flex items-center gap-2 pb-2 text-muted-foreground">
        <Download className="h-4 w-4" />
        <h3 className="text-sm font-semibold tracking-wide uppercase">Marketplace</h3>
      </div>
      
      <div className="flex flex-col gap-2">
        {MARKETPLACE_ITEMS.map((item) => (
          <div 
            key={item.id}
            className="flex items-center justify-between p-3 bg-secondary/20 border border-transparent hover:border-primary/20 rounded-md transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="text-primary">{item.icon}</div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.description}</span>
              </div>
            </div>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onInstall(item)}
              title="Install Component"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
