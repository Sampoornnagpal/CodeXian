"use client"

import { useState } from "react"
// import { CopilotKit } from "@copilotkit/react-core"
// import { CopilotSidebar } from "@copilotkit/react-ui"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ActivityBar } from "./ActivityBar"
import { ExplorerSidebar } from "./ExplorerSidebar"
import { AISidebar } from "./AISidebar"
import { ComponentsSidebar } from "./ComponentsSidebar"
import { CodeEditor } from "@/components/editor/CodeEditor"
import { PCBRenderer } from "@/components/pcb/PCBRenderer"

// Pre-canned mock implementations for the YC Demo
const ESP32_FOOTPRINT = `
  (module "ESP32-WROOM-32" (layer F.Cu) (tedit 5A0AB689)
    (at 70 60)
    (fp_text reference U1 (at 0 -10) (layer F.SilkS)
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text value ESP32-WROOM-32 (at 0 10) (layer F.Fab)
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (pad 1 smd rect (at -9 -6) (size 2 0.8) (layers F.Cu F.Paste F.Mask))
    (pad 2 smd rect (at -9 -4.73) (size 2 0.8) (layers F.Cu F.Paste F.Mask))
    (pad 3 smd rect (at -9 -3.46) (size 2 0.8) (layers F.Cu F.Paste F.Mask))
    (pad 38 smd rect (at 9 -6) (size 2 0.8) (layers F.Cu F.Paste F.Mask))
    (pad 37 smd rect (at 9 -4.73) (size 2 0.8) (layers F.Cu F.Paste F.Mask))
  )`

const AD8232_FOOTPRINT = `
  (module "AD8232_Heart_Sensor" (layer F.Cu) (tedit 5A0AB689)
    (at 110 60)
    (fp_text reference U2 (at 0 -8) (layer F.SilkS)
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text value AD8232_Module (at 0 8) (layer F.Fab)
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (pad 1 smd rect (at -5 -3) (size 1.5 0.8) (layers F.Cu F.Paste F.Mask))
    (pad 2 smd rect (at -5 -1.5) (size 1.5 0.8) (layers F.Cu F.Paste F.Mask))
    (pad 3 smd rect (at -5 0) (size 1.5 0.8) (layers F.Cu F.Paste F.Mask))
    (pad 4 smd rect (at 5 0) (size 1.5 0.8) (layers F.Cu F.Paste F.Mask))
  )`

const LED_FOOTPRINT = `
  (module "LED_0603" (layer F.Cu) (tedit 5A0AB689)
    (at 135 98)
    (fp_text reference D1 (at 0 -2) (layer F.SilkS)
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (fp_text value LED (at 0 2) (layer F.Fab)
      (effects (font (size 1 1) (thickness 0.15)))
    )
    (pad 1 smd rect (at -0.75 0) (size 0.8 0.8) (layers F.Cu F.Paste F.Mask))
    (pad 2 smd rect (at 0.75 0) (size 0.8 0.8) (layers F.Cu F.Paste F.Mask))
  )`

const ROUTED_TRACKS = `
  (segment (start 79 54) (end 105 57) (width 0.25) (layer F.Cu) (net 1))
  (segment (start 79 55.27) (end 105 58.5) (width 0.25) (layer F.Cu) (net 2))
  (segment (start 79 56.54) (end 105 60) (width 0.25) (layer F.Cu) (net 3))
`

const DEFAULT_CODE = `(kicad_pcb (version 20211014) (generator pcbnew)

  (general
    (thickness 1.6)
  )

  (layers
    (0 F.Cu signal)
    (31 B.Cu signal)
    (32 B.Adhes user)
    (33 F.Adhes user)
    (34 B.Paste user)
    (35 F.Paste user)
    (36 B.SilkS user)
    (37 F.SilkS user)
    (38 B.Mask user)
    (39 F.Mask user)
    (40 Dwgs.User user)
    (41 Cmts.User user)
    (42 Eco1.User user)
    (43 Eco2.User user)
    (44 Edge.Cuts user)
    (45 Margin user)
    (46 B.CrtYd user)
    (47 F.CrtYd user)
    (48 B.Fab user)
    (49 F.Fab user)
  )

  (setup
    (stackup
      (layer F.SilkS (type "Top Silk Screen"))
      (layer F.Paste (type "Top Solder Paste"))
      (layer F.Mask (type "Top Solder Mask"))
      (layer F.Cu (type "copper") (thickness 0.035))
      (layer B.Cu (type "copper") (thickness 0.035))
      (layer B.Mask (type "Bottom Solder Mask"))
      (layer B.Paste (type "Bottom Solder Paste"))
      (layer B.SilkS (type "Bottom Silk Screen"))
      (copper_finish "None")
      (dielectric_constraints no)
    )
    (pad_to_mask_clearance 0)
    (solder_mask_min_width 0)
    (pad_to_paste_clearance 0)
    (aux_axis_origin 0 0)
    (grid_origin 0 0)
    (visible_elements FFFF FFFFFF)
    (pcbplotparams
      (layerselection 0x00030_80000001)
      (usegerberextensions false)
      (usegerberattributes true)
      (usegerberadvancedattributes true)
      (creategerberjobfile true)
      (svguseinch false)
      (svgprecision 6)
      (excludeedgelayer true)
      (linewidth 0.100000)
      (plotframeref false)
      (viasonmask false)
      (mode 1)
      (useauxorigin false)
      (hpglpennumber 1)
      (hpglpenspeed 20)
      (hpglpendiameter 15.000000)
      (dxfpolygonmode true)
      (dxfimperialunits true)
      (dxfusepcbnewfont true)
      (psnegative false)
      (psa4output false)
      (plotreference true)
      (plotvalue true)
      (plotinvisibletext false)
      (sketchpadsonfab false)
      (subtractmaskfromsilk false)
      (outputformat 1)
      (mirror false)
      (drillshape 1)
      (scaleselection 1)
      (outputdirectory "")
    )
  )

  (net 0 "")
  (net 1 "GND")
  (net 2 "+3V3")
  (net 3 "AD8232_OUT")

  (gr_line (start 0 0) (end 170 0) (layer Edge.Cuts) (width 0.1))
  (gr_line (start 170 0) (end 170 120) (layer Edge.Cuts) (width 0.1))
  (gr_line (start 170 120) (end 0 120) (layer Edge.Cuts) (width 0.1))
  (gr_line (start 0 120) (end 0 0) (layer Edge.Cuts) (width 0.1))

)`

