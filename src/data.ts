export const SPOTS = [
  {
    name: "Chaliyam Beach", mal: "ചാലിയം കടൽത്തീരം", tag: "Beach",
    bg: "linear-gradient(135deg,#006994,#00a8cc)",
    image: "https://picsum.photos/seed/chaliyambeach/600/400",
    lat: 11.1610, lng: 75.7980,
    desc: "A serene, less-crowded beach known for its calm waters and stunning sunset views over the Arabian Sea. Popular among local fishing families and nature lovers."
  },
  {
    name: "Chaliyam Lighthouse", mal: "ദീപസ്തംഭം", tag: "Heritage",
    bg: "linear-gradient(135deg,#8b6310,#c9941a)",
    image: "https://picsum.photos/seed/lighthouse/600/400",
    lat: 11.1625, lng: 75.7995,
    desc: "The iconic lighthouse standing guard over the Beypore-Chaliyam coastline. Offers panoramic views of the Arabian Sea and the Kozhikode skyline."
  },
  {
    name: "Chaliyar River Mouth", mal: "ചാലിയാർ നദീമുഖം", tag: "Nature",
    bg: "linear-gradient(135deg,#1a6b3c,#2d7a4f)",
    image: "https://picsum.photos/seed/rivermouth/600/400",
    lat: 11.1700, lng: 75.8080,
    desc: "Where the Chaliyar River meets the Arabian Sea — a breathtaking confluence popular for boat rides, backwater scenery and migratory bird watching."
  },
  {
    name: "Old Chaliyam Mosque", mal: "ജുമാ മസ്ജിദ്", tag: "Heritage",
    bg: "linear-gradient(135deg,#1a4a2e,#3d7a5a)",
    image: "https://picsum.photos/seed/mosque/600/400",
    lat: 11.1655, lng: 75.8025,
    desc: "A historic mosque dating back several centuries, reflecting the rich Islamic heritage of Chaliyam. Known for its traditional Kerala-style architecture."
  },
  {
    name: "Chaliyam Fishing Harbour", mal: "മൽസ്യബന്ധന തുറമുഖം", tag: "Culture",
    bg: "linear-gradient(135deg,#0d47a1,#1976d2)",
    image: "https://picsum.photos/seed/harbour/600/400",
    lat: 11.1645, lng: 75.7990,
    desc: "The lifeline of Chaliyam — a bustling fishing harbour where hundreds of boats set sail daily. Experience the authentic life of Kerala's fishing community."
  },
  {
    name: "Beypore Beach Walkway", mal: "ബേപ്പൂർ ബീച്ച് വഴി", tag: "Scenic",
    bg: "linear-gradient(135deg,#e65100,#f57c00)",
    image: "https://picsum.photos/seed/walkway/600/400",
    lat: 11.1685, lng: 75.8015,
    desc: "A beautiful coastal walkway connecting Chaliyam to the famous Beypore beach, lined with palm trees and offering spectacular sea views along the way."
  },
  {
    name: "Chaliyam Mangrove Forest", mal: "കണ്ടൽ കാടുകൾ", tag: "Eco",
    bg: "linear-gradient(135deg,#2e7d32,#43a047)",
    image: "https://picsum.photos/seed/mangroves/600/400",
    lat: 11.1650, lng: 75.8010,
    desc: "A precious ecosystem of mangrove forests along the Chaliyar riverbanks. Home to diverse bird species and marine life — perfect for eco-tourism."
  },
  {
    name: "Friday Market (Chantha)", mal: "ചന്ത", tag: "Market",
    bg: "linear-gradient(135deg,#6a1b9a,#8e24aa)",
    image: "https://picsum.photos/seed/market/600/400",
    lat: 11.1675, lng: 75.8050,
    desc: "The vibrant weekly market is the social heart of Chaliyam. Fresh fish, vegetables, spices and local produce — a true Kerala market experience."
  },
  {
    name: "Chaliyam Boat Jetty", mal: "ബോട്ട് ജെട്ടി", tag: "Transport",
    bg: "linear-gradient(135deg,#00695c,#00897b)",
    image: "https://picsum.photos/seed/jetty/600/400",
    lat: 11.1660, lng: 75.8040,
    desc: "The traditional boat jetty connecting Chaliyam to Beypore. Passengers can enjoy a scenic short ferry ride across the Chaliyar river mouth."
  },
  {
    name: "Thoovapara Temple", mal: "തൂവപ്പാറ ക്ഷേത്രം", tag: "Heritage",
    bg: "linear-gradient(135deg,#b71c1c,#e53935)",
    image: "https://picsum.photos/seed/temple/600/400",
    lat: 11.1695, lng: 75.8035,
    desc: "An ancient temple with deep roots in Chaliyam's cultural heritage. Known for its traditional festivals, especially the annual theyyam performances."
  }
];

