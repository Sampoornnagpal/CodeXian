"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, ZoomIn, ZoomOut, Move } from "lucide-react"

interface PCBRendererProps {
  code: string;
}

interface Point { x: number; y: number }

interface RenderEntity {
  type: 'track' | 'pad' | 'module_body' | 'text';
  points?: Point[];
  center?: Point;
  width?: number;
  height?: number;
  color?: string;
  text?: string;
  rotation?: number; // degrees
}

export function PCBRenderer({ code }: PCBRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [scale, setScale] = useState(10) // Zoom level
  const [offset, setOffset] = useState({ x: 85, y: 60 }) // Pan offset (Center of 170x120 board)
  const [entities, setEntities] = useState<RenderEntity[]>([])

  // Parse S-Expression Code
  useEffect(() => {
    if (!code) return

    const newEntities: RenderEntity[] = []
    
    // 1. EXTRACT TRACKS: (segment (start X Y) (end X Y) (width W) ...)
    const segmentRegex = /\(segment\s+\(start\s+([\d.-]+)\s+([\d.-]+)\)\s+\(end\s+([\d.-]+)\s+([\d.-]+)\)\s+\(width\s+([\d.-]+)\)/g
    let match;
    while ((match = segmentRegex.exec(code)) !== null) {
      newEntities.push({
        type: 'track',
        points: [
          { x: parseFloat(match[1]), y: parseFloat(match[2]) },
          { x: parseFloat(match[3]), y: parseFloat(match[4]) }
        ],
        width: parseFloat(match[5])
      })
    }

    // 2. EXTRACT MODULES
    // Simple parser to find modules and their pads
    const lines = code.split('\n')
    let currentModule: { x: number, y: number, name: string } | null = null

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim()
        
        // Start Module
        if (line.startsWith('(module')) {
            // Find position in next few lines
            // Look ahead for (at X Y)
            let limit = 5;
            let atX = 0, atY = 0;
            for(let j=1; j<=limit; j++) {
                if (lines[i+j] && lines[i+j].includes('(at ')) {
                    const atMatch = lines[i+j].match(/\(at\s+([\d.-]+)\s+([\d.-]+)/)
                    if (atMatch) {
                        atX = parseFloat(atMatch[1])
                        atY = parseFloat(atMatch[2])
                    }
                    break;
                }
            }
            
            // Determine size based on name (Super hacky for demo, but reliable)
            let w = 18, h = 25; // default
            if (line.includes("ESP32")) { w = 18; h = 25.5; }
            if (line.includes("AD8232")) { w = 30; h = 20; } // Wider
            if (line.includes("LED")) { w = 2; h = 1; }

            currentModule = { x: atX, y: atY, name: line }
            
            // Add Module Body
            newEntities.push({
                type: 'module_body',
                center: { x: atX, y: atY },
                width: w,
                height: h
            })
            
            // Add Label
            const nameMatch = line.match(/"([^"]+)"/)
            const label = nameMatch ? nameMatch[1] : "Module"
            newEntities.push({
                type: 'text',
                text: label,
                center: { x: atX, y: atY - (h/2) - 2 }
            })
        }

        // Find Pads within Module
        if (currentModule && line.startsWith('(pad')) {
           // (pad Num smd rect (at X Y) (size W H) ...)
           const padAt = line.match(/\(at\s+([\d.-]+)\s+([\d.-]+)\)/)
           const padSize = line.match(/\(size\s+([\d.-]+)\s+([\d.-]+)\)/)
           
           if (padAt && padSize) {
               const relX = parseFloat(padAt[1])
               const relY = parseFloat(padAt[2])
               const pW = parseFloat(padSize[1])
               const pH = parseFloat(padSize[2])
               
               newEntities.push({
                   type: 'pad',
                   center: { x: currentModule.x + relX, y: currentModule.y + relY },
                   width: pW,
                   height: pH
               })
           }
        }
    }

    setEntities(newEntities)

  }, [code])

  // Draw Function
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to parent
    const parent = canvas.parentElement
    if (parent) {
        canvas.width = parent.clientWidth
        canvas.height = parent.clientHeight
    }

    // Clear Screen
    ctx.fillStyle = '#111111' // Dark Background
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Transform Context
    ctx.save()
    ctx.translate(canvas.width / 2, canvas.height / 2) // Center Origin
    ctx.scale(scale, scale)
    ctx.translate(-offset.x, -offset.y) // Apply Pan

    // 1. Draw Module Bodies (Dark Grey Rects)
    entities.filter(e => e.type === 'module_body').forEach(mod => {
        if (!mod.center || !mod.width || !mod.height) return
        ctx.fillStyle = '#2a2a2a'
        ctx.strokeStyle = '#444'
        ctx.lineWidth = 0.1
        ctx.beginPath()
        ctx.roundRect(
            mod.center.x - mod.width/2, 
            mod.center.y - mod.height/2, 
            mod.width, 
            mod.height, 
            1
        )
        ctx.fill()
        ctx.stroke()
    })

    // 2. Draw Pads (Silver/Gold)
    entities.filter(e => e.type === 'pad').forEach(pad => {
        if (!pad.center || !pad.width || !pad.height) return
        ctx.fillStyle = '#c0c0c0' // Silver pad
        ctx.fillRect(
             pad.center.x - pad.width/2, 
             pad.center.y - pad.height/2, 
             pad.width, 
             pad.height
        )
    })

    // 3. Draw Tracks (NEON GREEN GLOW)
    entities.filter(e => e.type === 'track').forEach(track => {
        if (!track.points) return
        
        // Glow Effect
        ctx.shadowBlur = 10
        ctx.shadowColor = '#39ff14' // Neon Green
        ctx.strokeStyle = '#39ff14'
        ctx.lineWidth = (track.width || 0.25)
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(track.points[0].x, track.points[0].y)
        ctx.lineTo(track.points[1].x, track.points[1].y)
        ctx.stroke()
        
        ctx.shadowBlur = 0 // Reset
    })

    // 4. Draw Text
    entities.filter(e => e.type === 'text').forEach(txt => {
        if (!txt.center || !txt.text) return
        ctx.fillStyle = '#ffffff'
        ctx.font = '1px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(txt.text, txt.center.x, txt.center.y)
    })

    ctx.restore()

  }, [entities, scale, offset])


  return (
    <div className="relative h-full w-full bg-[#111] overflow-hidden flex flex-col">
       <div className="absolute top-2 right-2 z-10 flex gap-2">
        <Button variant="secondary" size="sm" onClick={() => setScale(s => s * 1.2)}>
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm" onClick={() => setScale(s => s / 1.2)}>
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>
      
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      
      <div className="absolute bottom-2 left-2 text-[10px] text-zinc-500 pointer-events-none">
        Custom PCB Renderer v1.0 • Neon Mode
      </div>
    </div>
  )
}
