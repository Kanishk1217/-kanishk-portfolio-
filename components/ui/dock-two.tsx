import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
interface DockProps {
  className?: string
  items: {
    icon: React.ElementType
    label: string
    onClick?: () => void
  }[]
}

interface DockIconButtonProps {
  icon: React.ElementType
  label: string
  onClick?: () => void
  className?: string
}


const DockIconButton = React.forwardRef<HTMLButtonElement, DockIconButtonProps>(
  ({ icon: Icon, label, onClick, className }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.15, y: -4 }}
        whileTap={{ scale: 0.93 }}
        onClick={onClick}
        className={cn(
          "relative group p-3 rounded-xl cursor-pointer",
          "hover:bg-secondary transition-colors duration-150",
          className
        )}
      >
        <Icon className="w-5 h-5 text-foreground" />
        <span
          className={cn(
            "absolute -top-9 left-1/2 -translate-x-1/2",
            "px-2 py-1 rounded text-[9px] font-mono tracking-widest uppercase",
            "bg-popover text-popover-foreground border border-border",
            "opacity-0 group-hover:opacity-100",
            "transition-opacity duration-150 whitespace-nowrap pointer-events-none"
          )}
        >
          {label}
        </span>
      </motion.button>
    )
  }
)
DockIconButton.displayName = "DockIconButton"

const Dock = React.forwardRef<HTMLDivElement, DockProps>(({ items, className }, ref) => {
  return (
    <motion.div
      ref={ref}
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className={cn(
        "flex items-center gap-1 px-3 py-2 rounded-2xl",
        "backdrop-blur-xl border shadow-2xl",
        "bg-background/85 border-border",
        className
      )}
    >
      {items.map((item) => (
        <DockIconButton key={item.label} {...item} />
      ))}
    </motion.div>
  )
})
Dock.displayName = "Dock"

export { Dock }
