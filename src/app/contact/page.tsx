import Header from '../components/header/page';
import Footer from '../components/footer/page';
import { FaEnvelope, FaPhone } from 'react-icons/fa';

const Contact = () => {
    return(
        <div>
            <Header variant='solid' />
            <main className='bg-white overflow-hidden flex flex-col justify-center items-center h-screen py-32'>
                <section className="max-w-4xl mx-auto flex flex-col items-center">
                    <h1 className="text-3xl font-semibold text-center">Contact Us</h1>
                    <p className="mt-4 text-center text-gray-600 max-w-[600px] m-auto">
                        Get in touch with us for any inquiries, support, or feedback. We&apos;d love to hear from you!<br/>Please note, Zu&apos;s Foundation is a non-profit platform dedicated to empowering families of children with special needs across Africa. We do not offer commercial services or accept unsolicited funding request.
                    </p>
                    <div className="flex items-center justify-center gap-12 mt-9">
                        <div className="flex items-center flex-col">
                            <FaPhone className="inline-block mr-2 text-green-600 text-5xl bg-gray-100 p-3 rounded-[4px] mb-2"/>
                            <a href="tel:+2349012345678" className="text-lg text-gray-700 hover:underline">+234 901 234 5678</a>
                        </div>
                        <div className="flex items-center flex-col">
                            <FaEnvelope className="inline-block mr-2 text-green-600 text-5xl bg-gray-100 p-3 rounded-[4px] mb-2"/>
                            <a href="mailto:info@momspecialstories.org" className="text-lg text-gray-700 hover:underline">info@momspecialstories.org</a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default Contact;