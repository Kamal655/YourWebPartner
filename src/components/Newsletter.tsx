
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        // specialized error handling for duplicates if needed
        if (error.code === '23505') { // unique_violation
          toast({
            title: "Already Subscribed",
            description: "This email is already on our list!",
            variant: "default"
          });
          setIsSubscribed(true); // Treat as success
          return;
        }
        throw error;
      }

      setIsSubscribed(true);
      setEmail('');
      toast({
        title: "Success!",
        description: "You've been added to our newsletter.",
      });

    } catch (error) {
      console.error('Newsletter error:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center border border-green-500/20 shadow-lg">
        <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
        <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-gray-300">
          You've successfully subscribed to our newsletter. Get ready for amazing web development tips!
        </p>
        <button
          onClick={() => setIsSubscribed(false)}
          className="mt-4 text-green-400 hover:text-green-300 font-medium transition-colors"
        >
          Subscribe another email
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-2xl text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative z-10">
        <h3 className="text-3xl font-bold mb-4 text-center">
          Stay Updated with Web Trends
        </h3>
        <p className="text-lg mb-6 text-center opacity-90">
          Get weekly tips, tutorials, and insights delivered straight to your inbox
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Subscribe</span>
              </>
            )}
          </button>
        </form>

        <div className="flex justify-center items-center space-x-6 mt-6 text-sm opacity-80">
          <span>✓ Weekly web tips</span>
          <span>✓ No spam ever</span>
          <span>✓ Unsubscribe anytime</span>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