export const BUS_DATA = [
  { time: "05:30", name: "Chaliyam Express", route: "kozhikode", dest: "Kozhikode Bus Stand", via: "Beypore, Pavangad", freq: "Once", stops: ["Chaliyam", "Beypore", "Meenchanda", "Kozhikode"] },
  { time: "06:00", name: "Beypore Service", route: "beypore", dest: "Beypore Junction", via: "Direct", freq: "Daily", stops: ["Chaliyam", "Boat Jetty", "Beypore"] },
  { time: "06:15", name: "City Connect", route: "kozhikode", dest: "Kozhikode City", via: "Feroke, Pavangad", freq: "Weekdays", stops: ["Chaliyam", "Feroke", "Kozhikode"] },
  { time: "06:45", name: "Feroke Shuttle", route: "feroke", dest: "Feroke Town", via: "Direct", freq: "Daily", stops: ["Chaliyam", "Karuvanthiruthi", "Feroke"] },
  { time: "07:00", name: "Chaliyam–Calicut", route: "calicut", dest: "Calicut Beach", via: "Beypore, SM Street", freq: "Daily", stops: ["Chaliyam", "Beypore", "SM Street", "Beach"] },
  { time: "07:30", name: "Morning Express", route: "kozhikode", dest: "Kozhikode Bus Stand", via: "Pavangad", freq: "Daily", stops: ["Chaliyam", "Meenchanda", "Kozhikode"] },
  { time: "08:00", name: "Beypore Ordinary", route: "beypore", dest: "Beypore Junction", via: "Chaliyam Road", freq: "Daily", stops: ["Chaliyam", "Beypore"] },
  { time: "08:30", name: "Kozhikode Fast", route: "kozhikode", dest: "Kozhikode City", via: "Feroke", freq: "Daily", stops: ["Chaliyam", "Feroke", "Kozhikode"] },
  { time: "09:00", name: "Feroke Service", route: "feroke", dest: "Feroke Town", via: "Beypore", freq: "Daily", stops: ["Chaliyam", "Beypore", "Feroke"] },
  { time: "09:30", name: "Beach Route", route: "calicut", dest: "Calicut Beach", via: "Pavangad", freq: "Daily", stops: ["Chaliyam", "Beach"] },
  { time: "10:00", name: "Mid Morning Express", route: "kozhikode", dest: "Kozhikode Bus Stand", via: "Direct", freq: "Daily", stops: ["Chaliyam", "Kozhikode"] },
  { time: "11:00", name: "Feroke Link", route: "feroke", dest: "Feroke Town", via: "Direct", freq: "Mon-Sat", stops: ["Chaliyam", "Feroke"] },
  { time: "12:00", name: "Noon Service", route: "kozhikode", dest: "Kozhikode City", via: "Pavangad", freq: "Daily", stops: ["Chaliyam", "Kozhikode"] },
  { time: "13:00", name: "Afternoon Beypore", route: "beypore", dest: "Beypore Junction", via: "Direct", freq: "Daily", stops: ["Chaliyam", "Beypore"] },
  { time: "14:00", name: "City Express", route: "kozhikode", dest: "Kozhikode Bus Stand", via: "Feroke", freq: "Daily", stops: ["Chaliyam", "Feroke", "Kozhikode"] },
  { time: "15:30", name: "Evening Feroke", route: "feroke", dest: "Feroke Town", via: "Beypore", freq: "Daily", stops: ["Chaliyam", "Beypore", "Feroke"] },
  { time: "16:00", name: "Beach Evening", route: "calicut", dest: "Calicut Beach", via: "SM Street", freq: "Daily", stops: ["Chaliyam", "SM Street", "Beach"] },
  { time: "17:00", name: "Evening Express", route: "kozhikode", dest: "Kozhikode Bus Stand", via: "Pavangad", freq: "Daily", stops: ["Chaliyam", "Kozhikode"] },
  { time: "18:30", name: "Last Beypore", route: "beypore", dest: "Beypore Junction", via: "Direct", freq: "Daily", stops: ["Chaliyam", "Beypore"] },
  { time: "20:00", name: "Night Service", route: "kozhikode", dest: "Kozhikode City", via: "Feroke", freq: "Daily", stops: ["Chaliyam", "Feroke", "Kozhikode"] },
];

