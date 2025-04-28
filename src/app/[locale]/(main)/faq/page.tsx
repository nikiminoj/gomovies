"use client";
import { useQuery } from '@tanstack/react-query';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TypographyH2, TypographyH4 } from '@/components/ui/typography';

interface QuestionItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  questions: QuestionItem[];
}

const fetchFaqs = async (): Promise<FAQCategory[]> => {
  const response = await fetch('/api/faqs');
  if (!response.ok) {
    throw new Error('Failed to fetch FAQs');
  }
  return response.json();
};

const FaqPage = () => {
  const {
    data: faqs,
    isLoading,
    error,
  } = useQuery<FAQCategory[], Error>({
    queryKey: ['faqs-with-categories'],
    queryFn: fetchFaqs,
  });

  return (
    <div className="container mx-auto py-12">
      <TypographyH4>
        Frequently Asked Questions
      </TypographyH4>
      {isLoading ? (
        <p>Loading FAQs...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : !faqs || faqs.length === 0 ? (
        <p>No FAQs available at the moment.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((category, catIndex) => (
            <div key={catIndex}>
              <TypographyH4>{category.category}</TypographyH4>
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem
                  key={`${catIndex}-${faqIndex}`}
                  value={`${catIndex}-${faqIndex}`}
                >
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </div>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default FaqPage;