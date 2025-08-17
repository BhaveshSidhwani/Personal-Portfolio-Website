import ContactForm from '@/components/ContactForm';
import SectionHeader from '@/components/SectionHeader';

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Contact" />
      <p className="text-[--muted]">Intro line placeholder ~ 60–90 chars to set expectations.</p>
      <ContactForm />
      <div className="text-accent-500">Prefer email? yourname@domain.tld • GitHub • LinkedIn</div>
    </div>
  );
}
