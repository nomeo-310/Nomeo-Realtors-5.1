import { IconType } from "react-icons/lib";
import { TfiBag, TfiBookmarkAlt, TfiSignal } from "react-icons/tfi";

export interface frequentlyAskedQuestion {
  question: string;
  answer: string;
};

export interface ourService {
  mainTitle: string
  subTitle: string
  icon: IconType
  id: string
};

export interface testimony {
  title: string
  testimony: string
  name: string
  career: string
  profileImage: string
};

export const frequentlyAskedQuestions = [
  {
    question: 'In buying a home, how much can I afford',
    answer: 'We recommend speaking with a mortgage lender to determine your pre-approval amount, which is a good starting point for your home search.'
  },
  {
    question: "What's the difference between a pre-approval and a pre-qualification?",
    answer: 'A pre-approval is a more in-depth analysis of your finances by a lender, giving you a stronger offer when negotiating with sellers. A pre-qualification is a less formal estimate.'
  },
  {
    question: "What are closing costs?",
    answer: 'Closing costs encompass various fees associated with buying a property, such as taxes, title insurance, and origination fees for your mortgage.'
  },
  {
    question: "How do I know how much my home is worth?",
    answer: "We can provide a Comparative Market Analysis (CMA) to estimate your property's value based on similar recently sold homes."
  },
  {
    question: "What should I do to prepare my home for selling?",
    answer: "We can offer recommendations for minor improvements and staging tips to enhance your home's appeal to potential buyers."
  },
  {
    question: "How long will it take to sell my house?",
    answer: "The timeframe can vary depending on market conditions and your property's unique features. We can provide an estimate based on current trends."
  },
  {
    question: "What's involved in the tenant screening process?",
    answer: "We typically conduct credit checks, background checks, and verify employment to ensure responsible tenants."
  },
  {
    question: "How do I handle maintenance requests?",
    answer: "For our property management clients, we can manage maintenance requests by coordinating with qualified repair professionals."
  },
  {
    question: "What are the benefits of using a property management service?",
    answer: "Property management services save you time and hassle by handling tenant screening, rent collection, and property maintenance on your behalf."
  },
  {
    question: "What are some government programs that can assist first-time homebuyers?",
    answer: "We can provide information on available government programs and grants that may help with down payment or closing costs."
  }
];

export const ourServices = [
  {
    mainTitle: 'Property Search & Acquisition',
    subTitle: 'This involves assisting clients in finding their ideal property, whether for purchase or rent. Real estate agents leverage their market expertise and local knowledge to source suitable properties, schedule viewings, and guide clients through the selection process.',
    icon: TfiSignal,
    id: '#acquisition'
  },
  {
    mainTitle: 'Sales & Marketing',
    subTitle: 'Real estate agencies support sellers in achieving a successful sale of their property.  This includes tasks like property valuation, developing a marketing strategy, conducting open houses, managing negotiations, and handling the closing process.',
    icon: TfiBookmarkAlt,
    id: '#sales'
  },
  {
    mainTitle: 'Property Management',
    subTitle: 'Real estate agencies offer property management services to investors who own rental properties.  This can encompass tasks like tenant screening, rent collection, maintenance coordination, lease renewals, and ensuring compliance with relevant regulations.',
    icon: TfiBag,
    id: '#management'
  },

];

