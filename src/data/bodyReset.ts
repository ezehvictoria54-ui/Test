export const siteConfig = {
  productName: "The Body Reset",
  price: 14900,
  currency: "NGN",
  displayPrice: "₦14,900",
  checkoutUrl: "", // TODO: Add the verified checkout URL before launch.
  supportContact: "", // TODO: Add support email or approved contact channel.
  accessDuration: "", // TODO: Confirm how long customers retain access.
  metaPixelId: "", // TODO: Add Meta Pixel ID when supplied.
  canonicalUrl: "", // TODO: Add production canonical URL.
  countdown: { enabled: false, deadline: "", timezone: "Africa/Lagos", copy: "", expiryAction: "hide" },
  purchaseNotifications: { enabled: false, records: [] as { location: string; timestamp: string }[] },
};

export type Testimonial = {
  id: string; type: "video" | "whatsapp" | "image" | "before-after" | "quote";
  customer: string; location?: string; headline: string; quote?: string;
  media?: string; poster?: string; alt: string; featured: boolean; placement: "first" | "second";
};

const types: Testimonial["type"][] = ["video","whatsapp","before-after","whatsapp","quote","image","video","whatsapp","before-after","quote","image","video","whatsapp","before-after","image"];
export const testimonials: Testimonial[] = types.map((type, index) => ({
  id: `testimonial-${String(index + 1).padStart(2, "0")}`,
  type,
  customer: "Customer name pending permission",
  headline: `Testimonial ${String(index + 1).padStart(2, "0")} — ${type.replace("-", " ")}`,
  alt: `Placeholder for approved customer ${type} testimonial ${index + 1}`,
  featured: index < 5,
  placement: index < 5 ? "first" : "second",
}));

export const faqs = [
  ["Do I have to stop eating rice?", "No. Body Reset is built around helping you understand portions and how familiar foods can fit into your overall eating pattern."],
  ["Do I need to go to the gym?", "No. Movement and exercise can support your health and weight-management goals, but Body Reset is not built around living inside a gym."],
  ["I don't understand calories at all. Will I understand this?", "Yes. We start from the beginning and explain everything in simple language."],
  ["Do I need a food scale?", "A food scale is strongly recommended while learning portions because it makes measuring easier and more accurate. You'll also learn practical estimation for times when weighing isn't possible."],
  ["I have PCOS. Can I join?", "Body Reset can provide general weight-management education, but it does not treat or cure PCOS and does not replace care from your doctor or qualified healthcare professional."],
  ["I recently had a baby. Can I join?", "Postpartum needs can differ, especially during recovery or breastfeeding. The program includes relevant guidance, but your recovery and medical advice come first. Speak with an appropriate healthcare professional if you're unsure whether weight loss is suitable for you right now."],
  ["I have 20kg, 30kg or more to lose. Is this for me?", "Body Reset teaches the foundations you'll need regardless of whether your goal is smaller or larger. The focus is on taking the journey one sustainable stage at a time."],
  ["Is this another herbal slimming program?", "No. Herbal recipes are included as a supporting resource, but they are not the foundation of Body Reset and are not presented as magic fat burners."],
  ["How do I access the program?", "You'll receive access instructions immediately after successful payment."],
  ["Can I ask questions?", "Yes. Body Reset includes access to the private community and scheduled support/Q&A."],
] as const;

export const accessFaq = { question: "How long do I have access?", answer: "TODO: Confirm access duration before publishing this FAQ." };
