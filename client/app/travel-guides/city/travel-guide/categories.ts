export interface Place {
  title: string;
  description: string;
}

export interface CategoryData {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  places: Place[];
}

export const EXPLORE_CATEGORIES: CategoryData[] = [
  {
    slug: "beaches",
    title: "Beaches",
    subtitle:
      "Golden sands, quiet coves and the world's longest natural sea beach on the Bay of Bengal.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    places: [
      {
        title: "Laboni Point (Laboni Beach)",
        description:
          "Laboni Point is the main, central, and busiest beach point in Cox's Bazar town. It is full of visitors, beach vendors, and activities throughout the day, and most tourists begin their trip here. The lively crowd and easy access make it the heart of the beach experience.",
      },
      {
        title: "Sugandha Point (Sugandha Beach)",
        description:
          "Sugandha Point is right next to Laboni Point and is famous for its beautiful sunset views in Cox's Bazar. The area is busy with street food stalls and beachside markets selling shells, pearls, and souvenirs. It is a great spot to spend the evening snacking and shopping by the sea.",
      },
      {
        title: "Kolatoli Point",
        description:
          "Kolatoli Point sits just south of Sugandha and is lined with major hotels, resorts, and seafood restaurants. Its convenient location makes it a favorite for visitors who want to stay close to the beach. It is a good place to enjoy fresh seafood with an ocean view.",
      },
      {
        title: "Inani Beach",
        description:
          "Inani Beach is about 18–25 km south of Cox's Bazar town and is famous for its coral stones scattered along the shore. The water is clearer and the atmosphere calmer than the town beaches. It is a favorite for photography, quiet walks, and a more peaceful day by the sea.",
      },
      {
        title: "Himchari Beach (also spelled Himchhori Beach)",
        description:
          "Himchari Beach is located beside Himchari National Park and is famous for its lush green hills and seasonal waterfalls. The mix of forest, hills, and sea makes it one of the most scenic stops on Marine Drive. It is especially beautiful during the monsoon, when the waterfalls are at their best.",
      },
      {
        title: "Darianagar Beach",
        description:
          "Darianagar Beach is a scenic spot along Marine Drive, known for its green hills and dramatic coastline. Visitors come for parasailing and to explore the coastal caves nearby. It is a good choice for those who want more adventure and scenery than the town beaches offer.",
      },
      {
        title: "Teknaf Beach",
        description:
          "Teknaf Beach is the southernmost point of the Cox's Bazar region, where the Naf River meets the Bay of Bengal near the Myanmar border. The quiet shoreline, river views, and remote feel make it very different from the busy town beaches. It is a good destination for travelers who enjoy long drives and off-the-beaten-path scenery.",
      },
      {
        title: "Patuartek Beach",
        description:
          "Patuartek Beach is a less-crowded beach further south along Marine Drive. It has rocky shores and dramatic views where the waves meet the stones. It is a good place for travelers looking to escape the crowds and enjoy a more natural, untouched setting.",
      },
      {
        title: "Shaibal Point",
        description:
          "Shaibal Point is a quieter stretch of beach near Motel Shaibal, away from the main tourist crowds. The calm atmosphere makes it popular for morning walks and peaceful sunrise views. It is a good choice for visitors who want a relaxed seaside experience.",
      },
      {
        title: "Nazirartek Beach",
        description:
          "Nazirartek Beach lies at the northern tip of Cox's Bazar, near the airport. It is best known as the country's largest dry-fish (shutki) processing hub, where rows of fish dry in the sun along the shore. It is a good stop for anyone curious about local coastal life and the origin of Cox's Bazar's famous dried fish dishes.",
      },
      {
        title: "Shamlapur Beach",
        description:
          "Shamlapur Beach is a quiet beach in the south, along Marine Drive near Teknaf, and sees far fewer tourists than the town beaches. It has a long, open shoreline and the feel of a small fishing village. It is a good spot for a peaceful visit, local fishing scenes, and a calm sunset.",
      },
      {
        title: "Salsa Beach",
        description:
          "Salsa Beach is a quiet and less-visited stretch of the Cox's Bazar coast, away from the busy tourist areas. It offers a peaceful setting with open sand and sea views. It is a good choice for visitors who prefer a calm and relaxed beach day.",
      },
    ],
  },
  {
    slug: "hills",
    title: "Hills",
    subtitle: "Green hill tracks and viewpoints overlooking the Bay of Bengal.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    places: [
      {
        title: "Himchari Hill (Himchari National Park, also spelled Himchhori)",
        description:
          "Himchari Hill is inside Himchari National Park, about 12 km south of Cox's Bazar town along Marine Drive. You can reach it by CNG auto-rickshaw, motorbike, or Jeep from Laboni or Kolatoli Point in around 25 to 30 minutes. The hill offers forest trails, panoramic sea views, and a seasonal waterfall that is best seen after the rains. It is the most popular hill stop in the area and is easy to combine with Himchari Beach.",
      },
      {
        title: "Darianagar Hill",
        description:
          "Darianagar Hill is on the Marine Drive road south of Cox's Bazar town, close to Himchari, and is reached by the same CNG or Jeep route from the main beach points. The road runs between green hills and the open sea, which makes it one of the best scenic drives in the region. Visitors stop here for viewpoints, photos, parasailing, and the nearby coastal caves. It is best visited in the morning or late afternoon.",
      },
      {
        title: "Jahajpur Hill (Hollywood Pahar)",
        description:
          "Jahajpur Hill, locally called Hollywood Pahar, is a hilltop viewpoint in the Cox's Bazar area that has become popular for its open green views and photo spots. Because it is a lesser-known local spot, it is best to ask your hotel or driver for directions, or to use a map app, and to hire a CNG or motorbike for the trip. Go in daylight, wear comfortable shoes, and expect a short climb at the end.",
      },
      {
        title: "Mini Bandarban",
        description:
          "Mini Bandarban is a hilly area near Cox's Bazar that is named for its resemblance to the hills of Bandarban. It gives visitors a taste of hill scenery, with winding paths and green slopes, without the long trip to the Chittagong Hill Tracts. Ask a local driver or use a map app to find the exact entrance, and travel in daylight. It suits travelers with limited time.",
      },
      {
        title: "Mainak Hill",
        description:
          "Mainak Hill is a quieter hill spot in the Cox's Bazar region and is less visited than the Marine Drive hills. It is a good choice for visitors who want a calm walk and natural surroundings away from the crowds. Because it is not on the main tourist route, hire a local CNG or motorbike driver who knows the way, and go in the daytime.",
      },
    ],
  },
  {
    slug: "beach-activities",
    title: "Beach Activities",
    subtitle: "Surfing, beach football, horse rides and sunset boat trips.",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
    places: [
      {
        title: "Horse Riding",
        description:
          "Horse riding is one of the most popular beach activities in Cox's Bazar, mainly at Laboni, Sugandha, and Kolatoli Points. Handlers wait along the shore with horses, so you simply walk up, agree on the price and ride time before you start, and a handler usually leads the horse. A short ride along the water costs about 200 to 500 BDT, and longer rides cost more. Prices are often negotiable, so confirm the total first. Try to go in the morning or late afternoon, when the sand is cooler.",
      },
      {
        title: "Jet Skiing",
        description:
          "Jet skiing is available at the main beach points, especially Laboni and Kolatoli. Operators run from small stands on the beach. You pay, wear a life jacket, and the operator gives a short safety briefing. Most rides are short, about 10 to 15 minutes, and some operators drive while you ride behind them. Expect to pay roughly 1,000 to 3,000 BDT per ride, depending on the duration and season. Choose an operator that provides life jackets, and avoid rough-sea days.",
      },
      {
        title: "Beach Bike",
        description:
          "Beach bikes and motorbikes can be rented near Laboni and Kolatoli. Choose a bike, agree on the price and ride time, and ride only on the hard, wet sand near the waterline, since soft sand is hard to ride on. Rentals typically cost about 300 to 1,000 BDT for a short ride or 30 minutes, and more for a longer session. Check the bike's condition before you start, and watch out for walkers and swimmers.",
      },
      {
        title: "Kite Flying",
        description:
          "Kite flying is a cheap, fun activity, especially in the evening when the sea breeze is steady. Beach vendors sell kites at all the main points, and you can start flying right on the open sand. Kites usually cost about 50 to 300 BDT, depending on the size and design. Pick a spot away from crowds and power lines, and avoid sharp kite string near other people.",
      },
      {
        title: "Surfing",
        description:
          "Surfing is the least common activity here but is growing, mostly near Laboni and Sugandha Points, where beginners can take lessons with local surf groups. Contact the instructor ahead of time, because lessons depend on wave and weather conditions. Lessons usually include a board and basic safety training, and the waves are better in the wetter months. Expect roughly 1,500 to 3,000 BDT for a lesson, or about 500 to 1,000 BDT per hour for a board rental. Always surf with a trained instructor, as sea conditions can change quickly.",
      },
    ],
  },
  {
    slug: "marine-wildlife",
    title: "Marine & Wildlife",
    subtitle: "Safaris, aquariums and sea life near Cox's Bazar",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    places: [
      {
        title: "Dulahazara Safari Park",
        description:
          "Dulahazara Safari Park is located in Dulahazara, along the Chittagong–Cox's Bazar highway, about 50 km north of Cox's Bazar town. You can reach it by bus, CNG auto-rickshaw, or private car in around one to one and a half hours. It is one of the first safari parks in Bangladesh, with a drive-through section for spotting lions, tigers, bears, deer, and elephants, plus a walking area and a small lake. Entry tickets usually cost about 100 to 300 BDT, and the safari vehicle costs extra. Go in the morning, when the animals are more active, and keep your windows closed during the drive.",
      },
      {
        title: "Radiant Fish World",
        description:
          "Radiant Fish World is an aquarium and marine-life attraction in Cox's Bazar town, close to the main beach area, so it is easy to reach by CNG or on foot from Laboni or Kolatoli Point. It displays colorful tropical fish, sea creatures, and other marine life in large tanks, and it is a good stop for families and children. Entry usually costs about 100 to 300 BDT. It takes around an hour to visit, so it fits well into a rainy day or a break from the beach.",
      },
    ],
  },
  {
    slug: "windmill",
    title: "Windmill",
    subtitle:
      "Two scenic windmill viewpoints that make perfect photo stops: one on Kutubdia Island and one on the Cox's Bazar mainland.",
    image:
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&w=800&q=80",
    places: [
      {
        title: "Kutubdia Windmill (Former Kutubdia Wind Power Centre)",
        description:
          "The former Kutubdia Wind Power Centre is on Kutubdia Island in Cox's Bazar District, a scenic island windmill stop reached by boat from the mainland.",
      },
      {
        title: "Cox's Bazar Windmill (Khurushkul Wind Power Plant)",
        description:
          "The Cox's Bazar Wind Power Plant, often called the Cox's Bazar windmill, is a 60 MW commercial wind farm in Khurushkul, near Chaufaldandi, in Cox's Bazar Sadar. It is a scenic photo stop and Bangladesh's first large-scale centralized wind power project, with rows of tall turbines standing against the sea and sky. It is on the mainland, so you can reach it from Cox's Bazar town by CNG auto-rickshaw, motorbike, or private car. Ask your driver for Khurushkul windmill or Chaufaldandi and use a map app to confirm the route. Visit in the morning or late afternoon for the best light and cooler weather.",
      },
    ],
  },
  {
    slug: "temples",
    title: "Temples",
    subtitle:
      "Buddhist temples and historic shrines tucked around the Cox's Bazar region.",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
    places: [
      {
        title: "Aggameda Khyang (Cox's Bazar Buddhist Temple)",
        description:
          "Aggameda Khyang is the best-known Buddhist monastery in Cox's Bazar town. It was founded in 1812, and its present Burmese-style building dates from 1898, with a main hall built around massive timber columns and polished teak floors. It sits at the foot of a hill under large trees, near the entrance to the town, close to Peshkar Para. You can reach it from the town area by bus or CNG. Dress modestly, take your shoes off before entering the hall, and ask before taking photos of monks or worshippers. Go in the morning for a quiet visit.",
      },
      {
        title: "Adinath Temple (Hindu Temple, Maheshkhali)",
        description:
          "Adinath Temple is a Hindu temple dedicated to Shiva, on top of Mainak Hill in Maheshkhali. It is in Thakurtala village of Gorakghata Union, about 85 metres above sea level. To get there, take a CNG or auto-rickshaw from town to Kasturi Ghat (Jetty No. 6), then a speedboat to Maheshkhali. The speedboat costs about Tk 80 per person and takes 20 to 25 minutes. From Gorakhghata jetty, a rickshaw takes you to the temple. The last boat back to Cox's Bazar leaves around 18:00, so start early. The Adinath festival in the month of Falgun draws large crowds.",
      },
      {
        title: "Vimukti Bibeshan Bhabna Kendra (Ramu Buddhist Temple)",
        description:
          "This temple complex in Ramu is known for its large golden reclining Buddha statue. The 100-foot statue is described as the world's third-largest. It is popular with local tourists and can only be reached by tuk-tuk. Ramu is on the mainland, south-east of Cox's Bazar town, so take a bus or hire a CNG or private car from the town for a half-day trip. Ask the driver for Bimukti Bidarshan Bhabna Kendra and confirm the route on a map app. Dress modestly and remove your shoes before entering the shrine areas.",
      },
      {
        title: "Rangkut Banashram Buddhist Monastery",
        description:
          "Rangkut Banashram (also called Ramkot) is in Rajarkul, Ramu Upazila, and is known as the oldest Buddhist monastery in Bangladesh. Its origins are traditionally traced back to Emperor Ashoka in the third century BCE, and it sits on a hilltop with forest paths and stone statues. To reach it, take a tuk-tuk from Ramu to the village of Ramkot, about 5 kilometres south of Ramu. Wear comfortable shoes, because there are steps to climb. Go in daylight and dress modestly.",
      },
      {
        title: "Mahathindawgree Buddhist Temple (Maha Thin Daw Gree)",
        description:
          "Maha Thin Daw Gree is a shrine hidden among trees that houses a number of Buddhist effigies. It is in Cox's Bazar town, close to Aggameda Khyang, so it is easy to combine with that visit. It is one of the two biggest khyangs in Cox's Bazar Sadar, along with Aggameda Khyang. Take a CNG or rickshaw from the beach area. Sources disagree on whether this shrine is inside the Aggameda complex or a separate site next to it, so ask locally when you arrive.",
      },
      {
        title: "U Chit San (Rakhine) Buddhist Temple, Ramu",
        description:
          "Ramu is known for its monasteries, temples, and Buddhist statues and images. The most famous temple on the Ramu riverbank is U Chit San (Rakhine) Ramu Buddhist Temple, in a small grove with a quiet atmosphere. You can combine it with other Ramu temples in one trip, using a CNG or tuk-tuk between them. Go in daylight, dress modestly, and ask locals for directions, because some temples are hidden in the forest.",
      },
      {
        title: "White Temple, Kolatoli",
        description:
          "The White Temple is a white-painted temple near Kolatoli in Cox's Bazar town, close to the hotel and beach area, so you can reach it on foot or by a short CNG ride from Kolatoli Point. It is a good short stop for photos and a quiet break from the beach. Visit in the morning or late afternoon, dress modestly, and ask before photographing worshippers.",
      },
    ],
  },
];

