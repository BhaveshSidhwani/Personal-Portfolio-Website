import ContactForm from "@/components/ContactForm";
import SectionHeader from "@/components/SectionHeader";

export default function ContactPage() {
  return (
    <div className="space-y-4">
      <SectionHeader title="Contact" />
      <p className="text-[--error]">
        Contact form is currently under development. If you need to reach me,
        please email{" "}
        <a className="text-accent-500" href="mailto:sidhwanibhavesh@gmail.com">
          sidhwanibhavesh@gmail.com
        </a>
        .
        <br />
      </p>
      <ContactForm />
    </div>
  );
}
