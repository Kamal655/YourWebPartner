export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Contact Us</h1>
      <form
        action="https://formspree.io/f/xgvkqjzy" // 🔁 Replace with your real Formspree URL
        method="POST"
        className="space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="w-full p-3 border border-gray-300 rounded"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          className="w-full p-3 border border-gray-300 rounded"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
