import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Emerald Owl Productions',
  description: 'Terms and conditions governing the use of our website and services.',
};

export default function TermsOfServicePage() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-emerald-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl">Last Updated: November 15, 2023</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p>
              Welcome to Emerald Owl Productions. These Terms of Service govern your use of our website and services. By accessing or using our website and services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access our website or use our services.
            </p>

            <h2>1. Services</h2>
            <p>
              Emerald Owl Productions provides event production services, including but not limited to laser light shows, foam parties, neon nights, water games, and other special event production services. Our website describes these services, but the specific details, pricing, and terms for each service will be established through a separate service agreement or contract.
            </p>

            <h2>2. Website Use</h2>
            <h3>2.1 Content</h3>
            <p>
              The content on our website is for informational purposes only. While we strive to keep the information up to date and accurate, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website.
            </p>

            <h3>2.2 Intellectual Property</h3>
            <p>
              All content on this website, including text, graphics, logos, images, videos, and software, is the property of Emerald Owl Productions and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written consent.
            </p>

            <h3>2.3 Prohibited Activities</h3>
            <p>
              When using our website, you agree not to:
            </p>
            <ul>
              <li>Use the website in any way that violates any applicable law or regulation</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Collect or track personal information of others</li>
              <li>Engage in any activity that could damage, disable, or impair the website</li>
              <li>Use any robot, spider, or other automated means to access the website</li>
              <li>Introduce any viruses, trojans, worms, or other malicious material</li>
            </ul>

            <h2>3. Bookings and Contracts</h2>
            <p>
              The information provided on our website regarding our services does not constitute a binding offer. Any booking or engagement of our services requires a separate contract or agreement, which will specify the terms, conditions, pricing, and other details of the services to be provided.
            </p>

            <h2>4. Payment Terms</h2>
            <p>
              Payment terms for our services will be specified in the service agreement or contract. Generally, we require a deposit to secure a booking date, with the balance due before the event. Specific payment methods, schedules, and cancellation policies will be outlined in the service agreement.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Emerald Owl Productions shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of, or inability to access or use, the website or services, whether based on warranty, contract, tort, or any other legal theory.
            </p>

            <h2>6. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Emerald Owl Productions, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses, including reasonable attorneys' fees, arising out of or in any way connected with your access to or use of the website or services, or your violation of these Terms.
            </p>

            <h2>7. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services that are not owned or controlled by Emerald Owl Productions. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Emerald Owl Productions shall not be responsible or liable for any damage or loss caused by or in connection with the use of any such content, goods, or services available on or through any such websites or services.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make changes, we will post the updated Terms on this page and update the "Last Updated" date. Your continued use of the website after any such changes constitutes your acceptance of the new Terms.
            </p>

            <h2>9. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of [Your Jurisdiction].
            </p>

            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Emerald Owl Productions<br />
              Email: legal@emeraldowl.com<br />
              Phone: (555) 123-4567
            </p>

            <div className="mt-8 border-t pt-8">
              <Link href="/legal/privacy-policy" className="text-emerald-600 hover:text-emerald-800">
                View our Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 