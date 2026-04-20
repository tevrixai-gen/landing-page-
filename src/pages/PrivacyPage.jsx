import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
    <div className="text-slate-500 text-[15px] leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function PrivacyPage() {
  return (
    <main>
      <section className="relative pt-28 pb-16 px-6 text-center overflow-hidden">
        <div className="warm-mesh-bg" />
        <div className="dot-grid" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="label-badge mb-8 inline-flex"
          >
            <Shield className="w-3.5 h-3.5" /> Legal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-950 mb-4 tracking-tight"
          >
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            Last updated: April 2026
          </motion.p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto card-3d p-8 md:p-12">

          <Section title="1. Who We Are">
            <p>
              Tevrix AI ("we", "our", "us") is an AI technology company building an AI-native BPO
              platform, currently in the MVP development stage. We are based in India and operate
              the website at <strong>www.tevrixai.com</strong>.
            </p>
            <p>
              For privacy-related queries, contact us at:{' '}
              <a href="mailto:panshul@tevrixai.com" className="text-amber-600 hover:text-amber-700">
                panshul@tevrixai.com
              </a>
            </p>
          </Section>

          <Section title="2. What Information We Collect">
            <p>We collect information you voluntarily provide through our contact and demo booking forms:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full name</li>
              <li>Work email address</li>
              <li>Company name</li>
              <li>Phone number (optional)</li>
              <li>Your message or area of interest</li>
            </ul>
            <p>
              We also collect standard technical data automatically: your IP address, browser type,
              pages visited, and time spent on pages — through Vercel Analytics and Speed Insights.
              This data is anonymous and aggregated.
            </p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information you provide to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Respond to your demo requests and enquiries</li>
              <li>Send you information about our product and early access program</li>
              <li>Improve our website and service offering</li>
            </ul>
            <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </Section>

          <Section title="4. Third-Party Services">
            <p>We use the following third-party services that may process your data:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Formspree</strong> — processes contact and demo form submissions.
                Their privacy policy is available at formspree.io/legal/privacy-policy.
              </li>
              <li>
                <strong>Vercel</strong> — hosts this website and provides anonymous analytics.
                Their privacy policy is available at vercel.com/legal/privacy-policy.
              </li>
            </ul>
          </Section>

          <Section title="5. Cookies">
            <p>
              This website uses minimal cookies required for basic functionality. We use Vercel's
              analytics which does not use cookies that track personal identities. We do not use
              advertising cookies or third-party tracking cookies.
            </p>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain contact form submissions for as long as necessary to respond to your enquiry
              and maintain our business relationship. You may request deletion of your data at any
              time by emailing us.
            </p>
          </Section>

          <Section title="7. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href="mailto:panshul@tevrixai.com" className="text-amber-600 hover:text-amber-700">
                panshul@tevrixai.com
              </a>.
            </p>
          </Section>

          <Section title="8. Security">
            <p>
              We take reasonable steps to protect your information. Our website is served over HTTPS.
              Contact form data is processed through Formspree's secure infrastructure.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy as our product and services evolve. Changes will be
              posted on this page with an updated date. We encourage you to review this policy periodically.
            </p>
          </Section>

          <Section title="10. Contact Us">
            <p>
              For any privacy-related questions or requests, contact:<br />
              <strong>Panshul Sharma</strong> — Founder, Tevrix AI<br />
              <a href="mailto:panshul@tevrixai.com" className="text-amber-600 hover:text-amber-700">
                panshul@tevrixai.com
              </a>
            </p>
          </Section>

        </div>
      </section>
    </main>
  );
}
