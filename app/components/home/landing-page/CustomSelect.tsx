"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


type customSelectProps = {
  name: string, 
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
  stringArray: string[]
}

export function CustomSelect ({name, value, setValue, stringArray}:customSelectProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="md:w-[236px] w-[316px] justify-between text-base rounded"
        >
          {value
            ? stringArray.find((string) => string === value)
            : "Select" + " " + name + "..."}
          <CaretSortIcon className="ml-2 h-5 w-5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[236px] w-[316px] p-0 rounded">
        <Command>
          <CommandInput placeholder={`Search ${name}...`} className="h-9 text-base" />
          <CommandList>
            <CommandEmpty>
              <p className="text-base">{`No ${name} found.`}</p>
            </CommandEmpty>
            <CommandGroup>
              {stringArray.map((string, index:number) => (
                <CommandItem
                  className="rounded"
                  key={index}
                  value={string}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <p className="text-base">{string}</p>
                  <CheckIcon
                    className={cn(
                      "ml-auto h-5 w-5",
                      value === string ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