export const EMERGENCY = [
  { name: "Chaliyam Police", sub: "Chaliyam Police Station", number: "0495-2480100", alt: "100", type: "police", category: "Police" },
  { name: "Ambulance", sub: "Emergency Ambulance Service", number: "108", alt: "1800-425-1010", type: "ambulance", category: "Medical" },
  { name: "Beypore Govt. Hospital", sub: "Nearest Government Hospital", number: "0495-2411234", alt: "", type: "hospital", category: "Medical" },
  { name: "Fire Force", sub: "Kerala Fire & Rescue Services", number: "101", alt: "0495-2720100", type: "fire", category: "Fire" },
  { name: "Coast Guard", sub: "Indian Coast Guard Kozhikode", number: "0495-2368484", alt: "1554", type: "coast", category: "Marine" },
  { name: "National Emergency", sub: "Single Emergency Number", number: "112", alt: "", type: "ambulance", category: "Emergency" },
  { name: "Women Helpline", sub: "Kerala Women Commission", number: "1800-425-1733", alt: "181", type: "women", category: "Women" },
  { name: "Child Helpline", sub: "Childline India Foundation", number: "1098", alt: "", type: "hospital", category: "Children" },
  { name: "Chaliyam Panchayat", sub: "Gram Panchayat Office", number: "0495-2480200", alt: "", type: "coast", category: "Govt" },
  { name: "KSEB Helpline", sub: "Electricity Emergency", number: "1912", alt: "0495-2720400", type: "fire", category: "Utility" },
  { name: "Water Authority", sub: "Kerala Water Authority", number: "1800-425-0340", alt: "", type: "coast", category: "Utility" },
  { name: "Medical Helpline", sub: "Health Emergency Kerala", number: "104", alt: "", type: "hospital", category: "Medical" }
];

export const DIRECTORY = [
  { id: "shop1", name: "Fresh Fish Market", cat: "fishing", catLabel: "Fishing", desc: "Daily fresh catch from local fishermen. Open 5AM–10AM.", rating: 4.8, reviews: 124, image: "https://picsum.photos/seed/fish/600/400" },
  { id: "shop2", name: "Chaliyam Tiffin Centre", cat: "food", catLabel: "Food", desc: "Traditional Kerala breakfast and meals. Puttu, Kanji, Appam.", rating: 4.5, reviews: 89, image: "https://picsum.photos/seed/tiffin/600/400" },
  { id: "shop3", name: "Sree Medicals", cat: "medical", catLabel: "Medical", desc: "24-hour pharmacy. All branded & generic medicines available.", rating: 4.2, reviews: 56, image: "https://picsum.photos/seed/pharmacy/600/400" },
  { id: "shop4", name: "Boat Repair & Service", cat: "fishing", catLabel: "Fishing", desc: "Fiberglass boats, engine repair, nets & equipment.", rating: 4.6, reviews: 42, image: "https://picsum.photos/seed/boat-repair/600/400" },
  { id: "shop5", name: "Al-Ameen Supermarket", cat: "retail", catLabel: "Retail", desc: "Groceries, household items, fresh vegetables & dairy.", rating: 4.3, reviews: 112, image: "https://picsum.photos/seed/supermarket/600/400" },
  { id: "shop6", name: "Chaliyam Auto Works", cat: "service", catLabel: "Services", desc: "Car, bike, auto repair. Electrical and AC service.", rating: 4.0, reviews: 38, image: "https://picsum.photos/seed/mechanic/600/400" },
  { id: "shop7", name: "Kerala Bakery", cat: "food", catLabel: "Food", desc: "Fresh bread, snacks, cakes and traditional Kerala sweets.", rating: 4.7, reviews: 156, image: "https://picsum.photos/seed/bakery/600/400" },
  { id: "shop8", name: "Mobile Repair Shop", cat: "service", catLabel: "Services", desc: "iPhone, Android repair, accessories, SIM services.", rating: 3.9, reviews: 27, image: "https://picsum.photos/seed/mobile/600/400" },
  { id: "shop9", name: "Chaliyam Tuition Centre", cat: "service", catLabel: "Services", desc: "Coaching for Classes 1–12. CBSE and State syllabus.", rating: 4.9, reviews: 65, image: "https://picsum.photos/seed/tuition/600/400" },
  { id: "shop10", name: "Gents Saloon", cat: "service", catLabel: "Services", desc: "Haircut, shave, facial — traditional Kerala barber shop.", rating: 4.4, reviews: 73, image: "https://picsum.photos/seed/saloon/600/400" },
  { id: "shop11", name: "Fishing Net Supplier", cat: "fishing", catLabel: "Fishing", desc: "Nylon nets, hooks, floats, fishing accessories wholesale.", rating: 4.5, reviews: 31, image: "https://picsum.photos/seed/net/600/400" },
  { id: "shop12", name: "Chaliyam Clinic", cat: "medical", catLabel: "Medical", desc: "General physician. Morning & evening OPD. Home visits available.", rating: 4.8, reviews: 92, image: "https://picsum.photos/seed/clinic/600/400" },
  { id: "shop13", name: "Vegetable Stall", cat: "retail", catLabel: "Retail", desc: "Fresh local vegetables and fruits. Available from 7AM daily.", rating: 4.1, reviews: 45, image: "https://picsum.photos/seed/vegetables/600/400" },
  { id: "shop14", name: "Electrical Works", cat: "service", catLabel: "Services", desc: "Home wiring, appliance repair, solar panel installation.", rating: 4.3, reviews: 29, image: "https://picsum.photos/seed/electrical/600/400" },
  { id: "shop15", name: "Book & Stationery Store", cat: "retail", catLabel: "Retail", desc: "School books, stationery, greeting cards, gift items.", rating: 4.6, reviews: 84, image: "https://picsum.photos/seed/stationery/600/400" },
  { id: "shop16", name: "Ice Cream & Juice Corner", cat: "food", catLabel: "Food", desc: "Fresh fruit juices, ice cream, milkshakes. Perfect for summer.", rating: 4.7, reviews: 108, image: "https://picsum.photos/seed/juice/600/400" },
];

