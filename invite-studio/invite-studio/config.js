/* ==========================================================
   THE INVITE STUDIO — STORE SETTINGS
   Edit this file to change anything on your site.
   Images go in the /images folder; reference them like "images/hero.jpg".
   Missing images are fine: a soft colored placeholder shows instead.
   ========================================================== */
window.STORE = {
  name: "The Invite Studio",
  tagline: "Thoughtfully Designed Invitations for Your Special Moments.",
  intro: "Beautiful digital invitations, thoughtfully crafted to make every celebration unforgettable.",

  email: "dinvitestudio@gmail.com",
  phone: "+63 9495880628",
  location: "Virtual",
  processingTime: "1-3 business days",

  // Your Google Form for orders. If empty, the Order button opens an email instead.
  orderFormUrl: "https://forms.gle/R2VNFeevDDamKs297",

  // Leave "" to hide a social link.
  social: { instagram: "", facebook: "", pinterest: "", tiktok: "" },

  heroImage: "images/hero.jpg",

  /* ---------- PAYMENTS ----------
     label   = shown name
     details = text shown to customer
     copy    = text copied by the "Copy" button (optional)
     qr      = QR image path (optional)                       */
  payments: {
    local: [
      { label: "GCash", details: "P. A. U / 09471607769", copy: "09471607769", qr: "images/qr-gcash.png" },
      { label: "Maya", details: "P. A. U / 09289562012", copy: "09289562012", qr: "images/qr-maya.png" },
      { label: "Bank Transfer", details: "", copy: "", qr: "images/qr-bank.png" }
    ],
    international: [
      { label: "International Transfer", details: "", copy: "", qr: "images/qr-international.png" }
    ]
  },

  /* ---------- CATEGORIES ----------
     local = price in ₱, intl = price in $. Leave "" to show "Inquire". */
  categories: [
    { name: "Wedding Invitations", local: "300", intl: "15", image: "images/cat-wedding.jpg" },
    { name: "Save the Date", local: "", intl: "", image: "" },
    { name: "Birthday", local: "", intl: "", image: "" },
    { name: "Debut", local: "", intl: "", image: "" },
    { name: "Baby Shower", local: "", intl: "", image: "" },
    { name: "Valentine’s", local: "", intl: "", image: "" },
    { name: "Dinner Date", local: "", intl: "", image: "" },
    { name: "Movie Date", local: "", intl: "", image: "" },
    { name: "Lunch Date", local: "", intl: "", image: "" },
    { name: "Valentine’s Date", local: "", intl: "", image: "" },
    { name: "Monthsary Greetings", local: "", intl: "", image: "" },
    { name: "Monthsary Invitation Celebration", local: "", intl: "", image: "" },
    { name: "Anniversary", local: "", intl: "", image: "" },
    { name: "Other Celebrations", local: "", intl: "", image: "" }
  ],

  /* ---------- PRODUCTS ----------
     category must match a category name above.
     hue    = placeholder color when there is no image (0-360)
     images = list of photos; the first is the main one
     sample = your published Canva link (https://...) for "View Live Sample" */
  products: [
    { category: "Wedding Invitations", name: "Ivory Romance", description: "Soft ivory layout with delicate serif lettering.", hue: 35, images: ["images/ivory-romance.jpg"], sample: "https://tiger-rqccsg.my.canva.site/" },
    { category: "Wedding Invitations", name: "Timeless Vows", description: "Classic and understated, made for formal celebrations.", hue: 30, images: [], sample: "" },
    { category: "Save the Date", name: "Save the Date Classic", description: "A simple, elegant announcement for your guests.", hue: 32, images: [], sample: "" },
    { category: "Birthday", name: "Blush Birthday", description: "A warm, modern invitation for birthday celebrations.", hue: 20, images: [], sample: "" },
    { category: "Debut", name: "Golden Debut", description: "A graceful invitation for a debut celebration.", hue: 38, images: [], sample: "" },
    { category: "Baby Shower", name: "Little Bundle", description: "Gentle neutrals for welcoming a new little one.", hue: 28, images: [], sample: "" },
    { category: "Dinner Date", name: "Candlelit Dinner", description: "A romantic invitation for an intimate dinner.", hue: 15, images: [], sample: "" },
    { category: "Movie Date", name: "Movie Night", description: "A cozy invitation for a night at the movies.", hue: 25, images: [], sample: "" },
    { category: "Monthsary Greetings", name: "Sweet Monthsary", description: "A heartfelt greeting for another month together.", hue: 12, images: [], sample: "" },
    { category: "Anniversary", name: "Anniversary Keepsake", description: "A timeless keepsake to mark your years together.", hue: 40, images: [], sample: "" }
  ],

  // Number of products shown in "Featured Designs"
  featuredCount: 6,

  /* ---------- ORDER FORM DETAILS SHOWN TO CUSTOMERS ---------- */
  commonFields: "Full name, email, contact number, selected design, Local or International order, country, special instructions, payment reference number, optional payment screenshot.",
  fields: {
    "Wedding Invitations": "Couple’s names, wedding date and time, ceremony venue, reception venue, entourage details, RSVP information",
    "Save the Date": "Couple’s names, date, venue or city, message",
    "Birthday": "Celebrant’s name, age, date, time, venue, theme, RSVP details",
    "Debut": "Debutante’s name, date, time, venue, theme, program details, RSVP details",
    "Baby Shower": "Parents-to-be names, baby’s name (if chosen), date, time, venue, theme or colors, registry notes, RSVP details",
    "Valentine’s": "Sender’s and recipient’s names, personal message, date",
    "Dinner Date": "Invitee’s name, date, time, place, dress code or notes, personal message",
    "Movie Date": "Invitee’s name, date, time, place, notes, personal message",
    "Lunch Date": "Invitee’s name, date, time, place, notes, personal message",
    "Valentine’s Date": "Sender’s and recipient’s names, date, time, place, personal message",
    "Monthsary Greetings": "Names, which month, personal message",
    "Monthsary Invitation Celebration": "Names, which month, date, time, venue, plans",
    "Anniversary": "Names, years together, date, message or celebration details",
    "Other Celebrations": "Event type, host name, date, time, venue, details"
  },

  // Add real reviews here, e.g. { text: "Loved it!", author: "Maria S." }. Empty = section hidden.
  testimonials: [],

  /* ---------- LEGAL (starter text: review and edit before launch) ---------- */
  legal: {
    terms: [
      "The Invite Studio sells customized digital invitations and greetings. Nothing is printed or shipped.",
      "Orders are processed after payment has been verified. Delivery is not instant; please allow the stated processing time.",
      "Minor revisions to wording, names, dates and venues are included. Major redesigns may be charged separately.",
      "Because designs are customized, payments are generally non-refundable once work has started. Contact us if something went wrong.",
      "Please double-check all details you submit. We are not responsible for errors in the information provided."
    ],
    privacy: [
      "We collect only the details you submit (such as names, event details, email and contact number) so we can create and deliver your invitation and contact you about your order.",
      "We do not sell your information. Payment screenshots and reference numbers are used only to verify your payment.",
      "To request that your details be removed, email us at the address listed on this site."
    ]
  }
};
