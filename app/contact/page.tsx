import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Contact" />
      <ContactForm />
    </div>
  );
}
