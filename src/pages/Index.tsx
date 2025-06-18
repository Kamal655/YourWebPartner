// src/pages/Index.tsx
import React from 'react';
import { Helmet } from 'react-helmet';

import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Newsletter from '../components/Newsletter';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import EnhancedChatWidget from '../components/EnhancedChatWidget';
import WhatsAppWidget from '../components/WhatsAppWidget';
import BlogPreview from '../components/BlogPreview';
import TestimonialForm from '../components/TestimonialForm';
import AdvancedAnalytics from '../components/AdvancedAnalytics';
import EmailAutomation from '../components/EmailAutomation';
import SEOBooster from '../components/SEOBooster';

const Index = () => (
  <>
    {/* ──────────────────  SEO / Open‑Graph meta  ────────────────── */}
    <Helmet>
      <title>Smart Websites for Smart Businesses | YourWebPartner</title>

      <meta
        name="description"
        content="We build blazing‑fast, mobile‑friendly websites that grow your business. Get a free quote from YourWebPartner today!"
      />
      <meta name="keywords" content="Web Design, Web Development, SEO, Mobile Friendly Websites, YourWebPartner" />
      <link rel="canonical" href="https://www.yourwebpartner.in/" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.yourwebpartner.in/" />
      <meta property="og:title" content="YourWebPartner – Web‑Design Experts" />
      <meta
        property="og:description"
        content="Custom websites, SEO and digital‑marketing solutions for startups and SMBs."
      />
      <meta property="og:image" content="https://www.yourwebpartner.in/og-cover-home.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content="https://www.yourwebpartner.in/" />
      <meta name="twitter:title" content="Smart Websites for Smart Businesses | YourWebPartner" />
      <meta
        name="twitter:description"
        content="We build blazing‑fast, mobile‑friendly websites that grow your business. Get a free quote from YourWebPartner today!"
      />
      <meta name="twitter:image" content="https://www.yourwebpartner.in/og-cover-home.jpg" />
    </Helmet>

    {/* ──────────────────  Page Content  ────────────────── */}
    <div className="min-h-screen bg-white">
      <Header />

      {/* Step 1: Hook visitors with compelling hero */}
      <Hero />

      {/* Step 2: Build trust with your story */}
      <About />

      {/* Step 3: Show what you offer */}
      <Services />

      {/* Step 4: Prove your advantages */}
      <WhyChooseUs />

      {/* Step 5: Showcase your work */}
      <Portfolio />

      {/* Step 6: Build credibility with testimonials */}
      <Testimonials />

      {/* Step 7: Present clear pricing */}
      <Pricing />

      {/* Step 8: Latest blog insights */}
      <BlogPreview />

      {/* Step 9: Customer testimonial collection */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Love Working With Us?
            </h2>
            <p className="text-xl text-gray-600">
              Share your experience and help others discover our services
            </p>
          </div>
          <TestimonialForm />
        </div>
      </section>

      {/* Step 10: Business analytics dashboard */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AdvancedAnalytics />
            <EmailAutomation />
          </div>
        </div>
      </section>

      {/* Step 11: Newsletter signup for nurturing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>

      {/* Step 12: Final call to action */}
      <Contact />

      <Footer />
      <EnhancedChatWidget />
      <WhatsAppWidget />
      <SEOBooster />
    </div>
  </>
);

export default Index;
