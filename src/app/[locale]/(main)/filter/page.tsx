"use client";

import { Filter } from "@/components/filter";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { TypographyH1 } from "@/components/ui/typography";
import * as motion from "motion/react-client";

export default function FilterPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto">
        <Accordion type="single" collapsible>
          <AccordionItem value="filter">
            <AccordionTrigger>Filter
            </AccordionTrigger>
            <AccordionContent>
              <Filter />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-row items-center justify-between">
          <TypographyH1>Filter results</TypographyH1>
        </div>

      </div>
      <div className="container mx-auto mt-10 max-w-6xl p-4">
        
      </div>
    </motion.div >
  );
}