import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowDownRight, ArrowUp, Check, ChevronRight, Clock3, Factory, HardHat, Leaf, Mail, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Users, X } from 'lucide-react';

type Product = { name: string; description: string; image: string };

const products: Product[] = [
  { name: 'Rice Mill', description: 'A dependable path from harvested paddy to market-ready rice.', image: '/maize-mill-processing.jpg' },
  { name: 'Hammer Mill', description: 'Consistent milling for grain, feed and the work between.', image: '/grain-mill-workshop.jpg' },
  { name: '13HP Power Tiller', description: 'Compact power for smallholder plots and prepared soil.', image: '/power-tiller-field.jpg' },
  { name: '18HP Power Tiller', description: 'More pulling power when the acreage asks for it.', image: '/power-tiller-field.jpg' },
  { name: 'Multipurpose Thrasher', description: 'Reduce post-harvest effort across a range of crops.', image: '/hero-farm.jpg' },
  { name: 'Corn Thrasher', description: 'Move corn from field to storage with less waste.', image: '/hero-farm.jpg' },
  { name: 'Grain Seed Cleaner & Grader', description: 'Clean and grade grain or seed for a more uniform, market-ready result.', image: '/maize-mill-processing.jpg' },
  { name: 'Solar Water Pump', description: 'Bring reliable water closer to the crop, sustainably.', image: '/power-tiller-field.jpg' },
  { name: 'Electric Grinding Machine', description: 'A practical workhorse for everyday processing.', image: '/maize-mill-compact.jpg' },
  { name: 'Rice Reaper', description: 'Harvesting equipment built around speed and reduced loss.', image: '/hero-farm.jpg' },
];

const reasons = [
  ['01', 'Built for the field', 'We focus on equipment that earns its place in real Nigerian farms, not machinery that only looks good in a catalogue.'],
  ['02', 'Practical guidance', 'Tell us your crop, scale and ambition. We will help you make a clear equipment decision.'],
  ['03', 'A partner beyond delivery', 'From first enquiry to keeping your operation moving, our team stays close to the work.'],
  ['04', 'Productivity with purpose', 'Better tools should mean less strain, less waste and more value kept in the hands of producers.'],
];

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

function Header({ open, setOpen }: { open: boolean; setOpen: (value: boolean) => void }) {
  const links = [['About Us', 'about'], ['Products', 'products'], ['Why Choose Us', 'why'], ['Gallery', 'gallery'], ['Contact', 'contact']];
  return (
    <header className="topbar">
      <div className="container-wide">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#home" data-testid="link-brand">
            <img className="brand-mark" src="/igaf-mark.svg" alt="" /><span className="brand-name">Ibrahimawa<br />Global & Farm<br />(IGAF) Limited</span>
          </a>
          <div className="desktop-links">
            {links.map(([label, id]) => <a key={id} href={`#${id}`} data-testid={`link-nav-${id}`}>{label}</a>)}
          </div>
          <a className="button-light" href="#contact" data-testid="link-nav-enquiry">Make an enquiry <ArrowDownRight size={15} /></a>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
        {open && <div className="mobile-menu">
          {links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)} data-testid={`link-mobile-${id}`}>{label}</a>)}
          <a href="#contact" onClick={() => setOpen(false)} data-testid="link-mobile-enquiry">Make an enquiry <ArrowDownRight size={14} /></a>
        </div>}
      </div>
    </header>
  );
}

function ProductCard({ product, index, onOpen }: { product: Product; index: number; onOpen: (product: Product) => void }) {
  return (
    <article className={`product-card reveal delay-${(index % 3) + 1}`} data-testid={`card-product-${index + 1}`}>
      <img src={product.image} alt={`${product.name} agricultural equipment`} />
      <div className="product-content">
        <span className="product-number">0{index + 1}</span>
        <h3>{product.name}</h3>
        <button className="product-link" onClick={() => onOpen(product)} data-testid={`button-product-enquiry-${index + 1}`}>Ask about this machine <ChevronRight size={14} /></button>
      </div>
    </article>
  );
}

function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    window.setTimeout(() => { setSending(false); setSent(true); }, 700);
  }
  if (sent) return <div className="success-message" data-testid="status-form-success"><span className="success-icon"><Check size={26} /></span><h3 className="serif" style={{ fontSize: '2.2rem', margin: 0 }}>Enquiry received.</h3><p style={{ color: 'hsl(var(--primary-foreground) / .65)', margin: 0 }}>Thank you. A member of the IGAF team will be in touch shortly.</p><button className="button-primary" onClick={() => setSent(false)} data-testid="button-send-another">Send another enquiry</button></div>;
  return <form onSubmit={submit} data-testid="form-contact">
    <div className="form-row">
      <div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" required placeholder="Full name" data-testid="input-name" /></div>
      <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" required placeholder="+234 ..." data-testid="input-phone" /></div>
    </div>
    <div className="form-row">
      <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" name="email" required placeholder="you@company.com" data-testid="input-email" /></div>
      <div className="field"><label htmlFor="interest">I am interested in</label><select id="interest" name="interest" defaultValue="" data-testid="select-interest"><option value="" disabled>Select a machine</option>{products.map((product) => <option value={product.name} key={product.name}>{product.name}</option>)}</select></div>
    </div>
    <div className="field"><label htmlFor="message">Tell us about your operation</label><textarea id="message" name="message" required placeholder="Crop, farm size or what you need the machine to do..." data-testid="textarea-message" /></div>
    <button className="button-primary" type="submit" disabled={sending} data-testid="button-submit-enquiry">{sending ? 'Sending enquiry...' : <>Send enquiry <ArrowDownRight size={16} /></>}</button>
    <p className="form-note">Your details are used only to respond to this enquiry. No prices are shown online — we quote for your specific operation.</p>
  </form>;
}

