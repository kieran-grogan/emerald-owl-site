import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal Information | Emerald Owl Productions',
  description: 'Legal information, privacy policy, and terms of service for Emerald Owl Productions.',
};

export default function LegalPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-emerald-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Legal Information</h1>
          <p className="text-xl md:text-2xl max-w-3xl">
            Important legal documents governing the use of our website and services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg mb-12">
              At Emerald Owl Productions, we're committed to transparency in our business practices. 
              Below you'll find our legal documents that govern the use of our website and services. 
              We encourage you to review these documents to understand your rights and our obligations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                <p className="mb-6">
                  Our Privacy Policy explains how we collect, use, and protect your personal information 
                  when you visit our website or use our services.
                </p>
                <Link 
                  href="/legal/privacy-policy" 
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg transition-colors"
                >
                  Read Privacy Policy
                </Link>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                <p className="mb-6">
                  Our Terms of Service outline the rules, guidelines, and agreements that govern 
                  the use of our website and services.
                </p>
                <Link 
                  href="/legal/terms-of-service" 
                  className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg transition-colors"
                >
                  Read Terms of Service
                </Link>
              </div>
            </div>
            
            <div className="mt-16 p-6 bg-gray-100 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Have Questions?</h3>
              <p className="mb-6">
                If you have any questions or concerns about our legal policies or would like additional information, 
                please don't hesitate to contact our legal team.
              </p>
              <Link 
                href="/contact-us?subject=Legal%20Inquiry" 
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-6 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 