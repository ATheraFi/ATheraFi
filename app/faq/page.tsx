import React from 'react';

const FAQPage = () => {
  const faqs = [
    {
      question: 'What therapies does ATheraFi support?',
      answer: `Currently, ATheraFi is supporting ABA, Occupational, and Physical Therapy. We plan on expanding our support, but we are dedicated to 
      providing the best possible service to everyone. So we are starting small, getting things perfect, and then expanding on a solid foundation.`
    },
    {
      question: "Why can't I find anything in my area?",
      answer: `Our database of providers is ever growing. When you make a search request to an area and no results show up,
      it triggers and event that tells us to do research. We then reach out to as many services as we can find in the surrounding
      area and try to get them registered.`
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h1>
      <p className="mb-6">If you have any questions, email us at: <strong>info@atherafi.com</strong></p>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
