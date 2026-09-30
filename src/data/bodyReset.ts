export const PRODUCT_NAME = "The Body Reset";
export const PRICE = 14900;
export const DISPLAY_PRICE = "₦14,900";
export const CURRENCY = "NGN";
export const BRAND_PRIMARY = "#7A245D";
export const BRAND_DARK = "#20191E";
export const BRAND_IVORY = "#FFF9F4";
export const BRAND_TINT = "#F8ECF3";

export const siteConfig = {
  productName: PRODUCT_NAME, price: PRICE, displayPrice: DISPLAY_PRICE, currency: CURRENCY,
  checkoutUrl: "", // TODO: verified checkout URL
  metaPixelId: "", // TODO: Meta Pixel ID
  accessDuration: "", // TODO: confirmed access duration
  supportContact: "", // TODO: approved support channel
  countdown: { enabled: false, deadline: "", timezone: "Africa/Lagos", headline: "₦14,900 INTRODUCTORY PRICE ENDS IN:", expiryAction: "hide" as "hide" | "disable-checkout" },
  purchaseNotifications: { enabled: false, records: [] as PurchaseRecord[] },
};

export type PurchaseRecord = { firstName?: string; city?: string; purchasedAt?: string; product: "The Body Reset" };
export type TestimonialType = "video" | "whatsapp" | "beforeAfter" | "photo" | "scale" | "quote";
export type Testimonial = { id: string; type: TestimonialType; mediaSrc?: string; posterSrc?: string; displayName?: string; location?: string; caption?: string; alt: string; featured: boolean; section: "hero" | "early" | "future" | "wall" | "final"; permissionConfirmed: boolean };

const testimonialTypes: TestimonialType[] = ["quote","beforeAfter","whatsapp","video","whatsapp","beforeAfter","scale","quote","video","whatsapp","beforeAfter","whatsapp","scale","beforeAfter","quote"];
const sections: Testimonial["section"][] = ["hero","early","early","early","early","early","early","future","wall","wall","wall","wall","wall","wall","final"];
export const testimonials: Testimonial[] = testimonialTypes.map((type, i) => ({
  id: `testimonial-${String(i + 1).padStart(2, "0")}`, type, featured: i < 8, section: sections[i],
  alt: `Approved ${type} testimonial ${i + 1}`, permissionConfirmed: false,
}));

export const faqs = [
  ["DO I HAVE TO STOP EATING RICE?", "No. 😂\n\nIf I wanted you to fear rice, I wouldn't have spent this entire page telling you otherwise.\n\nBody Reset teaches you how familiar food can fit into your overall plan."],
  ["DO I NEED TO GO TO THE GYM?", "No.\n\nMovement is useful for your health and can support your goal, but you don't need to move into the gym before you're allowed to start learning how to manage your weight."],
  ["I DON'T UNDERSTAND CALORIES AT ALL.", "That's completely fine.\n\nWe're starting from the beginning.\n\nYou don't need to arrive knowing any of this."],
  ["IS THIS ANOTHER HERBAL SLIMMING PROGRAM?", "No.\n\nHerbal recipes are included because they're part of what I've personally used and taught.\n\nBut they're a supporting part of Body Reset. They're not being sold as a magical fat-burning shortcut."],
  ["WHAT IF I'VE TRIED SO MANY THINGS BEFORE?", "Then you're exactly the kind of person I had in mind while building this.\n\nBody Reset isn't asking you to memorize another list of rules. It's teaching you how to understand what you're doing so you can stop moving from one random plan to another."],
  ["WHAT IF I HAVE A LOT OF WEIGHT TO LOSE?", "You do not need to solve your entire journey in one month.\n\nLearn the foundations. Start where you are. Take it stage by stage."],
  ["WHAT IF I HAVE PCOS?", "Body Reset can provide general weight-management education, but it doesn't treat or cure PCOS and isn't a replacement for your healthcare professional."],
  ["WHAT IF I RECENTLY HAD A BABY?", "Your recovery comes first, particularly if you're newly postpartum or breastfeeding.\n\nBody Reset can provide general education, but speak with your healthcare professional if you're unsure whether actively pursuing weight loss is appropriate for you right now."],
  ["HOW DO I RECEIVE THE CLASS?", "After successful payment, you'll receive instructions to access the Body Reset training and private community."],
  ["WHAT EXACTLY IS THE CLASS FORMAT?", "Body Reset is not just an ebook. It includes a combination of video classes, audio lessons, text lessons, practical screen recordings, downloadable tools and access to the private support community."],
  ["HOW LONG DO I HAVE ACCESS?", "[ACCESS DURATION TO BE CONFIRMED]"],
] as const;