export const MARKET_CATEGORY: CategoryData = {
  slug: "markets",
  title: "Markets",
  subtitle: "Burmese Market, beachside stalls and local bazaars full of character.",
  image:
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80",
  places: [
    {
      title: "Burmese Market",
      description:
        "The Burmese Market is named for its mix of products from Myanmar and is popular for its Burmese pickles. The famous traditional market is at Tekpara, about four kilometres from Cox's Bazar Sadar. It has 306 shops. There are also Burmese market stalls near the beach points, such as Laboni and Sugandha, which are easier to reach on foot. You can find shawls, clothes, pickles, and souvenirs. Prices are negotiable, so bargain politely. Take a CNG from town to reach the Tekpara market.",
    },
    {
      title: "Jhinuk Market",
      description:
        "Jhinuk Market is next to Sugandha Beach, about one kilometre north of Dolphin Mor, with shops on both sides of the lane. It is also known as the shell market (chata market), and it is the best place to buy seashell items, oyster products, pearl jewellery, and decorations. Prices run a little high because it is a tourist spot. Compare a few shops and bargain before you buy. Shops usually stay open until late at night, and it is easy to reach on foot or by CNG from the main beach points.",
    },
    {
      title: "Sugandha Beach Market",
      description:
        "Sugandha Beach Market is a busy seaside market with souvenirs, handmade crafts, traditional garments, and seafood snacks. It sits right on Sugandha Point, so you can shop and watch the sunset in the same trip. Go in the late afternoon or evening, when the stalls are busiest. Walk from Laboni Point or take a short CNG ride. Agree on prices before you buy, and keep your valuables close in the crowd.",
    },
    {
      title: "Nazirartek Shutki Polli",
      description:
        "Nazirartek is known as the shutki polli (dried fish village). It is about 7 km from Cox's Bazar town and holds the country's largest dried fish processing industry. The area has around 600 small and large drying yards called mahals. You can watch workers sort, clean, and sun-dry fish, and buy dried fish directly from traders. Take a CNG or private car from town and go in the morning, when the yards are busiest. Production picks up after the fishing ban ends in late October. Some producers have been caught using toxins on dried fish, so buy from shops you trust and ask for clean, packed shutki.",
    },
    {
      title: "Boro Bazar Shopping Complex",
      description:
        "Boro Bazar is the main bazaar area of Cox's Bazar town, where locals do their everyday shopping. It is a good place for clothes, fabrics, household items, and a more local feel than the beach markets. Bargaining is expected, and vacuum-packed shutki from the fish section of the main bazaar travels well as a souvenir. Take a CNG from the beach area, and visit in the morning or afternoon, when most shops are open.",
    },
    {
      title: "Fish Market (Boro Bazar and BFDC Fisheries Ghat)",
      description:
        "The Cox's Bazar Fishery Ghat is the biggest destination for sea fish in the town, on the bank of the Bakkhali River next to the airport, where trawlers bring in their catch from the Bay of Bengal every day. The BFDC fish landing center and wholesale market was set up in 1965–66. You can watch the catch come in and see fresh fish, prawns, and crabs, and a smaller fish market in Boro Bazar also sells fresh seafood for retail buyers. Go early in the morning for the freshest catch and the most activity. A modern fish landing center is currently being built here, so some areas may be under construction.",
    },
  ],
};

