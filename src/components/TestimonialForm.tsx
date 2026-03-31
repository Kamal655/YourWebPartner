
import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    rating: 5,
    message: '',
    project_type: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Map form data to match database schema
      // NOTE: 'company' column does not exist in the actual database table, despite types.ts
      // We append company to content to preserve it.
      const contentWithCompany = formData.company
        ? `${formData.message}\n\n(Company: ${formData.company})`
        : formData.message;

      const submissionData = {
        name: formData.name,
        role: formData.project_type || null,
        content: contentWithCompany,
        rating: formData.rating,
        // company: removed due to schema error
      };

      const { error } = await supabase
        .from('testimonials')
        .insert([submissionData]);

      if (error) {
        console.error("Supabase Error:", error);
        toast({
          title: "Submission Failed",
          description: error.message || "Could not save testimonial. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Thank you for your feedback!",
          description: "Your testimonial has been submitted successfully.",
        });

        // Only reset form on success
        setFormData({
          name: '',
          email: '',
          company: '',
          rating: 5,
          message: '',
          project_type: ''
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Error",
        description: (error as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none"></div>

      <h3 className="text-2xl font-bold text-white mb-6 text-center relative z-10">
        Share Your Experience
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
          />
          <select
            value={formData.project_type}
            onChange={(e) => setFormData({ ...formData, project_type: e.target.value })}
            className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 [&>option]:bg-gray-900"
            required
          >
            <option value="">Select Project Type</option>
            <option value="Web Design">Web Design</option>
            <option value="Web Development">Web Development</option>
            <option value="UI/UX Design">UI/UX Design</option>
            <option value="SEO Optimization">SEO Optimization</option>
          </select>
        </div>

        <div className="text-center">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Rate Your Experience
          </label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingClick(star)}
                className="transition-all duration-200 transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${star <= formData.rating
                    ? 'text-yellow-400 fill-yellow-400 drop-shadow-glow'
                    : 'text-gray-600'
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Tell us about your experience working with us..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50 border border-white/10"
        >
          <Send className="w-5 h-5" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Testimonial'}</span>
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