export const testimonials = [
  {
    title: 'finding my dream home',
    testimony: "As a first-time homebuyer, I was feeling overwhelmed by the entire process.  Nomeo Suites was a lifesaver!  My agent, Tunde Koleosho, was incredibly patient and knowledgeable.  She took the time to understand my needs and budget, and ultimately found me the perfect condo in a great neighborhood.  I highly recommend Nomeo Suites to anyone looking to buy a home in Lagos.",
    name: "sarah jones", 
    career: "marketing manager",
    profileImage: '/images/profile_1.jpg'
  },
  {
    title: 'stress free leasing',
    testimony: "Owning rental properties can be a hassle, but not anymore thanks to Nomeo Suites!  Their property management services are fantastic.  They handle everything from tenant screening to rent collection and maintenance, allowing me to focus on other things.  I can confidently say that Nomeo Suites has made me a much more relaxed landlord.",
    name: "david thompson", 
    career: "software engineer",
    profileImage: '/images/profile_2.jpg'
  },
  {
    title: 'selling for top dollar',
    testimony: "I needed to sell my house quickly and for the best possible price.  Nomeo Suites came through in a big way!  Their market analysis was spot-on, and their marketing strategy attracted a ton of interest.  My agent, Segun Aiyegbami, is a skilled negotiator and secured a full-price offer within a week of listing.  Couldn't be happier with the service!",
    name: "aisha mohammed", 
    career: "architect",
    profileImage: '/images/profile_3.jpg'
  },
  {
    title: 'finding the perfect tenant',
    testimony: "Finding a good tenant can be a challenge.  Nomeo Suites made the process so easy.  They screened a pool of qualified applicants and presented me with only the best options.  The tenant they placed in my rental property is fantastic - responsible, respectful, and always pays rent on time.  I highly recommend their tenant placement services.",
    name: "emeka okafor", 
    career: "business owner",
    profileImage: '/images/profile_4.jpg'
  },
  {
    title: 'investment success',
    testimony: "Investing in real estate can be risky, but with Nomeo Suites by my side, I feel confident. Their team provided invaluable advice on property selection and financing, helping me secure a great rental property with excellent potential.  They even handle the ongoing management, ensuring a steady stream of income.  Thanks to Nomeo Suites, my real estate investment is off to a fantastic start!",
    name: "john & maria garcia", 
    career: "teachers",
    profileImage: '/images/profile_14.jpg'
  },
  {
    title: 'smooth sailing',
    testimony: "Buying a house is a big decision, and I wanted a realtor I could trust.  Nomeo Suites did not disappoint!  My agent, Babatunde Ayoola, was always available to answer my questions and explain the process.  She made sure everything went smoothly from start to finish.  I highly recommend Nomeo Suites for a stress-free buying experience.",
    name: "babatunde adebayo", 
    career: "doctor",
    profileImage: '/images/profile_6.jpg'
  },
  {
    title: 'neighborhood experts',
    testimony: "We were new to Lagos and unfamiliar with the different neighborhoods.  Nomeo Suites was an invaluable resource.  They provided detailed information on various areas, including schools, amenities, and safety considerations.  Their expertise helped us find the perfect family-friendly neighborhood for our needs.  We're so happy in our new home!",
    name: "lisa & michael wang", 
    career: "entrepreneurs",
    profileImage: '/images/profile_13.jpg'
  }
];

export const blogData = {
  mainTitle: "Are you navigating the exciting yet complex world of Lagos real estate? Look no further! At Nomeo Realtors, we're passionate about connecting you with your dream property and empowering you with knowledge. This blog is your gateway to expert advice, insightful market trends, and local real estate news. Whether you're a seasoned investor, a first-time homebuyer, or a renter seeking your perfect place, we've got something for everyone.",
};

export const termsAndConditions = {
  title: "Terms and Conditions",
  content: "Nomeo Realtors (hereinafter referred to as 'Nomeo') provides real estate services to its clients (hereinafter referred to as 'Client'). By engaging Nomeo's services, Client agrees to be bound by the following terms and conditions: Nomeo acts as an intermediary between Client and property owners. Nomeo is not a party to any property transaction and does not provide legal or financial advice. Client is responsible for conducting due diligence and seeking independent legal and financial counsel before entering into any agreement. Nomeo's commission is due upon the successful completion of a transaction, as outlined in the listing agreement. Client agrees to indemnify and hold Nomeo harmless from any claims, liabilities, or losses arising from Client's actions or representations. Nomeo reserves the right to terminate this agreement at any time for any reason. Client acknowledges that Nomeo may share Client's personal information with third-party service providers as necessary to fulfill its obligations. Nomeo is not responsible for any damages or losses incurred by Client as a result of the use of its services. These terms and conditions constitute the entire agreement between Client and Nomeo and supersede all prior or contemporaneous communications, representations, or agreements, whether oral or written. Any changes to these terms and conditions must be made in writing and signed by both parties."
};