export function MainLayout() {
  const [activeTab, setActiveTab] = useState("ai") // Start on AI for demo
  const [activeFile, setActiveFile] = useState("main.kicad_pcb")
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [files, setFiles] = useState<{[key:string]: string}>({
    "main.kicad_pcb": DEFAULT_CODE,
    "utils.js": "// Helper functions for EDA tools\nexport const constrain = (v, min, max) => Math.min(Math.max(v, min), max);",
    "README.md": "# Codexian Demo\n\n Drag components and ask AI to route!",
  })

  // Helper to update active file content
  const updateFileContent = (newContent: string) => {
    setFiles(prev => ({...prev, [activeFile]: newContent}))
  }

  // Handle dropping a component onto the PCB area
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)
    const type = e.dataTransfer.getData("componentType")
    
    // Logic: Append the footprint to the code
    let snippet = ""
    if (type === "ESP32") snippet = ESP32_FOOTPRINT
    if (type === "AD8232") snippet = AD8232_FOOTPRINT
    if (type === "LED") snippet = LED_FOOTPRINT
    
    if (snippet) {
        // Simple insertion before the last closing parenthesis
        const currentCode = files[activeFile]
        
        // Find the last parenthesis associated with the file structure
        const insertionPoint = currentCode.lastIndexOf(")")
        
        // Insert and update
        const newCode = currentCode.slice(0, insertionPoint) + snippet + "\n)"
        updateFileContent(newCode)
    }
  }

  // Handle "Auto Route" command from AI Sidebar
  const handleAutoRoute = () => {
    console.log("Auto-Route Triggered!"); // DEBUG
    const currentCode = files[activeFile]
    const insertionPoint = currentCode.lastIndexOf(")")
    const newCode = currentCode.slice(0, insertionPoint) + ROUTED_TRACKS + "\n)"
    console.log("New Code Length:", newCode.length); // DEBUG
    updateFileContent(newCode)
  }

  return (
    // <CopilotKit... disabled for demo stability>
            <div className="flex h-screen w-screen bg-background overflow-hidden">
                {/* Activity Bar (Fixed) */}
                <ActivityBar activeTab={activeTab} onTabChange={setActiveTab} />

                {/* Main Resizable Area */}
                <ResizablePanelGroup direction="horizontal" className="flex-1">
                    
                    {/* Sidebar Panel */}
                    <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="border-r">
                       {activeTab === 'explorer' && (
                         <ExplorerSidebar 
                           files={files} 
                           activeFile={activeFile} 
                           onSelectFile={setActiveFile} 
                         />
                       )}
                       {activeTab === 'search' && (
                         <div className="p-4 text-muted-foreground text-sm">Search not implemented for demo.</div>
                       )}
                       {activeTab === 'ai' && (
                         <AISidebar onAutoRoute={handleAutoRoute} />
                       )}
                       {activeTab === 'components' && (
                         <ComponentsSidebar />
                       )}
                    </ResizablePanel>
                    
                    <ResizableHandle />

                    {/* Editor Area */}
                    <ResizablePanel defaultSize={80}>
                        <ResizablePanelGroup direction="horizontal">
                            
                            {/* Monaco Editor Pane */}
                            <ResizablePanel defaultSize={50} minSize={30} className="border-r">
                                <CodeEditor 
                                  key={files[activeFile].length} // Force re-render on content change
                                  value={files[activeFile]} 
                                  onChange={(val) => updateFileContent(val || "")} 
                                />
                            </ResizablePanel>

                            <ResizableHandle />

                            {/* PCB Preview Pane - Drop Zone */}
                            <ResizablePanel defaultSize={50} minSize={30}>
                                <div 
                                  className={`h-full w-full transition-all duration-300 ${isDraggingOver ? "ring-2 ring-primary ring-inset bg-primary/5" : ""}`}
                                  onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
                                  onDragLeave={() => setIsDraggingOver(false)}
                                  onDrop={handleDrop}
                                >
                                  <PCBRenderer code={files["main.kicad_pcb"]} />
                                </div>
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>

                </ResizablePanelGroup>
            </div>
    // </CopilotKit>
  )
}