export const NEWS = [
  { type: "Event", date: "Mar 28, 2026", eventDate: "2026-04-15", title: "Chaliyam Fishermen's Day Festival", desc: "Annual celebration honoring the fishing community. Cultural programs, fish auction, and special prayer ceremony at the harbour from 4 PM onwards.", image: "https://picsum.photos/seed/festival/600/400" },
  { type: "Notice", date: "Mar 25, 2026", eventDate: "2026-04-10", title: "VHSS Annual Day Celebration", desc: "Chaliyam Government VHSS annual day celebrations this Friday. Cultural performances by students, prize distribution ceremony by MLA.", image: "https://picsum.photos/seed/school/600/400" },
  { type: "News", date: "Mar 22, 2026", eventDate: "2026-03-22", title: "Mangrove Restoration Drive Success", desc: "Over 500 mangrove saplings planted along the Chaliyar riverbanks by local volunteers. The initiative aims to restore the ecosystem.", image: "https://picsum.photos/seed/mangrove/600/400" },
  { type: "Alert", date: "Mar 20, 2026", eventDate: "2026-03-20", title: "Road Work: Chaliyam–Beypore Road", desc: "PWD announces maintenance work on the main Chaliyam–Beypore road this week. Expect minor delays. Alternative route via beach road recommended.", image: "https://picsum.photos/seed/road/600/400" },
  { type: "Sports", date: "Mar 18, 2026", eventDate: "2026-04-05", title: "Chaliyam Football Tournament 2026", desc: "Annual inter-ward football tournament begins this weekend. 12 teams registered. Venue: Chaliyam Maidan. Entry free for spectators.", image: "https://picsum.photos/seed/football/600/400" },
  { type: "Govt", date: "Mar 15, 2026", eventDate: "2026-03-30", title: "Panchayat Ward Meeting", desc: "Monthly ward sabha meeting on March 30 at the Panchayat office. Citizens can raise local issues directly with ward members and officials.", image: "https://picsum.photos/seed/meeting/600/400" },
];

