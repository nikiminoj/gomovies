import { NextResponse } from 'next/server';

export async function GET() {
  const faqs = [
    {
      "category": "Access & Availability",
      "questions": [
        {
          "question": "Do I need an account to watch movies?",
          "answer": "No, all content is freely accessible without requiring a user account."
        },
        {
          "question": "Is the website legal and safe to use?",
          "answer": "Yes, all content provided follows legal streaming regulations and ensures a secure viewing experience."
        }
      ]
    },
    {
      "category": "Streaming & Connectivity",
      "questions": [
        {
          "question": "Why is the video buffering?",
          "answer": "Buffering may occur due to slow internet speed. Try restarting your router or using a wired connection."
        },
        {
          "question": "Does the website support HD and 4K streaming?",
          "answer": "Yes, content is available in multiple resolutions, including HD and 4K, depending on the movie."
        }
      ]
    },
    {
      "category": "Device Compatibility",
      "questions": [
        {
          "question": "Can I watch movies on my mobile device?",
          "answer": "Yes, the website is optimized for smartphones, tablets, and desktop browsers."
        },
        {
          "question": "Is there an app available?",
          "answer": "Currently, the service is web-based, but an app may be introduced in the future."
        }
      ]
    }
  ];

  return NextResponse.json(faqs);
}