export const termsOfService = {
  title: "Terms of Service",
  content: "Nomeo Realtors (hereinafter referred to as 'Nomeo') provides real estate services to its clients (hereinafter referred to as 'Client'). By engaging Nomeo's services, Client agrees to be bound by the following terms of service: Nomeo acts as an intermediary between Client and property owners. Nomeo is not a party to any property transaction and does not provide legal or financial advice. Client is responsible for conducting due diligence and seeking independent legal and financial counsel before entering into any agreement. Nomeo's commission is due upon the successful completion of a transaction, as outlined in the listing agreement. Client agrees to indemnify and hold Nomeo harmless from any claims, liabilities, or losses arising from Client's actions or representations. Nomeo reserves the right to terminate this agreement at any time for any reason. Client acknowledges that Nomeo may share Client's personal information with third-party service providers as necessary to fulfill its obligations. Nomeo is not responsible for any damages or losses incurred by Client as a result of the use of its services. These terms of service constitute the entire agreement between Client and Nomeo and supersede all prior or contemporaneous communications, representations, or agreements, whether oral or written. Any changes to these terms of service must be made in writing and signed by both parties."

};

export const cookiesSettings = {
  title: "Cookie Settings",
  content: "Nomeo Realtors (hereinafter referred to as 'Nomeo') uses cookies and similar technologies to enhance Client's experience on its website. Cookies are small text files that are stored on Client's device. Nomeo uses cookies to collect information about Client's usage of the website, such as pages visited, time spent, and preferences. This information is used to improve the website's content and functionality. Client can manage their cookie settings through their browser preferences. By continuing to use Nomeo's website, Client consents to the use of cookies as described in this policy."
};

export const privacyPolicy = {
  title: "Privacy Policy",
  content: "Nomeo Realtors (hereinafter referred to as 'Nomeo') is committed to protecting the privacy of its clients (hereinafter referred to as 'Client'). This privacy policy outlines how Nomeo collects, uses, and discloses Client's personal information. Nomeo collects Client's personal information, such as name, contact details, and financial information, as necessary to provide its real estate services. Nomeo uses Client's personal information to facilitate property searches, negotiate transactions, and communicate with Client. Nomeo may disclose Client's personal information to third-party service providers, such as mortgage lenders and title companies, as necessary to fulfill its obligations. Nomeo takes reasonable measures to protect Client's personal information from unauthorized access, disclosure, or use. However, no method of transmission over the internet or electronic storage is completely secure. Nomeo may update this privacy policy from time to time. Any changes will be posted on Nomeo's website. By using Nomeo's services, Client consents to the collection, use, and disclosure of their personal information as described in this privacy policy."
};