export const WHAT_TO_BUY_CATEGORY: CategoryData = {
  slug: "what-to-buy",
  title: "What to Buy",
  subtitle: "Dried fish, pearls, handmade crafts, beachwear and local sweets.",
  image:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
  places: [
    {
      title: "Dried Seafood (Shutki & Balachao)",
      description:
        "Sun-dried fish is the most famous thing to buy in Cox's Bazar. Popular choices include Loitta (Bombay duck), Churi (ribbonfish), Rupchanda (pomfret), and dried shrimp. Ask for vacuum-sealed packs so the smell stays contained during your trip home. You can also buy ready-to-eat spicy shrimp balachao, a crunchy, chili-rich condiment that goes well with hot rice. Compare prices at a few shops before buying.",
    },
    {
      title: "Seashell & Pearl Souvenirs",
      description:
        "Seashell and pearl items are the classic beach souvenirs. You can find conch shell showpieces, wind chimes, and mirror frames, along with freshwater pearl jewelry such as necklaces, bracelets, and earrings. They are sold at the beach markets near Laboni and Sugandha Points. They are light and easy to pack, which makes them good gifts. Check the quality of pearl jewelry and bargain before you pay.",
    },
    {
      title: "Burmese & Rakhine Specialties",
      description:
        "The Burmese markets in Cox's Bazar are known for imported goods from Myanmar. Look for Burmese pickles (achar), tamarind candies, chocolates, and nuts. You can also buy traditional Rakhine handloom fabrics, shawls, and lungis, which make good gifts with local character. Prices are negotiable, so bargain politely.",
    },
    {
      title: "Beachwear",
      description:
        "Beach shops sell affordable printed shirts, maxi dresses, sun hats, and flip-flops. They are useful if you forgot something or want light, comfortable clothes for the heat. Shops are mostly near the main beach points. Try items on and compare prices at a few stalls before buying.",
    },
    {
      title: "Cosmetics & Footwear",
      description:
        "Burmese thanaka is a natural sandalwood skincare paste or powder, popular for cooling and protecting the skin. Burmese rubber and foam sandals are also a good buy because they are durable and comfortable for walking. You can find both in the Burmese markets. Check the sandals' fit and quality before paying, and bargain for a better price.",
    },
  ],
};

export const ALL_CATEGORIES: CategoryData[] = [
  ...EXPLORE_CATEGORIES,
  MARKET_CATEGORY,
  WHAT_TO_BUY_CATEGORY,
];

export const getCategory = (slug: string) =>
  ALL_CATEGORIES.find((c) => c.slug === slug);
