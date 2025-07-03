import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Code,
  Zap,
} from 'lucide-react';

const colorMap = {
  blue:  { bg: 'bg-blue-50',  text: 'text-blue-600' },
  green: { bg: 'bg-green-50', text: 'text-green-600' },
  purple:{ bg: 'bg-purple-50',text: 'text-purple-600' },
  orange:{ bg: 'bg-orange-50', text: 'text-orange-600' },
} as const;

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: 'General Questions',
      icon: <HelpCircle className="w-6 h-6" />,
      color: 'blue',
      questions: [
        {
          question: 'What makes YourWebPartner different from other web developers?',
          answer:
            'We focus on affordable, high-quality websites for startups and small businesses. Services include transparent pricing, responsive design, and built-in SEO optimisation.',
        },
        {
          question: 'Do you work with clients outside of Vijayawada?',
          answer:
            'Yes. We collaborate with clients throughout India and internationally using online communication and project-management tools.',
        },
        {
          question: 'Which technologies do you use for web development?',
          answer:
            'Our stack includes React, Next.js, WordPress, HTML5, CSS3 and JavaScript. We select the best technology mix for each project’s requirements.',
        },
        {
          question: 'Can you improve an existing website?',
          answer:
            'Certainly. We offer redesigns, performance optimisation, mobile responsiveness upgrades and SEO enhancements.',
        },
      ],
    },
    {
      title: 'Pricing & Payments',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'green',
      questions: [
        {
          question: 'Why are your prices competitive?',
          answer:
            'Efficient processes and standardised workflows enable us to deliver professional sites at lower cost without compromising quality.',
        },
        {
          question: 'Are there any hidden costs?',
          answer:
            'No. All costs are specified in advance. Additional fees apply only for agreed premium plugins or bespoke third-party integrations.',
        },
        {
          question: 'Do you offer payment plans?',
          answer:
            'Yes. For larger projects we offer staged payments (e.g. 50% start, 25% design approval, 25% completion) or EMI arrangements.',
        },
        {
          question: 'What is covered in maintenance packages?',
          answer:
            'Packages include backups, security patches, plugin updates, minor content updates and performance checks. Premium plans add SEO monitoring and monthly reporting.',
        },
      ],
    },
    {
      title: 'Project Timeline & Process',
      icon: <Clock className="w-6 h-6" />,
      color: 'purple',
      questions: [
        {
          question: 'How long does a website build take?',
          answer:
            'Typical timelines: Basic sites 2–4 weeks, Professional 4–6 weeks, Enterprise 6–12 weeks—subject to scope and feedback turnaround.',
        },
        {
          question: 'What is your development process?',
          answer:
            '1) Discovery, 2) Design approval, 3) Development, 4) Content integration, 5) Testing, 6) Launch, 7) Post-launch support.',
        },
        {
          question: 'What is required from the client to start?',
          answer:
            'We need branding assets, content (text, images, video), feature requirements, example references and access to domain/hosting accounts.',
        },
        {
          question: 'Can I review the website before launch?',
          answer:
            'Yes. A staging site is provided for testing and approval prior to go-live.',
        },
      ],
    },
    {
      title: 'Technical & Features',
      icon: <Code className="w-6 h-6" />,
      color: 'orange',
      questions: [
        {
          question: 'Are your websites mobile-friendly?',
          answer:
            'All projects are fully responsive and optimised for modern smartphones and tablets.',
        },
        {
          question: 'Do you include SEO optimisation?',
          answer:
            'Basic on-page SEO is part of every package. Advanced SEO services are available as an add-on.',
        },
        {
          question: 'Can you integrate e-commerce?',
          answer:
            'Yes. Full e-commerce functionality (payment gateways, inventory, order tracking) is available. Pricing starts at ₹20,000.',
        },
        {
          question: 'Will I be able to update site content myself?',
          answer:
            'Yes. We build on user-friendly CMS platforms and provide training or documentation for content updates.',
        },
        {
          question: 'Do you handle hosting and domains?',
          answer:
            'We guide you in purchasing hosting and domains in your own name. Managed hosting can be provided on request.',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <HelpCircle className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Key information about our web-development services
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {faqCategories.map((category, categoryIndex) => {
          const { bg, text } = colorMap[category.color as keyof typeof colorMap];

          return (
            <div key={categoryIndex} className="mb-12">
              <div className={`flex items-center space-x-3 mb-6 p-4 rounded-lg ${bg}`}>
                <div className={text}>{category.icon}</div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const itemIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openItems.includes(itemIndex);

                  return (
                    <div
                      key={faqIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-${itemIndex}`}
                        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span className="text-lg font-medium text-gray-900">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>

                      {isOpen && (
                        <div
                          id={`faq-${itemIndex}`}
                          role="region"
                          aria-hidden={!isOpen}
                          className="px-6 py-4 bg-gray-50 border-t border-gray-200"
                        >
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Need more information?</h3>
            <p className="text-lg mb-6 opacity-90">
              Contact us for a detailed discussion or a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:yourwebpartner1@gmail.com"
                className="px-6 py-3 bg-white text-purple-600 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              >
                Email Us
              </a>
              <a
                href="tel:+916300371553"
                className="px-6 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;
