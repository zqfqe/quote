
import React from 'react';
import { Mail, MapPin, Globe, Shield, FileText, Info, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

// Shared Layout Component for Legal Pages
const LegalLayout: React.FC<{ 
  title: string; 
  lastUpdated?: string; 
  icon?: React.ElementType;
  seoTitle?: string;
  seoDesc?: string;
  children: React.ReactNode 
}> = ({ title, lastUpdated, icon: Icon, seoTitle, seoDesc, children }) => (
  <div className="bg-brand-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
    <SEO title={seoTitle || `${title} - Maximus Quotes`} description={seoDesc || title} />
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-brand-900 px-8 py-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          {Icon && <Icon className="w-12 h-12 text-brand-400 mx-auto mb-4" />}
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">{title}</h1>
          {lastUpdated && (
            <p className="text-brand-200 text-sm mt-4 uppercase tracking-wider font-medium">
              Last Updated: {lastUpdated}
            </p>
          )}
        </div>
        <div className="p-8 md:p-12 text-gray-600 leading-relaxed space-y-6">
          {children}
        </div>
      </div>
    </div>
  </div>
);

// --- 1. ABOUT US ---
export const About = () => (
  <LegalLayout 
    title="About Us" 
    icon={Info}
    seoTitle="About Maximus Quotes - Our Mission & Vision"
    seoDesc="Learn about Maximus Quotes, your premier digital sanctuary for wisdom and inspiration. Our mission is to curate the world's best quotes."
  >
    <div className="prose prose-lg prose-blue max-w-none">
      <p className="text-xl text-gray-800 font-medium leading-loose">
        Welcome to <strong className="text-brand-700">Maximus Quotes</strong>, your digital sanctuary for timeless wisdom, daily inspiration, and the transformative power of words.
      </p>

      <h3 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">Our Mission</h3>
      <p>
        At <strong>maximusquotes.org</strong>, we believe that the right words, read at the right moment, can change a life. In an era of infinite noise, we strive to signal-boost the profound. Our mission is to curate, organize, and preserve the collective wisdom of humanity—from ancient philosophers like Marcus Aurelius to modern visionaries—making it accessible to everyone, everywhere.
      </p>

      <h3 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">Why "Maximus"?</h3>
      <p>
        The name "Maximus" (Latin for "Greatest") reflects our commitment to quality. We don't just aggregate text; we curate greatness. Whether you are looking for motivation to start your day, a comforting thought during hard times, or the perfect line for a speech, Maximus Quotes is designed to be your ultimate resource.
      </p>

      <h3 className="text-2xl font-serif font-bold text-gray-900 mt-8 mb-4">What We Offer</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li><strong>Extensive Directory:</strong> A searchable database covering thousands of topics, authors, movies, and books.</li>
        <li><strong>Curated Quality:</strong> We prioritize accuracy and context in our quotes.</li>
        <li><strong>Daily Inspiration:</strong> A hand-picked "Quote of the Day" to spark your morning.</li>
        <li><strong>Community:</strong> Tools to save your favorites and share them with the world.</li>
      </ul>

      <p className="mt-8 italic text-gray-500 border-l-4 border-brand-500 pl-4">
        "We are what we repeatedly do. Excellence, then, is not an act, but a habit." — Aristotle
      </p>
    </div>
  </LegalLayout>
);

// --- 2. CONTACT US ---
export const Contact = () => (
  <LegalLayout 
    title="Contact Us" 
    icon={MessageSquare}
    seoTitle="Contact Maximus Quotes - Get in Touch"
    seoDesc="Contact the Maximus Quotes team for support, suggestions, or general inquiries. We love hearing from our community."
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Get in Touch</h3>
        <p className="mb-6">
          Have a question, a suggestion, or found a quote that needs a correction? We'd love to hear from you. At <strong>Maximus Quotes</strong>, we value our community's feedback above all else.
        </p>
        
        <div className="space-y-6 mt-8">
          <div className="flex items-start space-x-4">
            <div className="bg-brand-50 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Email Us</h4>
              <p className="text-sm text-gray-500 mb-1">For general inquiries & support:</p>
              <a href="mailto:info@maximusquotes.org" className="text-brand-600 font-medium hover:underline text-lg">
                info@maximusquotes.org
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="bg-brand-50 p-3 rounded-lg">
              <Globe className="w-6 h-6 text-brand-600" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Website</h4>
              <p className="text-brand-600">www.maximusquotes.org</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition" placeholder="How can we help?"></textarea>
          </div>
          <button className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition shadow-lg">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </LegalLayout>
);

// --- 3. PRIVACY POLICY ---
export const Privacy = () => (
  <LegalLayout 
    title="Privacy Policy" 
    lastUpdated="December 1, 2025" 
    icon={Shield}
    seoTitle="Privacy Policy - Maximus Quotes"
    seoDesc="Maximus Quotes respects your privacy. Read our Privacy Policy to understand how we collect, use, and protect your information."
  >
    <div className="prose prose-blue max-w-none text-sm md:text-base">
      <p>
        At <strong>Maximus Quotes</strong> (accessible from https://maximusquotes.org), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Maximus Quotes and how we use it.
      </p>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. Information We Collect</h3>
      <p>
        <strong>Personal Information:</strong> We may ask for personal information, such as your email address, when you subscribe to our newsletter or contact us directly via <em>info@maximusquotes.org</em>.
      </p>
      <p>
        <strong>Log Files:</strong> Maximus Quotes follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
      </p>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">2. How We Use Your Information</h3>
      <p>We use the information we collect in various ways, including to:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Provide, operate, and maintain our website</li>
        <li>Improve, personalize, and expand our website</li>
        <li>Understand and analyze how you use our website</li>
        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website.</li>
        <li>Send you emails (only if opted in)</li>
      </ul>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">3. Cookies and Local Storage</h3>
      <p>
        Maximus Quotes uses "Cookies" and Local Storage. We use Local Storage to save your "Favorite Quotes" directly on your device. This data remains on your browser and is not transmitted to our servers unless you explicitly create an account (feature coming soon).
      </p>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">4. Third Party Privacy Policies</h3>
      <p>
        Maximus Quotes's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
      </p>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">5. GDPR Data Protection Rights</h3>
      <p>
        We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: The right to access, rectification, erasure, restriction of processing, objection to processing, and data portability.
      </p>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">6. Contact Us</h3>
      <p>
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>info@maximusquotes.org</strong>.
      </p>
    </div>
  </LegalLayout>
);

// --- 4. TERMS & CONDITIONS ---
export const Terms = () => (
  <LegalLayout 
    title="Terms & Conditions" 
    lastUpdated="December 1, 2025" 
    icon={FileText}
    seoTitle="Terms & Conditions - Maximus Quotes"
    seoDesc="Read the Terms and Conditions for using Maximus Quotes. Understand your rights and responsibilities when using our platform."
  >
    <div className="prose prose-blue max-w-none text-sm md:text-base">
      <p>
        Welcome to <strong>Maximus Quotes</strong>! These terms and conditions outline the rules and regulations for the use of Maximus Quotes's Website, located at https://maximusquotes.org.
      </p>
      <p>
        By accessing this website we assume you accept these terms and conditions. Do not continue to use Maximus Quotes if you do not agree to take all of the terms and conditions stated on this page.
      </p>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">1. License</h3>
      <p>
        Unless otherwise stated, Maximus Quotes and/or its licensors own the intellectual property rights for all material on Maximus Quotes. All intellectual property rights are reserved. You may access this from Maximus Quotes for your own personal use subjected to restrictions set in these terms and conditions.
      </p>
      <p>You must not:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Republish material from Maximus Quotes without attribution</li>
        <li>Sell, rent or sub-license material from Maximus Quotes</li>
        <li>Reproduce, duplicate or copy material from Maximus Quotes</li>
        <li>Redistribute content from Maximus Quotes</li>
      </ul>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">2. Content Liability</h3>
      <p>
        We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
      </p>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">3. Disclaimer</h3>
      <p>
        To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>limit or exclude our or your liability for death or personal injury;</li>
        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
        <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
        <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
      </ul>
      <p className="mt-4">
        As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
      </p>

      <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">4. Contact</h3>
      <p>
        If you have any queries regarding any of our terms, please contact us via email at <strong>info@maximusquotes.org</strong>.
      </p>
    </div>
  </LegalLayout>
);