export const aboutUsData = {
  maintitle: "At Nomeo Realtors, we're passionate about empowering you to achieve your real estate goals in Lagos. Whether you're a first-time homebuyer, a seasoned investor, or a landlord seeking reliable tenants, we offer a comprehensive suite of services designed to streamline your journey and maximize your success.",
  whatSetUsApart: {
    subtitle: "Navigating the dynamic Lagos real estate market requires a partner who understands your goals and possesses the expertise to deliver exceptional results. At Nomeo Realtors, we stand out from the crowd with a unique combination of qualities that ensure a smooth and successful experience for our clients. What set us apart includes:",
    setApart: [
      {
        title: "Full-Spectrum Expertise",
        body:"We cater to both sides of the real estate market. Our team of experienced agents is adept at assisting buyers in finding their dream property and helping landlords secure qualified tenants for their investment properties."
      },
      {
        title: "Unwavering Client Focus",
        body:"We understand that your real estate needs are unique. We take the time to understand your specific goals, budget, and preferences, providing personalized guidance and support throughout the entire process."
      },
      {
        title: "Extensive Local Market Knowledge",
        body:"As a deeply rooted Lagos agency, we possess an unrivaled understanding of the local market. This translates into expert advice on neighborhoods, pricing trends, and property values."
      },
      {
        title: "Streamlined Buying and Selling",
        body:"Let us navigate the complexities of the real estate transaction for you. We handle everything from property search and negotiation to mortgage pre-approval recommendations and closing coordination."
      },
      {
        title: "Seamless Leasing and Property Management",
        body:"For landlords, we offer a stress-free leasing and property management experience. We take care of tenant screening, lease agreements, rent collection, and property maintenance, allowing you to enjoy the benefits of ownership without the hassle."
      },
      {
        title: "Unwavering Commitment to Quality",
        body:"We believe in transparency, integrity, and exceeding client expectations. Our commitment to these values has earned us a reputation for excellence in the Lagos real estate market."
      },
    ]
  },
  partneringWithUs: {
    subtitle: "The Lagos real estate market is a vibrant tapestry, brimming with opportunities but also complexities.  Navigating this landscape requires a partner you can trust; a partner who understands your goals, possesses the expertise to unlock them, and prioritizes your success throughout the journey. What partnering withus means:",
    whyPartner: [
      {
        title: "Access to a diverse range of properties",
        body:"We maintain a robust network of property listings across Lagos, ensuring you have a wide selection of options to consider, whether you're searching for a cozy apartment, a spacious family home, or a lucrative investment property."
      },
      {
        title: "Highly skilled and dedicated agents",
        body:"Our team of licensed and experienced agents is committed to providing you with exceptional service. They possess in-depth market knowledge, strong negotiation skills, and a genuine desire to see you achieve your real estate goals."
      },
      {
        title: "Streamlined communication and efficient transactions",
        body:"We leverage technology to make the process as smooth and convenient as possible for you. From online property listings to secure communication channels, we ensure you're informed and involved every step of the way"
      },
    ]
  },
  whatservice: {
    subtitle: "At Nomeo Realtors, we are your one-stop shop for all your Lagos real estate needs. Whether you're a seasoned investor seeking lucrative opportunities or a first-time homebuyer searching for your dream place, our experienced agents are here to guide you every step of the way.",
    ourServices: [
      {
        title: "Property Search and Acquisition (For Buyers and Renters)",
        body: "This involves assisting clients in finding their ideal property, whether for purchase or rent.  Real estate agents leverage their market expertise and local knowledge to source suitable properties, schedule viewings, and guide clients through the selection process. In course of this process, We take time to understand the need of our client by looking at their desired locations, their budget, checking out their lifestyle needs such proximity to school and work, and their move-in timelines (whether within a week or month). This part usually is the longest but with the help of our strong database and agent networks we are able to reduce the stress in half.", 
        id: "acquisition"
      },
      {
        title: "Sales and Marketing (For Sellers)",
        body: "Real estate agencies support sellers in achieving a successful sale of their property.  This includes tasks like property valuation, developing a marketing strategy, conducting open houses, managing negotiations, and handling the closing process. Selling your Lagos property can be an exciting prospect, but navigating the process alone can be daunting. At Nomeo Realtors, we understand the intricacies of the Lagos real estate market and are here to guide you every step of the way, ensuring a stress-free and successful sale. During the whole process, we conduct a thorough market analysis to determine the current market value of your property, considering comparable recent sales, current trends, and neighborhood factors. After all of these things we employ our content creator to help in the advertisement because we understand we are in a competitive market.", 
        id: "sales"
      },
      {
        title: "Property Management (For Investors)",
        body: "Real estate agencies offer property management services to investors who own rental properties.  This can encompass tasks like tenant screening, rent collection, maintenance coordination, lease renewals, and ensuring compliance with relevant regulations. Investing in Lagos real estate can be a strategic decision, but managing rental properties requires time, effort, and expertise. At Nomeo Realtors, we understand the unique needs of investors and offer comprehensive property management services that maximize your return on investment (ROI) while minimizing your stress. We meticulously screen potential tenants, conducting credit checks, employment verification, and reference checks to ensure responsible and qualified occupants for your property.", 
        id: "management"
      },

    ]
  },
  meetTheTeam: {
    subtitle: "At Nomeo Realtors, we believe our success hinges on the dedication and expertise of our team.  Our agents are more than just real estate professionals; they're passionate about connecting you with the perfect property in Lagos, whether you're a seasoned investor, a first-time homebuyer, or a renter seeking your dream apartment.",
    teamList: [
      {
        name: 'Eleazor Nwanni',
        role: 'Content Creator',
        imageUrl: '/images/profile_1.jpg',
        instagramUrl: 'https://www.instagram.com/eleazorbae23',
        linkedinUrl: 'https://www.linkedin.com/eleazorbae23',
        threadsUrl: 'https://www.threads.com/eleazorbae23',
      },
      {
        name: 'Salomi Onome',
        role: 'Affliate Agent, Ikorodu.',
        imageUrl: '/images/profile_2.jpg',
        instagramUrl: 'https://www.instagram.com/pearlRealtors',
        linkedinUrl: 'https://www.linkedin.com/pearlRealtors',
        threadsUrl: 'https://www.threads.com/pearlRealtors',
      },
      {
        name: 'Modupe Ozolua',
        role: 'Graphic Designer',
        imageUrl: '/images/profile_3.jpg',
        instagramUrl: 'https://www.instagram.com/modupeola23',
        linkedinUrl: 'https://www.linkedin.com/modupeola23',
        threadsUrl: 'https://www.threads.com/modupeola23',
      },
      {
        name: 'Bamidele Smart',
        role: 'Graphic Designer',
        imageUrl: '/images/profile_4.jpg',
        instagramUrl: 'https://www.instagram.com/bambam345',
        linkedinUrl: 'https://www.linkedin.com/bambam345',
        threadsUrl: 'https://www.threads.com/bambam345',
      },
      {
        name: 'Shane McNaughtey',
        role: 'Software Developer',
        imageUrl: '/images/profile_5.jpg',
        instagramUrl: 'https://www.instagram.com/bambam345',
        linkedinUrl: 'https://www.linkedin.com/bambam345',
        threadsUrl: 'https://www.threads.com/bambam345',
      },
      {
        name: 'Olatunde Salami',
        role: 'Software Developer',
        imageUrl: '/images/profile_6.jpg',
        instagramUrl: 'https://www.instagram.com/bambam345',
        linkedinUrl: 'https://www.linkedin.com/bambam345',
        threadsUrl: 'https://www.threads.com/bambam345',
      },
      {
        name: 'Olaseni Ogunlesi',
        role: 'Affliate Agent, Lekki',
        imageUrl: '/images/profile_7.jpg',
        instagramUrl: 'https://www.instagram.com/bambam345',
        linkedinUrl: 'https://www.linkedin.com/bambam345',
        threadsUrl: 'https://www.threads.com/bambam345',
      },
      {
        name: 'Olasile Omotara',
        role: 'Affliate Agent, Ikeja',
        imageUrl: '/images/profile_8.jpg',
        instagramUrl: 'https://www.instagram.com/bambam345',
        linkedinUrl: 'https://www.linkedin.com/bambam345',
        threadsUrl: 'https://www.threads.com/bambam345',
      },
      {
        name: 'Kennedy Palmer',
        role: 'Accounting Consultant',
        imageUrl: '/images/profile_9.jpg',
        instagramUrl: 'https://www.instagram.com/bambam345',
        linkedinUrl: 'https://www.linkedin.com/bambam345',
        threadsUrl: 'https://www.threads.com/bambam345',
      },
      {
        name: 'Dedier Croucher',
        role: 'Accounting Consultant',
        imageUrl: '/images/profile_10.jpg',
        instagramUrl: 'https://www.instagram.com/bambam345',
        linkedinUrl: 'https://www.linkedin.com/bambam345',
        threadsUrl: 'https://www.threads.com/bambam345',
      },
      {
        name: 'Adeyinka Olakunle',
        role: 'Affliate Agent, Ikeja',
        imageUrl: '/images/profile_11.jpg',
        instagramUrl: 'https://www.instagram.com/bambam345',
        linkedinUrl: 'https://www.linkedin.com/bambam345',
        threadsUrl: 'https://www.threads.com/bambam345',
      },
      {
        name: 'Bayowa Oseni',
        role: 'Affliate Agent, Mushin',
        imageUrl: '/images/profile_12.jpg',
        instagramUrl: 'https://www.instagram.com/bambam345',
        linkedinUrl: 'https://www.linkedin.com/bambam345',
        threadsUrl: 'https://www.threads.com/bambam345',
      },
    ]
  }
};