export const PEOPLE = [
  { name: "P. A. Mohammed Riyas", role: "MLA, Beypore Constituency", phone: "0495-2345678", image: "https://ui-avatars.com/api/?name=Mohammed+Riyas&background=0D8ABC&color=fff&size=200", category: "Govt", website: "https://kerala.gov.in" },
  { name: "K. V. Safiya", role: "Ward Member", phone: "+91 98765 43210", image: "https://ui-avatars.com/api/?name=Safiya&background=4CAF50&color=fff&size=200", category: "Govt", website: "https://lsgkerala.gov.in" },
  { name: "Ramesh Kumar", role: "Professional Photographer", phone: "+91 99999 88888", image: "https://picsum.photos/seed/ramesh/200/200", category: "Media" },
  { name: "TasteBuds Catering", role: "Event Catering Service", phone: "+91 88888 77777", image: "https://picsum.photos/seed/catering/200/200", category: "Service", website: "https://example.com/tastebuds" },
  { name: "Ali Hassan", role: "Local Tourist Guide", phone: "+91 77777 66666", image: "https://picsum.photos/seed/ali/200/200", category: "Tourism" },
  { name: "LensMagic Videography", role: "Drone & Event Videographer", phone: "+91 66666 55555", image: "https://picsum.photos/seed/lens/200/200", category: "Media" },
];

export const BUSINESS_LISTINGS = [
  { type: "sell", typeLabel: "For Sale", date: "Today", title: "Fishing Boat — 25 Feet FRP", desc: "Good condition fiberglass boat, 2022 model. Engine included. Ready to sail.", price: "₹ 3,50,000", contact: "+919876543210", contactName: "Abdul Rahman", contactDesc: "Local fisherman with 20 years experience.", images: ["https://picsum.photos/seed/boat1/400/300", "https://picsum.photos/seed/boat2/400/300"], lat: 11.1645, lng: 75.7990 },
  { type: "rent", typeLabel: "Rent", date: "Yesterday", title: "2BHK House Near Beach Road", desc: "Fully furnished, ground floor. Suitable for family. Near Chaliyam Junction.", price: "₹ 8,000/mo", contact: "+919876543211", contactName: "Suresh Kumar", contactDesc: "Property owner", images: ["https://picsum.photos/seed/house1/400/300"], lat: 11.1577, lng: 75.8014 },
  { type: "sell", typeLabel: "For Sale", date: "2 days ago", title: "Hero Splendor — 2021", desc: "Single owner, 12,000 km run. All documents clear. Excellent condition.", price: "₹ 65,000", contact: "+919876543212", contactName: "Mohammed Ali", contactDesc: "First owner", images: ["https://picsum.photos/seed/bike1/400/300"], lat: 11.1534, lng: 75.8126 },
  { type: "service", typeLabel: "Service", date: "3 days ago", title: "Plumbing & Pipe Work", desc: "All types of plumbing work. Call for free estimate. Available 7 days.", price: "Call for rate", contact: "+919876543213", contactName: "Rajan Plumber", contactDesc: "Certified plumber with 15 years in Chaliyam.", images: [], lat: 11.1559, lng: 75.8112 },
  { type: "buy", typeLabel: "Wanted", date: "4 days ago", title: "Wanted: Used Fishing Nets", desc: "Looking for used nylon fishing nets in good condition. Any quantity.", price: "Best price offered", contact: "+919876543214", contactName: "Koya", contactDesc: "Wholesale fish merchant", images: [], lat: 11.1660, lng: 75.8040 },
  { type: "sell", typeLabel: "For Sale", date: "5 days ago", title: "Fresh Prawns & Fish — Bulk", desc: "Fresh daily catch available for bulk buyers. Contact morning 6–9 AM.", price: "Market Rate", contact: "+919876543215", contactName: "Hassan", contactDesc: "Boat owner", images: ["https://picsum.photos/seed/fish1/400/300"], lat: 11.1645, lng: 75.7990 },
  { type: "service", typeLabel: "Service", date: "1 week ago", title: "Home Tuition — Maths & Science", desc: "Experienced teacher offering home tuition for Classes 8–12. CBSE/State.", price: "₹ 800/month", contact: "+919876543216", contactName: "Priya Teacher", contactDesc: "M.Sc B.Ed qualified teacher", images: [], lat: 11.1559, lng: 75.8112 },
  { type: "rent", typeLabel: "Rent", date: "1 week ago", title: "Shop Space for Rent", desc: "150 sq ft shop space at Chaliyam main road. Suitable for any business.", price: "₹ 5,000/mo", contact: "+919876543217", contactName: "Manoj", contactDesc: "Building owner", images: ["https://picsum.photos/seed/shop1/400/300"], lat: 11.1534, lng: 75.8126 },
];