function App() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<Product | null>(null);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = lightbox ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);
  function openEnquiry(product?: Product) {
    scrollToId('contact');
    window.setTimeout(() => {
      const select = document.getElementById('interest') as HTMLSelectElement | null;
      if (select && product) { select.value = product.name; select.dispatchEvent(new Event('change', { bubbles: true })); }
    }, 500);
  }
  const gallery = [
    { image: '/hero-farm.jpg', label: 'Field-ready equipment', product: products[0] },
    { image: '/workshop-machinery.jpg', label: 'The work behind the work', product: products[1] },
    { image: '/power-tiller-field.jpg', label: 'Power in the soil', product: products[2] },
    { image: '/hero-farm.jpg', label: 'Harvest with less loss', product: products[9] },
    { image: '/workshop-machinery.jpg', label: 'Made for processing', product: products[6] },
  ];
  return <div className="site-shell grain" id="home">
    <Header open={menuOpen} setOpen={setMenuOpen} />
    <main>
      <section className="hero">
        <div className="container-wide hero-grid">
          <div className="reveal is-visible"><span className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>Agricultural machinery / Nigeria</span><h1>Make the<br /><em>next harvest</em><br />count.</h1><p className="hero-copy">IGAF connects ambitious farmers and processors with dependable equipment for the work that feeds communities.</p><div className="hero-actions"><a className="button-primary" href="#products" data-testid="link-hero-products">Explore our machinery <ArrowDownRight size={16} /></a><a className="button-light" href="#contact" data-testid="link-hero-contact">Talk to our team</a></div></div>
          <div className="hero-caption reveal is-visible delay-2"><strong>01</strong><span>Rooted in Nigerian agriculture.<br />Built for what comes next.</span></div>
        </div>
      </section>
      <div className="marquee" aria-label="IGAF values"><div className="marquee-track">{['Field-tested thinking', 'Less strain. More yield.', 'Equipment for real work', 'A partner for progress', 'Field-tested thinking', 'Less strain. More yield.'].map((item, i) => <span key={i}>{item}<b style={{ color: 'hsl(var(--accent))', marginLeft: 40 }}>✳</b></span>)}</div></div>
      <section className="intro section-pad" id="about">
        <div className="container-wide intro-grid"><div className="reveal"><span className="eyebrow">About IGAF</span><h2>We put better<br />tools in the hands<br />of <em>good work.</em></h2></div><div className="intro-body reveal delay-1"><p>Ibrahimawa Global and Farm (IGAF) Limited is a Nigerian agricultural equipment and machinery company serving the people doing the essential work of growing, processing and moving food.</p><p>We believe modernisation should be practical. It should meet the farmer where they are, answer a real constraint and make the next season meaningfully better.</p><div className="signature"><span className="signature-line" /><span className="mono">A hands-on partner, from field to factory</span></div></div></div>
        <div className="container-wide stat-strip reveal delay-2"><div className="stat"><strong>10</strong><span>core machines, selected for real operations</span></div><div className="stat"><strong>360°</strong><span>support from first question to confident use</span></div><div className="stat"><strong>Naija</strong><span>local context behind every recommendation</span></div></div>
      </section>
      <section className="dark-section section-pad" id="products"><div className="container-wide"><div className="section-heading reveal"><div><span className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>The equipment</span><h2>Machines that<br /><em>pull their weight.</em></h2></div><p>Not every farm needs the same answer. Explore the range, then tell us what your work looks like.</p></div><div className="products-grid">{products.map((product, index) => <ProductCard key={product.name} product={product} index={index} onOpen={openEnquiry} />)}</div></div></section>
      <section className="split-story" id="why"><div className="story-image" role="img" aria-label="Farmer operating a power tiller in a Nigerian field" /><div className="story-copy"><span className="eyebrow">Why choose IGAF</span><h2>Progress is<br /><em>personal.</em></h2><p>For a farmer, a machine is never just a machine. It is time returned to the day. It is more produce cleaned, more land prepared, more work possible with the same hands.</p><p>That is why our approach starts with listening. We match the equipment to your operation, your people and the reality on the ground.</p><a href="#contact" className="button-ghost" style={{ marginTop: 18 }} data-testid="link-story-contact">Find your fit <ArrowDownRight size={15} /></a></div></section>
      <section className="section-pad intro"><div className="container-wide reasons"><div className="reveal"><span className="eyebrow">The IGAF difference</span><h2>Useful is<br /><em>beautiful.</em></h2><p style={{ color: 'hsl(var(--muted-foreground))', lineHeight: 1.7, maxWidth: 350 }}>Trust is built in the details: the right recommendation, a clear answer, and equipment that keeps showing up for the work.</p></div><div className="reason-list reveal delay-1">{reasons.map(([number, title, copy]) => <div className="reason" key={number}><span className="reason-index">{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></section>
      <section className="split-story" style={{ background: 'hsl(var(--background))' }}><div className="story-copy" style={{ background: 'hsl(147 35% 22%)', color: 'hsl(var(--primary-foreground))' }}><span className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>The bigger picture</span><h2>Productivity<br />that leaves<br /><em>something behind.</em></h2><p style={{ color: 'hsl(var(--primary-foreground) / .68)' }}>From solar-powered water to efficient processing, the right machinery can help farms grow while using resources with care.</p><div style={{ display: 'flex', gap: 20, marginTop: 34 }}><div><Leaf color="hsl(var(--secondary))" size={22} /><p className="mono" style={{ color: 'hsl(var(--primary-foreground) / .7)' }}>Resource-aware</p></div><div><Factory color="hsl(var(--secondary))" size={22} /><p className="mono" style={{ color: 'hsl(var(--primary-foreground) / .7)' }}>Built to work</p></div></div></div><div className="workshop-image" role="img" aria-label="Close-up of agricultural machinery in a workshop" /></section>
      <section className="gallery section-pad" id="gallery"><div className="container-wide"><div className="section-heading reveal"><div><span className="eyebrow">On the ground</span><h2>A closer look at<br /><em>the work.</em></h2></div><p>See the environments and details that shape our view of agricultural equipment.</p></div><div className="gallery-grid">{gallery.map((item, index) => <button className="gallery-item reveal" key={`${item.label}-${index}`} onClick={() => setLightbox(item.product)} data-testid={`button-gallery-${index + 1}`}><img src={item.image} alt={item.label} /><span>{item.label} <ChevronRight size={13} style={{ verticalAlign: 'middle' }} /></span></button>)}</div></div></section>
      <section className="cta-band"><div className="container-wide cta-grid reveal"><div><span className="eyebrow">Your next move</span><h2>Let’s talk about<br />what could work.</h2></div><a className="button-light" href="#contact" data-testid="link-cta-contact">Start a conversation <ArrowDownRight size={16} /></a></div></section>
      <section className="contact section-pad" id="contact"><div className="container-wide contact-grid"><div className="reveal"><span className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>Contact IGAF</span><h2>Tell us what<br /><em>you’re building.</em></h2><p className="contact-intro">Whether you are preparing your first field, expanding a processing line or looking for a better way to harvest, our team is ready to hear the full picture.</p><div className="contact-details"><div className="contact-detail"><Phone size={17} /><div><b>Call the team</b><span>+234 810 080 9016</span></div></div><div className="contact-detail"><Mail size={17} /><div><b>Send an email</b><span>ibrahimawafarms@gmail.com</span></div></div><div className="contact-detail"><Clock3 size={17} /><div><b>Office hours</b><span>Every day, 7:00am–8:00pm WAT</span></div></div></div></div><div className="contact-form reveal delay-1"><ContactForm /></div></div><div className="container-wide map-card reveal"><a className="map-label" href="https://maps.app.goo.gl/HQAMXdP8y18sVP3h9" target="_blank" rel="noreferrer" data-testid="link-map-location"><MapPin size={15} />View our precise location on Google Maps</a></div></section>
    </main>
    <footer className="footer"><div className="container-wide footer-inner"><span>© {new Date().getFullYear()} Ibrahimawa Global and Farm (IGAF) Limited.</span><span>Equipment for the work that feeds us.</span><a href="#home" data-testid="link-footer-top">Back to top <ArrowUp size={13} style={{ verticalAlign: 'middle' }} /></a></div></footer>
    <a className="whatsapp" href="https://wa.me/2347047197737" target="_blank" rel="noreferrer" aria-label="Chat with IGAF on WhatsApp" data-testid="link-whatsapp"><MessageCircle size={24} /></a>
    <button className={`back-top ${showTop ? '' : 'hidden'}`} onClick={() => scrollToId('home')} aria-label="Back to top" data-testid="button-back-to-top"><ArrowUp size={17} /></button>
    {lightbox && <div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.name} onClick={() => setLightbox(null)} data-testid="lightbox-gallery"><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close image" data-testid="button-close-lightbox"><X size={28} /></button><img src={lightbox.image} alt={`${lightbox.name} enlarged`} onClick={(event) => event.stopPropagation()} /><span className="lightbox-caption">{lightbox.name} · IGAF machinery</span></div>}
  </div>;
}

export default App;
