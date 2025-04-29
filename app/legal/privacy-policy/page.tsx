import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Emerald Owl Productions',
  description: 'Learn about how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl">Last Updated: November 15, 2023</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p>
              At Emerald Owl Productions, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or engage with our services.
            </p>

            <h2>Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, and mailing address when you contact us, request information, or book our services.</li>
              <li><strong>Event Details:</strong> Information about your event requirements, preferences, and specifications.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent on site, and click patterns.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information for various purposes, including:</p>
            <ul>
              <li>Providing, operating, and maintaining our website and services</li>
              <li>Responding to inquiries and fulfilling service requests</li>
              <li>Creating and managing customer accounts</li>
              <li>Processing transactions and sending related information</li>
              <li>Sending administrative information</li>
              <li>Sending marketing and promotional communications (with your consent)</li>
              <li>Improving our website, products, and services</li>
              <li>Protecting against fraud and unauthorized transactions</li>
            </ul>

            <h2>Information Sharing and Disclosure</h2>
            <p>We may share your information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party vendors who assist us in operating our website, conducting business, or providing services to you.</li>
              <li><strong>Business Partners:</strong> When necessary to fulfill services (such as venues, equipment providers, or entertainment professionals).</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
            </ul>
            <p>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have the following rights regarding your personal information:</p>
            <ul>
              <li>Access to the information we have about you</li>
              <li>Correction of inaccurate or incomplete information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing of your personal information</li>
              <li>Data portability</li>
              <li>Objection to processing of your personal information</li>
              <li>Withdrawal of consent at any time</li>
            </ul>

            <h2>Cookies and Tracking Technologies</h2>
            <p>
              Our website uses cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of our website may not function properly without cookies.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              Our website and services are not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Emerald Owl Productions<br />
              Email: privacy@emeraldowl.com<br />
              Phone: (555) 123-4567
            </p>

            <div className="mt-8 border-t pt-8">
              <Link href="/legal/terms-of-service" className="text-emerald-600 hover:text-emerald-800">
                View our Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 