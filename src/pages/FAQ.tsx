
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
  MessageCircle
} from 'lucide-react';

const colorMap = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', icon: 'text-blue-400' },
  green: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', icon: 'text-emerald-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', icon: 'text-purple-400' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', icon: 'text-orange-400' },
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
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden">
      <Header />

      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none"></div>
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <section className="pt-32 pb-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl shadow-[0_0_20px_rgba(59,130,246,0.2)] animate-pulse">
              <HelpCircle className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Questions</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our web development services, pricing, and process.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 relative z-10">
        {faqCategories.map((category, categoryIndex) => {
          const { bg, border, text, icon } = colorMap[category.color as keyof typeof colorMap];

          return (
            <div key={categoryIndex} className="mb-12 last:mb-0">
              <div className={`flex items-center space-x-4 mb-6 p-4 rounded-2xl ${bg} ${border} border backdrop-blur-sm`}>
                <div className={`${icon} p-2 bg-black/20 rounded-xl`}>{category.icon}</div>
                <h2 className="text-2xl font-bold text-white">
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
                      className={`group border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-white/10 border-blue-500/30' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                      <button
                        onClick={() => toggleItem(itemIndex)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-${itemIndex}`}
                        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                      >
                        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-blue-300' : 'text-gray-200 group-hover:text-white'}`}>
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors flex-shrink-0" />
                        )}
                      </button>

                      <div
                        id={`faq-${itemIndex}`}
                        role="region"
                        aria-hidden={!isOpen}
                        className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                      >
                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-3xl p-10 border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500"></div>

            <Zap className="w-12 h-12 mx-auto mb-6 text-yellow-400" />

            <h3 className="text-3xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              We're here to help. Contact our team for a detailed discussion about your specific requirements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <a
                href="mailto:yourwebpartner1@gmail.com"
                className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Email Us
              </a>
              <a
                href="tel:+916300371553"
                className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-full font-bold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              >
                Call Support
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
