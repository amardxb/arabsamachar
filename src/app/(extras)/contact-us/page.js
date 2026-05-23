import ContactUs from "@/app/components/ContactUs";

export const metadata = {
  title: "Contact Us - अरब समाचार | Arab Samachar",
  description:
    "इस पेज के माध्यम से अरब समाचार से संपर्क करें",
  alternates: {
    canonical: "https://www.arabsamachar.com/contact-us",
  },
};
 


export default function Page() {
  return <ContactUs />;
}