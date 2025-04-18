"use client";
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FAQItem {
  question: string;
  answer: string;
}

const FaqPage = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API call or data fetching logic
        const response = await fetch('/api/faqs'); // Assuming you have an API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch FAQs');
        }
        const data: FAQItem[] = await response.json();
        setFaqs(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching FAQs');
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return <p>Loading FAQs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {faqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p>No FAQs available at the moment.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqPage;