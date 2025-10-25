import Header from "../components/header/page";
import Footer from "../components/footer/page";
import DonationCard from "../components/card/donationCard/page";
import Image from "next/image";

const Donate = () => {
    return(
        <>
            <Header variant="solid" />
            <main className="bg-white">
                <section className="pt-20">
                    <div className="max-w-[1230px] m-auto px-4 flex items-center justify-between flex-col">
                        <h1 className="pt-10 text-5xl font-bold pb-10">
                            Every Child Deserves a Chance
                        </h1>
                        <figure className="w-full">
                            <Image
                                src="https://images.pexels.com/photos/3802189/pexels-photo-3802189.jpeg"
                                alt="Afrcian child"
                                width={100}
                                height={100}
                                unoptimized
                                priority
                                className="w-full h-full"
                            />
                        </figure>
                    </div>
                </section>
                <section className="pt-12">
                    <div className="max-w-[1230px] m-auto px-4 flex  justify-between flex-col">
                        <div className="flex justify-between items-start">
                            <h2 className="text-5xl text-left">
                                Why Donate?
                            </h2>
                            <p className="max-w-[600px] text-base font-medium">
                                Zee&apos; Foundation donation program is a vital part of our mission to support children with special needs across Africa. By donating, you change the lives of children out there, in other words, you save a life. Here&apos;s why your donation matters:
                            </p>
                        </div>
                    </div>
                </section>
                <DonationCard />
            </main>
            <Footer />
        </>
    )
}

export default Donate;