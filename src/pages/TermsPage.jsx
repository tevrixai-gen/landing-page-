import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
    <div className="text-slate-500 text-[15px] leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function TermsPage() {
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
            <FileText className="w-3.5 h-3.5" /> Legal
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-950 mb-4 tracking-tight"
          >
            Terms of Service
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

          <Section title="1. About Tevrix AI">
            <p>
              Tevrix AI is an AI technology company currently in the MVP (Minimum Viable Product)
              development stage. We are building an AI-native Business Process Outsourcing (BPO)
              platform. This website (<strong>www.tevrixai.com</strong>) is an informational
              website describing our product vision and accepting early access enquiries.
            </p>
          </Section>

          <Section title="2. Acceptance of Terms">
            <p>
              By accessing or using this website, you agree to be bound by these Terms of Service.
              If you do not agree, please do not use this website.
            </p>
          </Section>

          <Section title="3. Product Status">
            <p>
              The Tevrix AI platform described on this website is currently under development. All
              features, capabilities, and specifications described are subject to change. Nothing on
              this website constitutes a binding commitment to deliver any specific functionality
              by any specific date.
            </p>
            <p>
              Metrics and statistics referenced on this website (such as response times, cost
              reductions, and market size figures) are either industry projections, technical
              capability estimates, or benchmarks derived from available market research.
            </p>
          </Section>

          <Section title="4. Use of This Website">
            <p>You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Use the website in any way that violates applicable local, national, or international law</li>
              <li>Transmit unsolicited or unauthorised advertising or promotional material</li>
              <li>Attempt to gain unauthorised access to any part of the website or its servers</li>
            </ul>
          </Section>

          <Section title="5. Contact Form Submissions">
            <p>
              By submitting a contact or demo request form on this website, you consent to Tevrix AI
              contacting you via the email or phone number you provide to respond to your enquiry
              and provide information about our product. You may opt out of further communications
              at any time.
            </p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content on this website — including text, graphics, logos, and code — is the
              property of Tevrix AI and is protected by applicable intellectual property laws.
              You may not reproduce, distribute, or create derivative works from our content
              without express written permission.
            </p>
          </Section>

          <Section title="7. Disclaimer of Warranties">
            <p>
              This website and its content are provided "as is" without any warranties, express
              or implied. Tevrix AI does not warrant that the website will be uninterrupted,
              error-free, or free from viruses or other harmful components.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, Tevrix AI shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of
              this website or reliance on information contained herein.
            </p>
          </Section>

          <Section title="9. Links to Third-Party Websites">
            <p>
              This website may contain links to third-party websites. We have no control over
              the content of those sites and accept no responsibility for them or for any
              loss or damage that may arise from your use of them.
            </p>
          </Section>

          <Section title="10. Governing Law">
            <p>
              These Terms of Service are governed by the laws of India. Any disputes arising from
              these terms shall be subject to the exclusive jurisdiction of courts in India.
            </p>
          </Section>

          <Section title="11. Changes to These Terms">
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on
              this page with an updated date. Your continued use of the website after changes
              constitutes acceptance of the updated terms.
            </p>
          </Section>

          <Section title="12. Contact">
            <p>
              For any questions regarding these Terms, contact:<br />
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
