import React from 'react';
import { Helmet } from 'react-helmet';
import { JsonLd } from 'react-schemaorg';
import type { WithContext, LocalBusiness, FAQPage } from 'schema-dts';

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
    {/* ──────────────── SEO & Open Graph ──────────────── */}
    <Helmet>
      <title>Smart Websites for Smart Businesses | YourWebPartner</title>
      <meta
        name="description"
        content="We build blazing‑fast, mobile‑friendly websites that grow your business. Get a free quote from YourWebPartner today!"
      />
      <meta
        name="keywords"
        content="Web Design, Web Development, SEO, Mobile Friendly Websites, YourWebPartner"
      />
      <link rel="canonical" href="https://www.yourwebpartner.in/" />

      {/* Open Graph */}
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
      <meta name="twitter:title" content="Smart Websites for Smart Businesses | YourWebPartner" />
      <meta
        name="twitter:description"
        content="We build blazing‑fast, mobile‑friendly websites that grow your business. Get a free quote from YourWebPartner today!"
      />
      <meta name="twitter:image" content="https://www.yourwebpartner.in/og-cover-home.jpg" />
    </Helmet>

    {/* ──────────────── Structured Data ──────────────── */}
    <JsonLd<WithContext<LocalBusiness>>
      item={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "YourWebPartner",
        image: "https://www.yourwebpartner.in/logo.jpg",
        "@id": "https://www.yourwebpartner.in/",
        url: "https://www.yourwebpartner.in/",
        telephone: "+91-XXXXXXXXXX",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Vijayawada, Andhra Pradesh",
          addressLocality: "Vijayawada",
          addressRegion: "AP",
          postalCode: "520001",
          addressCountry: "IN"
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ],
            opens: "09:00",
            closes: "18:00"
          }
        ]
      }}
    />

    <JsonLd<WithContext<FAQPage>>
      item={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What services does YourWebPartner offer?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "We offer Web Design, Web Development, SEO, Hosting and Digital Marketing."
            }
          },
          {
            "@type": "Question",
            name: "How can I get a free quote?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Visit our Contact page and fill the quick quote form. We'll get back to you in 24 hours."
            }
          }
        ]
      }}
    />

    {/* ──────────────── Page Content ──────────────── */}
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <BlogPreview />

      {/* Testimonial Form Section */}
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

      {/* Analytics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AdvancedAnalytics />
            <EmailAutomation />
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Newsletter />
        </div>
      </section>

      {/* Final CTA */}
      <Contact />
      <Footer />
      <EnhancedChatWidget />
      <WhatsAppWidget />
      <SEOBooster />
    </div>
  </>
);

export default Index;
