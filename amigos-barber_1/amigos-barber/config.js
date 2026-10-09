/* ==========================================================================
   AMIGOS BARBER SHOP — BUSINESS CONFIGURATION
   Everything the owner may need to change lives in this one file.
   Anything set to null / empty is simply not shown on the site.
   ========================================================================== */
window.AMIGOS = {
  name: "Amigos Barber Shop",

  phone: {
    display: "(03) 9544 3327",
    link: "tel:+61395443327",
  },

  address: {
    line1: "1342 Centre Rd",
    // NOTE: the brief said 3174, but every directory listing found shows Clayton South as 3169.
    // Please confirm with the owner / Google profile and edit here (and in the JSON-LD in index.html).
    line2: "Clayton South VIC 3169",
    country: "Australia",
  },

  links: {
    mapsView:
      "https://www.google.com/maps/search/?api=1&query=Amigos+Barber+Shop%2C+1342+Centre+Road%2C+Clayton+South+VIC+3169",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=Amigos+Barber+Shop%2C+1342+Centre+Road%2C+Clayton+South+VIC+3169",
    // Opens the Google Business listing search (swap for the direct review link once the owner supplies it).
    googleReviews:
      "https://www.google.com/maps/search/?api=1&query=Amigos+Barber+Shop+Clayton+South",
    mapEmbed:
      "https://www.google.com/maps?q=Amigos+Barber+Shop%2C+1342+Centre+Road%2C+Clayton+South+VIC+3169&output=embed",
    booking: null, // e.g. "https://..." only if a genuine booking page exists
    instagram: null,
    facebook: null,
  },

  /* Google rating — NOT verified. Fill in all three, then set verified:true, and it appears on the site. */
  rating: { value: null, count: null, verified: false },

  /* Opening hours — directories disagree, so none are published.
     To publish, replace null with e.g.
       { mon: "8:30 AM – 5:30 PM", tue: "...", wed: "...", thu: "...", fri: "...", sat: "...", sun: "Closed" } */
  hours: null,

  /* Customer feedback supplied by the business (wording unchanged). */
  reviews: [
    { quote: "Reasonable prices and very competent barbers, also friendly staff.", source: "Customer review" },
    { quote: "Great place for a shave and also a great price.", source: "Customer review" },
  ],

  /* Authentic photography. Drop real files into /images and list them here.
     { src: "images/shop-interior.jpg", alt: "Barber chairs inside Amigos Barber Shop", caption: "The shop floor", size: "wide" | "tall" | "" }
     Leave empty until real photos exist — placeholders are shown instead. */
  gallery: [],

  images: {
    hero: null,      // e.g. "images/hero.jpg"  (real photo of the shop or work)
    about: null,     // e.g. "images/about.jpg"
    cta: null,       // e.g. "images/cta.jpg"
    services: { haircut: null, beard: null, shave: null, hotTowel: null },
  },

  /* Optional Hexa.ai clips (illustrative footage only). Leave null until generated. */
  video: { hero: null, heroPoster: null },
};
