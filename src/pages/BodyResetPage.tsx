import { useEffect, useRef, useState } from "react";
import { accessFaq, faqs, siteConfig, testimonials, type Testimonial } from "../data/bodyReset";

declare global { interface Window { dataLayer?: Record<string, unknown>[]; fbq?: (...args: unknown[]) => void; } }

const included = [
  ["Complete Body Reset Training", "Simple step-by-step lessons that teach you what you're doing and why."],
  ["Nigerian Food & Calorie Guide", "Understand common Nigerian foods, portions and how to work out meals you make at home."],
  ["Food-Weighing Masterclass", "Learn what goes on the scale, raw vs cooked measurements, oils, mixed meals and more."],
  ["Personal Numbers Calculator", "Get a sensible starting estimate instead of copying somebody else's numbers."],
  ["Build-Your-Own Meal Guide", "Learn how to put your own meals together instead of depending on a rigid 30-day menu."],
  ["Herbal Recipe Vault", "Get Victoria's supporting homemade recipes with clear preparation instructions and realistic expectations."],
  ["Plateau Guide", "Know what to check when the scale seems to stop moving instead of immediately starving yourself."],
  ["Eating Out + Owambe Guide", "Learn how to handle restaurants, parties, weekends and normal Nigerian life."],
  ["Body Reset Progress Tracker", "Track weight, measurements, habits and other signs of progress."],
  ["Maintenance Blueprint", "Learn what happens after you reach your goal so you don't immediately return to old habits."],
  ["Private Body Reset Community", "Ask questions, share wins and learn alongside other women."],
];

function track(event: string, detail: Record<string, unknown> = {}) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...detail });
}

