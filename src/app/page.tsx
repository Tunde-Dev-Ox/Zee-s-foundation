'use client';
import Image from "next/image";
import Header from './components/header/page';
import Link from "next/link";
import { useState } from "react";
import Footer from "./components/footer/page";
import DonationCard from "./components/card/donationCard/page";
// import { FaArrowRight } from "react-icons/fa";
export default function Home() {
  const servicesData = [
    {
      index: 1,
      btnText: "Therapy Referrals",
      cardText: "We believe every child—regardless of their family's income—deserves access to specialized care. Through our therapy referral program, we connect families with qualified professionals who offer sliding-scale fees and pro-bono services. Your child's development shouldn't depend on your wallet.",
      imgUrl: "https://images.pexels.com/photos/7579310/pexels-photo-7579310.jpeg"
    },
    {
      index: 2,
      btnText: "Community",
      cardText: "When you join Zee's foundation, you become part of a family, our support groups that understands your journey. Share your challenges without judgment, celebrate your child's milestones with people who truly get it, and find hope in the stories of others. Because no one should walk this path alone.",
      imgUrl: "https://images.pexels.com/photos/5711375/pexels-photo-5711375.jpeg"
    },
    {
      index: 3,
      btnText: "Healthcare",
      cardText: "A bulk of the money we receive through donations all around the world goes to providing adequate healthcare for children with special needs in Africa. When you join Zee's foundation, your child receive free healthcare sponsored by our donors.",
      imgUrl: "https://images.pexels.com/photos/5327914/pexels-photo-5327914.jpeg"
    },
    {
      index: 4,
      btnText: "Resources",
      cardText: "We're committed to breaking down barriers to information. Our growing library offers free resources tailored to African families—from developmental activities to healthcare navigation guides. Every family deserves access to quality information that helps their child thrive, regardless of their circumstances.",
      imgUrl: "https://images.pexels.com/photos/4216041/pexels-photo-4216041.jpeg"
    },
    {
      index: 5,
      btnText: "Child development",
      cardText: "Understanding your child's unique developmental path is crucial. Our resources provide insights into milestones, strategies for support, and ways to celebrate progress. Every child develops at their own pace, and we're here to guide you through every step of the journey.",
      imgUrl: "https://images.pexels.com/photos/8033899/pexels-photo-8033899.jpeg"
    }
  ]

  const [service, setService] = useState(servicesData[0]);
  const handleServiceClick = (index: number) => {
    setService(servicesData[index - 1]);
  }

  const [amount, setAmount] = useState("");

  const handleDonate = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount), email: "donor@example.com" }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="">
      <Header variant="transparent"/>
      <main className="bg-white">
      <section className="relative h-screen pt-[4rem]">
        <video src="https://www.pexels.com/download/video/5133776/"
         muted
         autoPlay
         loop
         controls={false}
        className="absolute inset-0 w-full h-full object-cover">
        </video>
        {/* <Image
          src="https://images.pexels.com/photos/3207532/pexels-photo-3207532.jpeg"
          alt="special need child"
          width={100}
          height={100}
          unoptimized
          priority
          className="w-full h-full object-cover inset-0 absolute"
        /> */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-start justify-center h-full text-white max-w-[1230px] m-auto py-4 px-4">
            <h1 className="text-4xl md:text-[3.75rem] font-[900] mb-4 leading-tight max-w-[750px]">
              Every Child&apos;s Story<br/>
               <span className="text-[#9bdd55] font-[900]"> Deserves to be Told.</span>
            </h1>
            <p className="text-[18px] mb-8 max-w-[600px] leading-relaxed">
              Empowering families of children with special needs across Africa through shared stories, resources, and unwavering support.
            </p>
            <button className="bg-white cursor-pointer py-2 px-9 text-black font-medium text-[18px] border-none hover:bg-[#eeeded] transition-colors duration-300">
              Join the community
            </button>
          </div>
      </section>
      <section className="pt-12">
        <div className="max-w-[1230px] m-auto px-4 flex justify-between items-center bg-[url('/H9uRg9OcPpfpk6YCqCbyyTkAN14.png')] relative bg-no-repeat bg-cover bg-center max-[1000px]:flex-col">
        <div className="flex flex-col max-w-[600px] max-[1000px]:mb-8 max-[1000px]:items-center">
          <span className="text-base mb-7">
            What we do
          </span>
          <p className="text-4xl text-green-900 font-semibold mb-9 leading-snug max-[1000px]:text-center max-[1000px]:text-3xl">
            Join us in our mission to providing a supportive platform for families of children with special needs across Africa.
          </p>
          <Link href="/">
          <button className="bg-[#9bdd55] cursor-pointer py-2 px-9 text-white font-medium text-[18px] border-none w-[30%] max-[1000px]:w-[100%]">
            Our mission
          </button>
          </Link>
        </div>
        <div className="flex gap-6 max-w-[400px]">
          <div className="flex flex-col gap-3 bg-[#9bdd55]">
            <Image src="https://images.pexels.com/photos/7579304/pexels-photo-7579304.jpeg" alt="community" unoptimized priority width={60} height={60} className="w-full object-cover"/>
            <h3 className="text-2xl px-3">
              Community Support
            </h3>
            <p className="text-base px-3">
              Connect with other families, share experiences, and find emotional support in our inclusive community.
            </p>
            <Link href="#" className="text-base px-3 underline underline-offset-4 mb-2.5">
              Learn more
              {/* <FaArrowRight className="inline-block ml-2"/> */}
            </Link>
          </div>
        </div>
        </div>
      </section>
      <div className="w-full h-[1px] bg-gray-200 mt-[6rem]"></div>
      <section className="pt-12">
        <div className="max-w-[1230px] m-auto px-4 flex items-start justify-between max-[850px]:flex-col max-[850px]:gap-8">
          <p className="text-base">
            Our story
          </p>
          <p className="text-4xl max-w-[700px] font-medium max-[850px]:text-2xl max-[850px]:w-full">
          Zee&apos;s Foundation’s mission is to empower families raising children with special needs across Africa.<br /><br />
          We provide critical resources, support networks, and educational guidance, ensuring families have the tools they need to help their children thrive. Our 100% volunteer-run organization connects parents, caregivers, and professionals, all while creating inclusive communities where every child’s story is valued and celebrated.
          </p>
        </div>
      </section>
      <section className="py-32 overflow-hidden pb-0 max-[768px]:pt-26">
        <div className="relative z-10 max-w-[1230px] mx-auto px-4 flex flex-col items-center text-center pt-[10rem] pb-[10rem] max-[768px]:py-0 max-[768px]:text-left">
          <h2 className="text-5xl sm:text-7xl font-bold mb-4 text-gray-900 max-[768px]:text-4xl">
            Over 5 African Countries
          </h2>
          <p className="text-lg sm:text-[18px] text-gray-700 mb-8">
            We operate across Africa — one family at a time.
          </p>
          <Link href="/volunteer" className="w-full sm:w-auto">
            <button className="bg-[#9bdd55] cursor-pointer py-3 px-10 text-white font-medium text-lg border-none rounded-lg shadow-md hover:bg-[#85c83f] transition-all">
              Volunteer
            </button>
          </Link>
          <div className="h-full -z-[1] w-full absolute top-0 left-0 right-0 bottom-0 max-[768px]:relative max-[768px]:mt-7">
             <img src="/map.webp" alt="map" className="w-full h-full object-contain"/>
          </div>
        </div>
      </section>
      <section className="bg-white">
  <div className="max-w-[1230px] mx-auto px-4 py-20 text-center">
    <h3 className="text-5xl mb-8 font-semibold text-gray-900 max-[768px]:text-4xl">
      The Problem
    </h3>
    <p className="text-base mb-12 text-gray-700 max-w-[800px] mx-auto leading-relaxed">
      Across Africa, countless families raising children with special needs
      face overwhelming barriers — emotional, social, and systemic.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
      <div className="bg-green-950 p-6 text-white rounded-xl hover:scale-[1.05] duration-300">
        <span className="text-3xl font-bold mb-4 inline-block text-[#9bdd55]">01</span>
        <h4 className="text-xl mb-3 text-[#9bdd55]">Lack of Awareness</h4>
        <p className="text-zinc-300 text-base leading-relaxed">
          Many parents have never heard of autism, Down syndrome, or cerebral palsy — 
          leaving children undiagnosed and misunderstood for years.
        </p>
      </div>

      <div className="bg-green-950 p-6 text-white rounded-xl hover:scale-[1.05] duration-300">
        <span className="text-3xl font-bold mb-4 inline-block text-[#9bdd55]">02</span>
        <h4 className="text-xl mb-3 text-[#9bdd55]">Limited Access to Care</h4>
        <p className="text-zinc-300 text-base leading-relaxed">
          Quality therapies, diagnosis centers, and inclusive schools are often 
          out of reach — especially for families in rural or low-income areas.
        </p>
      </div>

      <div className="bg-green-950 p-6 text-white rounded-xl hover:scale-[1.05] duration-300">
        <span className="text-3xl font-bold mb-4 inline-block text-[#9bdd55]">03</span>
        <h4 className="text-xl mb-3 text-[#9bdd55]">Cultural Stigma</h4>
        <p className="text-zinc-300 text-base leading-relaxed">
          Too many families face shame, blame, or even abandonment 
          because of outdated beliefs about special needs.
        </p>
      </div>

      <div className="bg-green-950 p-6 text-white rounded-xl hover:scale-[1.05] duration-300">
        <span className="text-3xl font-bold mb-4 inline-block text-[#9bdd55]">04</span>
        <h4 className="text-xl mb-3 text-[#9bdd55]">Isolation</h4>
        <p className="text-zinc-300 text-base leading-relaxed">
          Without community or guidance, many parents feel alone and powerless, 
          unsure where to turn for help or understanding.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="bg-gray-50">
  <div className="max-w-[1230px] mx-auto px-4 py-20 text-center">
    <h3 className="text-5xl mb-8 font-semibold text-gray-900 max-[768px]:text-4xl">
      How We Help
    </h3>
    <p className="text-base mb-12 text-gray-700 max-w-[800px] mx-auto leading-relaxed">
      We’re building a network of awareness, hope, and empowerment — 
      giving every child a chance to thrive, and every parent a reason to believe again.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
      <div className="bg-[#9bdd55] p-6 text-black rounded-xl hover:scale-[1.05] duration-300">
        <span className="text-3xl font-bold mb-4 inline-block text-green-950">01</span>
        <h4 className="text-xl mb-3 font-semibold text-green-950">Awareness Campaigns</h4>
        <p className="text-gray-800 text-base leading-relaxed">
          We amplify stories, organize workshops, and share educational content 
          that help communities better understand special needs.
        </p>
      </div>

      <div className="bg-[#9bdd55] p-6 text-black rounded-xl hover:scale-[1.05] duration-300">
        <span className="text-3xl font-bold mb-4 inline-block text-green-950">02</span>
        <h4 className="text-xl mb-3 font-semibold text-green-950">Parent Support</h4>
        <p className="text-gray-800 text-base leading-relaxed">
          We connect families through peer groups, mentorship, and access to 
          experts who guide them through each stage of care.
        </p>
      </div>

      <div className="bg-[#9bdd55] p-6 text-black rounded-xl hover:scale-[1.05] duration-300">
        <span className="text-3xl font-bold mb-4 inline-block text-green-950">03</span>
        <h4 className="text-xl mb-3 font-semibold text-green-950">Resources & Tools</h4>
        <p className="text-gray-800 text-base leading-relaxed">
          From diagnosis checklists to therapy guides, we make practical, 
          localized resources freely available to all families.
        </p>
      </div>

      <div className="bg-[#9bdd55] p-6 text-black rounded-xl hover:scale-[1.05] duration-300">
        <span className="text-3xl font-bold mb-4 inline-block text-green-950">04</span>
        <h4 className="text-xl mb-3 font-semibold text-green-950">Community Connection</h4>
        <p className="text-gray-800 text-base leading-relaxed">
          We create safe online and offline spaces where parents share stories, 
          find strength, and celebrate their children’s growth together.
        </p>
      </div>
    </div>
  </div>
</section>

      <DonationCard />
      <section className="pt-12">
        <div className="max-w-[1230px] m-auto px-4 py-16 text-center">
          <h3 className="text-5xl font-semibold mb-8 max-w-[800px] m-auto">
            Founder&apos;s Story
          </h3>
          <p className="text-base mb-12 max-w-[800px] m-auto">
            Founded in 2025 by Emayak Ochonogor, a mother of a child with special needs, started Zee&apos;s Foundation after struggling to find support and resources in her community. Determined to make a difference, she created this platform to connect families, share stories, and provide much-needed resources. Today, Zee&apos;s foundation has just begun and growing rapidly, with thousands of members across Africa, all united by the belief that every child&apos;s story deserves to be told.
          </p>
          <div className="max-w-4xl mx-auto">
  <div className="relative p-1 rounded-2xl bg-gradient-to-br from-green-500 via-green-700 to-green-950">
    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
      <iframe 
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/3r_Ri9aRYAI?si=sw11y3VBNg7Z30ZH" 
        title="Mum's Special Stories - Our Journey" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
      />
    </div>
  </div>
</div>
        </div>
      </section>
      <section className="pt-12">
        <div className="max-w-[1230px] m-auto px-4 py-16 text-center">
          <h3 className="text-5xl font-semibold mb-8 max-w-[800px] m-auto">
            Ready to take action?
          </h3>
          <p className="text-base mb-12 max-w-[600px] m-auto">
            Join us in making a difference. Here are some ways you can help:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] m-auto">
            <div className="bg-green-950 p-6 text-white rounded-lg">
              <h4 className="text-2xl mb-4">Donate</h4>
              <p className="text-base mb-6">
                Your financial support helps us provide resources, support groups, and advocacy for families in need.
              </p>
              <button className="bg-[#9bdd55] cursor-pointer py-2 px-6 text-white font-medium text-[16px] border-none hover:bg-[#eeeded] hover:text-black duration-700">
                Donate Now
              </button>
            </div>
            <div className="bg-green-950 p-6 text-white rounded-lg">
              <h4 className="text-2xl mb-4">Volunteer</h4>
              <p className="text-base mb-6">
                Share your time and skills to help us organize events, manage support groups, and spread awareness.
              </p>
              <Link href="/volunteer">
              <button className="bg-[#9bdd55] cursor-pointer py-2 px-6 text-white font-medium text-[16px] border-none hover:bg-[#eeeded] hover:text-black duration-700">
                Sign Up
              </button>
              </Link>
            </div>
            <div className="bg-green-950 p-6 text-white rounded-lg">
              <h4 className="text-2xl mb-4">Spread the Word</h4>
              <p className="text-base mb-6">
                Follow us on social media, share our stories, and help raise awareness about autism and Down syndrome in Africa.
              </p>
              <button className="bg-[#9bdd55] cursor-pointer py-2 px-6 text-white font-medium text-[16px] border-none hover:bg-[#eeeded] hover:text-black duration-700">
                Follow Us
              </button>
            </div>
          </div>
        </div>  
      </section>
      <Footer />
    </main>
    </div>
  );
}
