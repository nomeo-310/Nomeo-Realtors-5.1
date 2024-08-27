import { IconType } from "react-icons/lib";
import { TfiBag, TfiBookmarkAlt, TfiSignal } from "react-icons/tfi";
import { TbBellRinging, TbFileText, TbHomeHeart, TbHomePlus, TbHomeRibbon, TbLockPlus, TbUserEdit } from 'react-icons/tb';

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

export const testimonySliderSettings = {
  320: {
    slidesPerView: 1,
    spaceBetween: 10
  },
  440: {
    slidesPerView: 1,
    spaceBetween: 10
  },
  680: {
    slidesPerView: 2,
    spaceBetween: 10
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 12
  }
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

export const agentMenuList = [
  {
    label: 'property',
    icon: TbHomePlus
  },
  {
    label: 'post',
    icon: TbFileText
  }
];

export const mainItemList = [
  {
    label: 'notifications',
    icon: TbBellRinging
  },
  {
    label: 'likes',
    icon: TbHomeHeart
  },
  {
    label: 'saves',
    icon: TbHomeRibbon
  },
  {
    label: 'profile',
    icon: TbUserEdit
  },
  {
    label: 'password',
    icon: TbLockPlus
  },
];
