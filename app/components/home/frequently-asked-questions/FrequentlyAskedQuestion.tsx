'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { frequentlyAskedQuestion, frequentlyAskedQuestions } from '@/assets/data'



const FrequentlyAskedQuestion = () => {
  return (
    <Accordion type="single" collapsible className="w-full mt-8">
      {frequentlyAskedQuestions.map((item:frequentlyAskedQuestion, index:number) => (
        <AccordionItem value={`item-${index}`} key={index}>
          <AccordionTrigger className='px-2'>
            <p className='lg:text-xl text-lg'>{item.question}</p>
          </AccordionTrigger>
          <AccordionContent className='px-2'>
          <p className='text-base lg:text-lg font-semibold'>{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FrequentlyAskedQuestion;