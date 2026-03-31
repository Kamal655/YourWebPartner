import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";

import GAListener from "./GAListener";
import ScrollToAnchor from "./components/ScrollToAnchor";

// Lazy Load Pages
const Index = lazy(() => import("./pages/Index"));
const Projects = lazy(() => import("./pages/Projects"));
const WebDesign = lazy(() => import("./pages/WebDesign"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const UiUxDesign = lazy(() => import("./pages/UiUxDesign"));
const SeoOptimization = lazy(() => import("./pages/SeoOptimization"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const PaymentSuccess = lazy(() => import("./pages/payment/PaymentSuccess"));
const PaymentFailed = lazy(() => import("./pages/payment/PaymentFailed"));
const PaymentPending = lazy(() => import("./pages/payment/PaymentPending"));

const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const AdminLayout = lazy(() => import("./layouts/AdminLayout"));
const BlogManager = lazy(() => import("./pages/admin/BlogManager"));
const StatsManager = lazy(() => import("./pages/admin/StatsManager"));
const TestimonialsManager = lazy(() => import("./pages/admin/TestimonialsManager"));
const ProjectsManager = lazy(() => import("./pages/admin/ProjectsManager"));
const ContactManager = lazy(() => import("./pages/admin/ContactManager"));
const SubscribersManager = lazy(() => import("./pages/admin/SubscribersManager"));
const PromoManager = lazy(() => import("./pages/admin/PromoManager"));

const queryClient = new QueryClient();

// Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="noise-overlay" />

      <BrowserRouter>
        <GAListener />
        <ScrollToAnchor />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/web-design" element={<WebDesign />} />
            <Route path="/web-development" element={<WebDevelopment />} />
            <Route path="/ui-ux-design" element={<UiUxDesign />} />
            <Route path="/seo-optimization" element={<SeoOptimization />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-failed" element={<PaymentFailed />} />
            <Route path="/payment-pending" element={<PaymentPending />} />

            {/* Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<BlogManager />} />
                <Route path="posts" element={<BlogManager />} />
                <Route path="stats" element={<StatsManager />} />
                <Route path="testimonials" element={<TestimonialsManager />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="inbox" element={<ContactManager />} />
                <Route path="subscribers" element={<SubscribersManager />} />
                <Route path="promos" element={<PromoManager />} />
              </Route>
            </Route>

            {/* KEEP CUSTOM ROUTES ABOVE THIS CATCH‑ALL */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
