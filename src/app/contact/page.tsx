import Layout from '@/components/layout/Layout';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component

// LightContactForm component remains the same
const LightContactForm = () => (
    <form className="space-y-6">
        {/* ... (First name, Email, Phone number, Message, Privacy Policy Checkbox, Send Message Button code remains the same) ... */}
        {/* First name */}
        <div>
            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
            </label>
            <input
                type="text"
                id="first-name"
                placeholder="First name"
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 placeholder-gray-400"
            />
        </div>

        {/* Email */}
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <input
                type="email"
                id="email"
                placeholder="you@company.com"
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 placeholder-gray-400"
            />
        </div>

        {/* Phone number */}
        <div>
            <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                Phone number
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
                <select
                    id="country-code"
                    className="pl-4 pr-1 py-3 border border-gray-300 bg-gray-50 text-gray-900 rounded-l-md focus:border-red-500 focus:ring-red-500"
                >
                    <option>US</option>
                    <option>DR</option>
                    {/* Add other options */}
                </select>
                <input
                    type="tel"
                    id="phone-number"
                    placeholder="+1 (555) 000-0000"
                    className="flex-1 block w-full px-4 py-3 rounded-none rounded-r-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 placeholder-gray-400"
                />
            </div>
        </div>

        {/* Message */}
        <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
            </label>
            <textarea
                id="message"
                className="mt-1 block w-full px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-900 shadow-sm focus:border-red-500 focus:ring-red-500 placeholder-gray-400"
            ></textarea>
        </div>

        {/* Privacy Policy Checkbox */}
        <div className="flex items-start">
            <div className="flex items-center h-5">
                <input
                    id="privacy-policy"
                    name="privacy-policy"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 border-gray-300 rounded bg-white focus:ring-red-500"
                />
            </div>
            <div className="ml-3 text-sm">
                <label htmlFor="privacy-policy" className="font-medium text-gray-600">
                    You agree to our friendly{' '}
                    <a href="#" className="text-red-600 hover:text-red-700">
                        privacy policy.
                    </a>
                </label>
            </div>
        </div>

        {/* Send Message Button */}
        <div>
            <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            >
                Send message
            </button>
        </div>
    </form>
);


export default function ContactPage() {
    const contactInfo = [
        // ... (contactInfo array remains the same) ...
        {
            icon: Phone,
            title: 'Call us on',
            details: ['+1 (829) 618 5692'],
            description: 'Available 24/7 for emergencies'
        },
        {
            icon: MessageCircle,
            title: 'Book On Whatsapp',
            details: ['+1 (829) 618 5692'],
            description: 'Quick booking and instant responses'
        },
        {
            icon: Mail,
            title: 'Mail us on',
            details: ['reservas@toursrepublica.com'],
            description: 'We respond within 2 hours'
        },
        {
            icon: MapPin,
            title: 'Visit our office',
            details: ['Local 14-B, Plaza Roque Bávaro', '23301, Dominican Republic'],
            description: 'Open Monday to Sunday'
        }
    ];

    const address = 'Local 14-B, Plaza Roque\nPunta Cana, Dominican Republic 23301';
    const phone = '8296185692';
    const email = 'info@toursrepublica.com';

    return (
        <Layout>
            <div className=" bg-gray-50"> {/* Overall background for the page */}
                {/* Main Contact Section - White Background */}
                <section className="bg-white py-12 md:py-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        {/* Two-Column Layout for Text and Form - ADDED h-full and items-stretch to align height */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-stretch h-full">
                            
                            {/* Left Column: Get in touch & Contact Details */}
                            <div className="space-y-10">
                                {/* Top Illustration Area - Adjusted to be smaller and align with the top of the form */}
                                <div className="mb-8 text-center md:text-left">
                                    {/* Removed max-w-sm/md and used fixed w-40 h-auto for a smaller image */}
                                    <div className="w-40 h-auto mx-auto md:mx-0"> 
                                        {/* REMOVED layout="responsive" to better control size */}
                                        <Image 
                                            src="/images/home/mail-contact.png" 
                                            alt="Get in Touch Illustration"
                                            width={160} // Fixed width
                                            height={160} // Fixed height
                                        />
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <h1 className="text-[36px] lg:text-5xl font-[500] text-gray-900">
                                        Get in touch
                                    </h1>
                                    <p className="text-gray-600 text-lg max-w-md">
                                        We'd love to hear from you. Please fill out this form.
                                    </p>
                                </div>

                                {/* Contact Information (matching the first image's left column) */}
                                <div className="space-y-6">
                                    
                                    {/* Address */}
                                    <div className="flex items-start space-x-3">
                                        <MapPin className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                                        <address className="text-gray-700 not-italic leading-relaxed">
                                            {address.split('\n').map((line, index) => (
                                                <p key={index}>{line}</p>
                                            ))}
                                        </address>
                                    </div>
                                    
                                    {/* Phone */}
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-6 h-6 text-red-600 flex-shrink-0" />
                                        <p className="text-gray-700">{`+1 ${phone}`}</p>
                                    </div>
                                    
                                    {/* Email */}
                                    <div className="flex items-center space-x-3">
                                        <Mail className="w-6 h-6 text-red-600 flex-shrink-0" />
                                        <p className="text-gray-700">{email}</p>
                                    </div>

                                </div>
                            </div>

                            {/* Right Column: Contact Form - Stretches to fill height */}
                            <div className="lg:pl-8">
                                <h2 className="text-[16px] font-[500] text-[#6FCCDC] mb-6">Contact us</h2>
                                <LightContactForm />
                            </div>

                        </div>
                    </div>
                </section>

                
            </div>

            {/* Google Maps Image Section (outside of the overall bg-gray-50 div, which is fine) */}
            <section className=" bg-gray-100"> {/* Light gray background for map section */}
                <div className=" px-0 sm:px-0 lg:px-0"> {/* Full width map */}
                    <Image
                        src="/images/home/Google-Maps-contact.png"
                        alt="Google Map of contact location"
                        width={1600}
                        height={600}
                        layout="responsive"
                        objectFit="cover"
                        className="w-full h-auto"
                    />
                </div>
            </section>

        </Layout>
    );
}