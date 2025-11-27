"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Dialog, DialogContent } from "@/components/shadcn/ui/dialog"

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-lg",
      className
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName ?? "Command"

type DialogProps = React.ComponentProps<typeof Dialog>

const CommandDialog = ({
  children,
  ...props
}: DialogProps &
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>) => {
  const { open, onOpenChange, defaultOpen, modal, ...commandProps } = props

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={defaultOpen}
      modal={modal}
    >
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command
          className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:mb-1 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]]:px-3 [&_[cmdk-list]]:max-h-[400px] [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-2"
          {...commandProps}
        >
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  )
}

const CommandInput = React.forwardRef<
  React.ElementRef<(typeof CommandPrimitive)["Input"]>,
  React.ComponentPropsWithoutRef<(typeof CommandPrimitive)["Input"]>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
))
CommandInput.displayName = CommandPrimitive.Input.displayName ?? "CommandInput"

const CommandList = React.forwardRef<
  React.ElementRef<(typeof CommandPrimitive)["List"]>,
  React.ComponentPropsWithoutRef<(typeof CommandPrimitive)["List"]>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[400px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName ?? "CommandList"

const CommandEmpty = React.forwardRef<
  React.ElementRef<(typeof CommandPrimitive)["Empty"]>,
  React.ComponentPropsWithoutRef<(typeof CommandPrimitive)["Empty"]>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="text-muted-foreground py-4 text-center text-sm"
    {...props}
  />
))
CommandEmpty.displayName = CommandPrimitive.Empty.displayName ?? "CommandEmpty"

const CommandGroup = React.forwardRef<
  React.ElementRef<(typeof CommandPrimitive)["Group"]>,
  React.ComponentPropsWithoutRef<(typeof CommandPrimitive)["Group"]>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "text-foreground overflow-hidden py-3 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    )}
    {...props}
  />
))
CommandGroup.displayName = CommandPrimitive.Group.displayName ?? "CommandGroup"

const CommandSeparator = React.forwardRef<
  React.ElementRef<(typeof CommandPrimitive)["Separator"]>,
  React.ComponentPropsWithoutRef<(typeof CommandPrimitive)["Separator"]>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 h-px bg-border", className)}
    {...props}
  />
))
CommandSeparator.displayName = CommandPrimitive.Separator.displayName ?? "CommandSeparator"

const CommandItem = React.forwardRef<
  React.ElementRef<(typeof CommandPrimitive)["Item"]>,
  React.ComponentPropsWithoutRef<(typeof CommandPrimitive)["Item"]>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "aria-selected:bg-accent aria-selected:text-accent-foreground relative flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-2 text-sm outline-hidden data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
CommandItem.displayName = CommandPrimitive.Item.displayName ?? "CommandItem"

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
    {...props}
  />
)
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
}
