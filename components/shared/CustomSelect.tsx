'use client'

import React from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  data: string[]
  placeholder: string
  value:string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const CustomSelect = ({data, placeholder, value, setValue}:Props) => {

  const handleSelectChange = (value: string) => {
    setValue(value);
  };

  return (
    <Select value={value} onValueChange={handleSelectChange}>
      <SelectTrigger className="capitalize w-full text-base bg-inherit rounded ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-none focus:ring-offset-0">
        <SelectValue placeholder={placeholder} className="capitalize"/>
      </SelectTrigger>
      <SelectContent className="rounded">
        <SelectGroup>
          {data && data.length > 0 && data.map((item:string, index:number) => (
            <SelectItem value={item} className="text-base rounded capitalize" key={index}>{item.split('-').join(' ')}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CustomSelect;