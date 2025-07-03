
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
      const { error } = await supabase
        .from('testimonials')
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "Your testimonial has been submitted successfully.",
      });

      setFormData({
        name: '',
        email: '',
        company: '',
        rating: 5,
        message: '',
        project_type: ''
      });
    } catch (error) {
      toast({
        title: "Error submitting testimonial",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Share Your Experience
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            placeholder="Company Name"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={formData.project_type}
            onChange={(e) => setFormData({...formData, project_type: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
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
                  className={`w-8 h-8 ${
                    star <= formData.rating 
                      ? 'text-yellow-400 fill-yellow-400' 
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          placeholder="Tell us about your experience working with us..."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
          required
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
          <span>{isSubmitting ? 'Submitting...' : 'Submit Testimonial'}</span>
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;