function purchaseUrl() {
  if (!siteConfig.checkoutUrl) return "#pricing";
  const url = new URL(siteConfig.checkoutUrl, window.location.href);
  const query = new URLSearchParams(window.location.search);
  ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((key) => {
    const value = query.get(key) || sessionStorage.getItem(key);
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

function CTA({ children, event = "checkout_click", className = "" }: { children: React.ReactNode; event?: string; className?: string }) {
  return <a className={`btn ${className}`} href={siteConfig.checkoutUrl ? purchaseUrl() : "#pricing"} onClick={() => {
    track(event); track("checkout_click", { placement: event });
    if (siteConfig.metaPixelId && window.fbq) window.fbq("track", "InitiateCheckout");
  }}>{children}</a>;
}

function AssetPlaceholder({ label }: { label: string }) { return <div className="placeholder"><span>{label}<br /><small>Replace with approved, optimised WebP/AVIF asset</small></span></div>; }

function TestimonialCard({ item, onOpen }: { item: Testimonial; onOpen: (item: Testimonial) => void }) {
  const hasMedia = Boolean(item.media);
  return <article className={`testimonial ${item.type}`}>
    <button type="button" onClick={() => onOpen(item)} aria-label={`Open ${item.headline}`}>
      <div className="testimonial-media">
        {hasMedia ? <img src={item.media} loading="lazy" width="600" height="800" alt={item.alt} /> : <span>[{item.headline.toUpperCase()}]<br /><small>Tap to preview placeholder</small></span>}
      </div>
      <div className="testimonial-meta"><strong>{item.headline}</strong><span>{item.customer}</span></div>
    </button>
  </article>;
}

function ProofWall({ placement, title }: { placement: "first" | "second"; title: string }) {
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState<Testimonial | null>(null);
  const items = testimonials.filter((item) => item.placement === placement);
  const visible = placement === "second" && !expanded ? items.slice(0, 3) : items;
  useEffect(() => {
    if (!active) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActive(null);
    document.addEventListener("keydown", close); document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", close); document.body.style.overflow = ""; };
  }, [active]);
  const open = (item: Testimonial) => { setActive(item); track("testimonial_gallery_open", { id: item.id, type: item.type }); };
  return <>
    <section className="section" aria-labelledby={`${placement}-proof-title`}><div className="shell">
      <div className="center narrow"><p className="eyebrow">Shared experiences</p><h2 id={`${placement}-proof-title`}>{title}</h2><p className="lede">Approved customer stories will live here—shown as they were shared, without polished-up promises.</p></div>
      <div className="grid proof-grid" style={{ marginTop: "2.5rem" }}>{visible.map((item) => <TestimonialCard key={item.id} item={item} onOpen={open} />)}</div>
      {placement === "second" && !expanded && <div className="center" style={{ marginTop: "1.5rem" }}><button className="btn" type="button" onClick={() => { setExpanded(true); track("testimonial_gallery_open", { action: "expand" }); }}>SEE MORE RESULTS</button></div>}
      <p className="disclaimer center">Individual experiences vary. Results depend on factors including starting point, consistency, lifestyle and individual circumstances.</p>
    </div></section>
    {active && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && setActive(null)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="testimonial-modal-title">
      <button className="modal-close" autoFocus aria-label="Close testimonial" onClick={() => setActive(null)}>×</button>
      <h3 id="testimonial-modal-title">{active.headline}</h3>
      <div className="modal-placeholder">[{active.id.toUpperCase()} — APPROVED {active.type.toUpperCase()} MEDIA GOES HERE]</div>
      <p className="disclaimer">Placeholder only. No customer result has been invented.</p>
    </div></div>}
  </>;
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="section cream" id="faq"><div className="shell narrow"><div className="center"><p className="eyebrow">Honest answers</p><h2>Still Have Questions?</h2></div><div className="faq">
    {faqs.map(([question, answer], index) => <div className="faq-item" key={question}><h3 style={{ margin: 0, fontFamily: "inherit" }}><button className="faq-button" aria-expanded={open === index} aria-controls={`faq-${index}`} onClick={() => { setOpen(open === index ? null : index); track("faq_open", { question }); }}><span>{question}</span><span aria-hidden="true">{open === index ? "−" : "+"}</span></button></h3>{open === index && <div className="faq-answer" id={`faq-${index}`}>{answer}</div>}</div>)}
    {/* TODO: Publish accessFaq only after siteConfig.accessDuration is confirmed. */}
    {siteConfig.accessDuration && <div className="faq-item"><h3>{accessFaq.question}</h3><p>{siteConfig.accessDuration}</p></div>}
  </div></div></section>;
}

export default function BodyResetPage() {
  const heroCta = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);
  const [exitModal, setExitModal] = useState(false);
  useEffect(() => {
    document.title = "The Body Reset | Practical Weight Loss With Nigerian Foods";
    track("page_view");
    const params = new URLSearchParams(location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].forEach((k) => { const v = params.get(k); if (v) sessionStorage.setItem(k, v); });
    const observer = new IntersectionObserver(([entry]) => setSticky(!entry.isIntersecting));
    if (heroCta.current) observer.observe(heroCta.current);
    const fired = new Set<number>();
    const scroll = () => { const pct = Math.round(((scrollY + innerHeight) / document.documentElement.scrollHeight) * 100); [25,50,75,90].forEach(n => { if (pct >= n && !fired.has(n)) { fired.add(n); track(`scroll_${n}`); } }); };
    const exit = (e: MouseEvent) => { if (e.clientY <= 5 && scrollY > innerHeight && !sessionStorage.getItem("exit-seen")) { setExitModal(true); sessionStorage.setItem("exit-seen", "1"); } };
    addEventListener("scroll", scroll, { passive: true }); document.addEventListener("mouseout", exit);
    return () => { observer.disconnect(); removeEventListener("scroll", scroll); document.removeEventListener("mouseout", exit); };
  }, []);

  const rules = ["NO CARBS.","STOP RICE.","DON'T EAT AFTER 6.","FAST FOR 18 HOURS.","DRINK THIS TEA.","WALK 10,000 STEPS.","STOP BREAD."];
  const steps = [
    ["Understand Your Body", "Work out a sensible starting point and understand roughly how much your body needs."],
    ["Understand Your Food", "Learn portions, calories, food weighing and how the Nigerian foods you already eat can fit into your goal."],
    ["Build A Routine You Can Actually Follow", "Learn how to put meals together, handle hunger and cravings, move your body, use the supporting recipes and build habits that fit your life."],
    ["Learn How To Keep Going In Real Life", "Owambe. Restaurants. Weekends. Travel. Bad days. Plateaus. Maintenance. Because real life will not stop because you're losing weight."],
  ];
  const fits = ["You're tired of starting over","You want to lose weight without abandoning Nigerian food","You don't really understand calories or portions","You're eating ‘healthy’ but aren't seeing the progress you expected","You have a significant amount to lose and don't know where to begin","You're busy and cannot cook separate ‘diet food’ every day","You've lost weight before and regained it","You want understanding—not somebody else's meal plan forever"];
  const nots = ["A magic tea promising to melt belly fat overnight.","A starvation diet.","A ‘never eat rice again’ plan.","A rigid meal plan that falls apart the second real life happens.","A replacement for medical care.","A promise that everybody will lose the same number of kilograms in the same number of days."];
  return <main>
    <header className="header"><div className="shell header-inner"><div className="brand">The Body Reset</div><CTA className="btn-small" event="header_cta_click">START NOW</CTA></div></header>
    <section className="hero"><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow">For Nigerian women who are tired of starting over</p><h1>Stop <em>guessing</em> your way through weight loss.</h1><p className="lede"><strong>Learn how to lose weight while still eating the Nigerian foods you love</strong>—without another impossible diet, starving yourself or constantly wondering what you're doing wrong.</p><p>The Body Reset shows you, step by step, how to understand how much you should be eating, measure your portions, build your own meals and make weight loss work around your real life.</p><div ref={heroCta}><CTA event="hero_cta_click">YES, I WANT TO START MY BODY RESET</CTA><p className="trust">Get instant access for <strong>₦14,900</strong><br />Secure payment • Instant access • Nigerian-food friendly</p></div></div><div className="hero-visual"><AssetPlaceholder label="VICTORIA HERO PORTRAIT / PRODUCT MOCKUP — recommended 4:5, 1200×1500" /><span className="visual-note">Know your numbers.<br />Know your food.</span></div></div></section>

    <section className="section"><div className="shell narrow center"><p className="eyebrow">Does this sound familiar?</p><h2>Maybe you've been trying. You're just tired of not knowing what actually works.</h2><div className="stack-copy"><p>You've reduced rice. You've tried not eating late.</p><p>You've bought slimming teas. You've tried fasting.</p><p>Maybe you even paid for the gym.</p><p>Sometimes you lose a little… then somehow, you're back where you started.</p><p>Or maybe you're trying right now and the scale is barely moving.</p></div><p style={{ marginTop: "2rem" }}><strong>And every day, somebody online gives you another rule.</strong></p><div className="rule-list">{rules.map(r => <span className="rule" key={r}>{r}</span>)}</div><p className="lede">At some point, weight loss starts feeling more confusing than it needs to be.</p></div></section>

    <section className="section cream"><div className="shell narrow"><p className="eyebrow">The real problem</p><h2>The problem isn't always that you're not trying. Sometimes, you're simply guessing.</h2><div className="stack-copy"><p>You don't know how much your body roughly needs.</p><p>You don't know how much you're actually eating—or how much oil went into the stew.</p><p>You don't know what portion of rice, yam or swallow fits into your day.</p><p>You're following somebody else's meal plan. Copying somebody else's calorie target.</p><p>And every few weeks, you're changing strategy again.</p></div><div className="quote-card">You don't need another random weight-loss rule.<br /><br /><strong>You need a system you actually understand.</strong></div></div></section>

    <section className="section"><div className="shell narrow"><p className="eyebrow">The simple truth</p><h2>Here's what nobody explained simply enough…</h2><p>Your body uses energy every single day. Your food gives your body energy.</p><p>For your weight to generally trend downward over time, you need to consistently eat an amount that supports that goal.</p><p>That's why simply eating “healthy” does not automatically mean you're eating the right amount for weight loss. And it's also why rice, yam, bread or swallow do not automatically have to disappear from your life.</p><div className="education-card"><h3>Healthy food still counts.</h3><p style={{ margin: 0 }}>A food doesn't suddenly become zero calories because somebody called it “healthy.” 😭</p></div><p className="lede">Once you understand your numbers and your portions, food starts feeling a lot less confusing.</p><div className="flow" aria-label="Body to progress process">{["BODY","→","FOOD","→","PORTIONS","→","CONSISTENCY","→","PROGRESS"].map((x,i) => <span key={i}>{x}</span>)}</div></div></section>

    <section className="section rose"><div className="shell story-grid"><div className="media-frame"><AssetPlaceholder label="VICTORIA TRANSFORMATION IMAGE — recommended paired 4:5 images" /></div><div><p className="eyebrow">Victoria's story</p><h2>I know because I had to learn this too.</h2><p>In my own journey, I went from approximately 94kg to 80kg over about a month-plus. I learned to understand food, portions, calorie intake and the parts of my lifestyle that mattered. Homemade herbal recipes were part of my routine too—but never a magic answer.</p><p><strong>That was my personal experience, not a promise of what anyone else will experience.</strong> The bigger lesson was finally understanding what I was doing instead of blindly following another restrictive diet.</p><blockquote className="quote-card" style={{ fontSize: "1.25rem" }}>“Women didn't need another long list of foods they were not allowed to eat. They needed someone to explain weight loss in a way that actually made sense.”</blockquote><p>And when I started helping other women, I began seeing the same confusion over and over again.</p></div></div></section>

    <ProofWall placement="first" title="And it wasn't just me." />

    <section className="section dark" id="product"><div className="shell center"><p className="eyebrow" style={{ color: "#e5aaa4" }}>Introducing</p><h2>THE BODY RESET</h2><p className="lede" style={{ color: "#e2d7d2", maxWidth: 760, marginInline: "auto" }}>Your step-by-step system for understanding weight loss and making it work with the Nigerian foods and real life you already have.</p><p>I created Body Reset so you don't have to spend another year jumping between random diets, TikTok advice and foods you're afraid to eat.</p><div className="product-stage">{["PHONE: BODY RESET TRAINING","NIGERIAN FOOD GUIDE","PERSONAL NUMBERS CALCULATOR","MEAL BUILDER","HERBAL RECIPE VAULT","PROGRESS TRACKER"].map(x => <div className="product-item" key={x}>[{x} MOCKUP]</div>)}</div><CTA event="product_cta_click">START MY BODY RESET — ₦14,900</CTA></div></section>

    <section className="section"><div className="shell"><div className="center narrow"><p className="eyebrow">A clear path</p><h2>Here's exactly what we'll do together.</h2></div><div className="grid grid-2" style={{ marginTop: "2rem" }}>{steps.map(([title,text],i) => <article className="step" key={title}><span className="step-number">STEP 0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="quote-card center" style={{ maxWidth: 850 }}>No nutrition degree required. Everything is explained from the beginning in simple language.</div><div className="center" style={{ marginTop: "1.5rem" }}><CTA event="how_it_works_cta_click">I'M READY TO START</CTA></div></div></section>

    <section className="section"><div className="shell"><div className="soft-panel imagine"><p className="eyebrow">Picture the difference</p><h2>Imagine finally knowing what you're doing…</h2>{["Imagine eating rice without wondering whether you've ‘spoiled your diet.’","Imagine looking at your plate and actually understanding your portions.","Imagine knowing how to calculate what you ate instead of asking somebody every single time.","Imagine going to an owambe and knowing how to handle it.","Imagine seeing changes and understanding what you've been doing consistently to support them.","Imagine gradually feeling more comfortable in your clothes again.","Imagine taking pictures without your weight being the first thing on your mind."].map(x => <p key={x}>{x}</p>)}<h3 style={{ marginTop: "2rem" }}>That's what I want Body Reset to give you: <strong>CLARITY.</strong><br />Not another temporary diet.</h3></div></div></section>

    <section className="section cream" id="included"><div className="shell"><div className="center narrow"><p className="eyebrow">Inside the programme</p><h2>Everything You Need To Start Your Body Reset</h2></div><div className="grid grid-offer" style={{ marginTop: "2.5rem" }}>{included.map(([title,text],i) => <article className="include-card" key={title}><div className="icon">{i+1}</div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="price-mini"><p>Get complete access to The Body Reset today for:</p><div className="price">₦14,900</div><CTA event="offer_stack_cta_click">GET BODY RESET</CTA></div></div></section>

    <section className="section"><div className="shell"><div className="center narrow"><p className="eyebrow">Made for real life</p><h2>Body Reset Might Be For You If…</h2></div><div className="grid grid-2">{fits.map(x => <div className="check-card" key={x}><div className="check">✓</div><span>{x}</span></div>)}</div><p className="quote-card center" style={{ maxWidth: 820 }}>You don't need to already understand calories, portions or food weighing.<br /><strong>That's what Body Reset teaches you.</strong></p></div></section>

    <section className="section rose"><div className="shell"><div className="center narrow"><p className="eyebrow">No magic. No pretending.</p><h2>Let Me Be Clear About What You're NOT Buying.</h2></div><div className="grid grid-2">{nots.map(x => <div className="not-card" key={x}><span className="not-mark">NOT</span><span>{x}</span></div>)}</div><p className="lede center" style={{ marginTop: "2rem" }}><strong>You're learning a practical system you can understand, personalise and actually use.</strong></p></div></section>

    <ProofWall placement="second" title="Real Women. Real Experiences." />
    <FAQ />

    <section className="section rose" id="pricing"><div className="shell center"><div className="pricing-card"><p className="eyebrow">One clear next step</p><h2>Ready To Stop Guessing?</h2><div className="recap">{["Complete training","Nigerian food guide","Personal calculator","Meal builder","Supporting recipes","Progress trackers","Real-life guides","Private community"].map(x => <span key={x}>{x}</span>)}</div><p style={{ marginBottom: 0 }}><strong>THE BODY RESET</strong><br /><span className="muted">Current introductory enrolment price</span></p><div className="price">₦14,900</div><CTA event="pricing_cta_click">YES — I WANT TO START MY BODY RESET</CTA><p className="trust">Secure payment • Instant access • Beginner friendly</p>{!siteConfig.checkoutUrl && <p className="disclaimer"><strong>Setup note:</strong> Checkout link is awaiting confirmation. Configure it in <code>src/data/bodyReset.ts</code>.</p>}</div></div></section>

    <section className="section"><div className="shell about-grid"><div><p className="eyebrow">Meet your guide</p><h2>Hi, I'm Victoria.</h2><p>I created Body Reset after my own weight-management journey and after helping women through practical weight-loss education, recipes and support.</p><p>I believe women should understand what they are doing instead of depending forever on random diets.</p><div className="education-card"><strong>“I don't want you to need somebody to tell you whether you're ‘allowed’ to eat rice for the rest of your life.</strong><br /><br />I want you to understand your food, your portions and your routine well enough to make informed choices yourself.”</div></div><div className="media-frame"><AssetPlaceholder label="VICTORIA ABOUT PORTRAIT — recommended 4:5, 1200×1500" /></div></div></section>

    <section className="section dark center"><div className="shell narrow"><p className="eyebrow" style={{ color: "#e5aaa4" }}>Your next month</p><h2>Another Month Is Going To Pass Anyway.</h2><p>You can keep collecting random weight-loss tips and wondering which one to follow…</p><p>Or you can finally understand what you're doing and start building a routine around your own life. Body Reset was created to help you do the second one.</p><h3 style={{ fontSize: "clamp(1.7rem, 7vw, 2.8rem)", margin: "2rem 0" }}>Your first step doesn't have to be perfect.<br /><em>It just has to be clear.</em></h3><CTA event="final_cta_click">START MY BODY RESET — ₦14,900</CTA><p className="trust" style={{ color: "#cbbcb6" }}>Secure payment • Instant access</p></div></section>

    <footer className="footer"><div className="shell"><div className="brand" style={{ color: "white" }}>The Body Reset</div><div className="footer-links"><a href="#support">Contact/support [TODO]</a><a href="#privacy">Privacy Policy [TODO]</a><a href="#terms">Terms [TODO]</a><a href="#refund">Refund Policy [TODO]</a><a href="#disclaimer">Health/Educational Disclaimer</a></div><p id="disclaimer">The Body Reset provides general educational information about nutrition, lifestyle and weight management. It is not medical advice and is not intended to diagnose, treat, cure or prevent any medical condition. Individual circumstances differ. Consult an appropriate healthcare professional where necessary.</p><p>Payment/security information: [TODO — add verified payment provider details].</p><p>© {new Date().getFullYear()} The Body Reset. All rights reserved.</p></div></footer>

    <div className={`sticky ${sticky ? "show" : ""}`} aria-hidden={!sticky}><strong>Body Reset<br /><span className="muted">₦14,900</span></strong><CTA className="btn-small" event="sticky_cta_click">START NOW</CTA></div>
    {exitModal && <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setExitModal(false)}><div className="modal exit-modal" role="dialog" aria-modal="true" aria-labelledby="exit-title"><button autoFocus className="modal-close" aria-label="Close" onClick={() => setExitModal(false)}>×</button><p className="eyebrow">One last thing</p><h2 id="exit-title">Before You Go…</h2><p>Still wondering whether Body Reset is right for you?</p><ul><li>✓ Nigerian-food friendly</li><li>✓ Beginner friendly</li><li>✓ Instant access</li></ul><div className="exit-actions"><a className="btn" href="#included" onClick={() => setExitModal(false)}>SEE EVERYTHING INCLUDED</a><button className="link-button" onClick={() => setExitModal(false)}>Continue browsing</button></div></div></div>}
    {/* Countdown and purchase notifications are intentionally disabled in siteConfig. Never enable without a real deadline / verified records. Purchase events belong on the verified payment success page only. */}
  </main>;
}
