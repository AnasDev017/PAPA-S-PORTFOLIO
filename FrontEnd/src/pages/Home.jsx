import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scissors, CheckCircle2, Star, ArrowRight, MapPin, Phone, Mail, Award, Clock } from 'lucide-react';
import { uniformCategories } from '../data/uniforms';
import { Instagram, Facebook } from '../components/Icons'; // Need to create a small icons file for this

const reviews = [
    { id: 1, name: 'James Harrington', text: 'The uniforms were absolutely perfect. Exceptional craftsmanship and professional service. We ordered 200 security uniforms and they exceeded expectations.', rating: 5, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
    { id: 2, name: 'Sarah Jenkins', text: 'We partnered with them for our entire hotel staff uniform revamp. The quality of the fabric is top-notch and handles daily washing beautifully.', rating: 5, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
    { id: 3, name: 'David Chen', text: 'Best customized corporate wear in the UAE. The attention to detail from the initial embroidery sample to the final delivery was unmatched.', rating: 5, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
    { id: 4, name: 'Eleanor Vance', text: 'Impeccable service and unparalleled skill. Our medical staff feels incredibly comfortable in the breathable scrubs provided by this team.', rating: 5, img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
];

const colors = {
    primary: '#0F4A46',
    secondary: '#1F5C56',
    sage: '#C7D2C8',
    cream: '#F5F3EE',
    gold: '#C8A96B',
};

const SectionHeader = ({ title, subtitle, light = false }) => (
    <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-16 px-4"
    >
        <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`h-[1px] w-12 ${light ? 'bg-[#C8A96B]' : 'bg-[#C8A96B]'}`}></div>
            <span className={`uppercase tracking-widest text-sm font-semibold ${light ? 'text-[#C8A96B]' : 'text-[#C8A96B]'}`}>
                Expertise
            </span>
            <div className={`h-[1px] w-12 ${light ? 'bg-[#C8A96B]' : 'bg-[#C8A96B]'}`}></div>
        </div>
        <h2 className={`text-5xl md:text-6xl font-serif mb-6 ${light ? 'text-[#F5F3EE]' : 'text-[#0F4A46]'}`}>
            {title}
        </h2>
        {subtitle && (
            <p className={`text-lg md:text-xl font-light ${light ? 'text-[#C7D2C8]' : 'text-gray-600'}`}>
                {subtitle}
            </p>
        )}
    </motion.div>
);

const Hero = () => {
    const heroRef = useRef(null);
    const [profileImage, setProfileImage] = useState("https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80&w=1000");

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/profile/latest');
                if (response.data && response.data.profileImage) {
                    setProfileImage(response.data.profileImage);
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };
        fetchProfileImage();
    }, []);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });
    const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const opacityParallax = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Prevent awkward line breaks. Instead of mapping characters individually without word bounds,
    // we map words first to ensure 'inline-block' prevents the word itself from breaking.
    const title = "PREMIER UNIFORM MANUFACTURING";
    let charCount = 0;
    const splitTitle = title.split(" ").map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-3 lg:mr-4 last:mr-0 whitespace-nowrap">
            {word.split("").map((char, charIndex) => {
                const delay = 0.2 + (charCount * 0.03);
                charCount++;
                return (
                    <motion.span
                        key={charIndex}
                        className="inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {char}
                    </motion.span>
                );
            })}
        </span>
    ));

    return (
        <section id="home" ref={heroRef} className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-[#F5F3EE]">
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[#E8E4D9] rounded-bl-[10rem] -z-10 transform translate-x-10 opacity-70"></div>

            <div className="container mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div style={{ opacity: opacityParallax }} className="z-10 pt-10 lg:pt-0">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#C7D2C8]/50 backdrop-blur-md rounded-full mb-8 shadow-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse"></span>
                        <span className="text-sm font-medium tracking-wider text-[#0F4A46] uppercase">Best Uniform Making Services in UAE</span>
                    </motion.div>

                    <h1 className="text-[8.5vw] min-[400px]:text-4xl sm:text-5xl lg:text-7xl tracking-tight font-serif font-bold text-[#0F4A46] leading-[1.1] mb-6">
                        {splitTitle}
                    </h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="text-lg md:text-xl text-[#1F5C56]/80 font-light max-w-xl mb-10 leading-relaxed"
                    >
                        Delivering high-quality, durable, and stylish uniforms tailored perfectly for Corporate, Healthcare, Security, and Hospitality sectors across the UAE.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                        className="flex flex-wrap gap-4"
                    >
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#services"
                            className="px-8 py-4 bg-[#0F4A46] text-[#F5F3EE] uppercase tracking-widest text-sm font-medium flex items-center gap-2 group shadow-lg shadow-[#0F4A46]/30"
                        >
                            View Services
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                        <motion.a
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#contact"
                            className="px-8 py-4 bg-transparent border-[1.5px] border-[#0F4A46] text-[#0F4A46] uppercase tracking-widest text-sm font-medium hover:bg-[#0F4A46] hover:text-[#F5F3EE] transition-colors duration-300"
                        >
                            Get a Quote
                        </motion.a>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 h-[60vh] lg:h-[80vh] w-full"
                >
                    <div className="absolute inset-0 rounded-t-full rounded-bl-full overflow-hidden shadow-2xl bg-black">
                        <div className="w-full h-full bg-[#0F4A46]/10 absolute inset-0 z-10 mix-blend-overlay"></div>
                        <motion.img
                            style={{ y: yParallax }}
                            src={profileImage}
                            alt="Uniform Manufacturing"
                            className="w-full h-[120%] object-cover object-center -top-[10%] relative"
                        />
                    </div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                        className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#C8A96B] rounded-[40%] mix-blend-multiply blur-2xl opacity-60"
                    ></motion.div>
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                        className="absolute top-20 -right-10 w-40 h-40 bg-[#1F5C56] rounded-[30%] mix-blend-multiply blur-3xl opacity-50"
                    ></motion.div>

                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
                        transition={{
                            scale: { duration: 0.8, delay: 1.5, type: "spring" },
                            y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }
                        }}
                        className="absolute top-10 -left-10 glass-dark p-6 rounded-2xl hidden md:flex items-center gap-4 shadow-xl"
                    >
                        <div className="w-12 h-12 bg-[#C8A96B] rounded-full flex items-center justify-center text-[#0F4A46]">
                            <Award size={24} />
                        </div>
                        <div>
                            <p className="text-[#C8A96B] font-bold text-2xl font-serif">#1</p>
                            <p className="text-[#F5F3EE] text-xs uppercase tracking-wider">in UAE Uniforms</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

const About = () => {
    const features = [
        "Bulk Order Capacity",
        "Premium Durable Fabrics",
        "Custom Logo Embroidery",
        "Fast Turnaround Times"
    ];
    const stats = [
        { label: 'Years Experience', value: '30+', icon: <Clock size={24} /> },
        { label: 'Units Delivered', value: '1M+', icon: <Scissors size={24} /> },
        { label: 'Corporate Clients', value: '500+', icon: <Award size={24} /> },
    ];

    return (
        <section id="about" className="py-24 lg:py-32 bg-[#0F4A46] text-[#F5F3EE] relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#C8A96B 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <SectionHeader
                    title="The Uniform Experts"
                    subtitle="Merging bulk manufacturing efficiency with uncompromised quality."
                    light={true}
                />
                <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl group">
                            <div className="absolute inset-0 bg-[#C8A96B]/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800"
                                alt="Uniform manufacturing fabric"
                                className="w-full h-[600px] object-cover scale-105 group-hover:scale-100 transition-transform duration-[1.5s]"
                            />
                        </div>
                        <div className="absolute -bottom-10 -right-10 md:right-10 bg-[#F5F3EE] text-[#0F4A46] p-8 rounded-2xl shadow-2xl hidden md:grid grid-cols-3 gap-6 border-b-4 border-[#C8A96B]">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="text-center">
                                    <div className="text-[#C8A96B] flex justify-center mb-2">{stat.icon}</div>
                                    <div className="text-xl md:text-3xl font-serif font-bold">{stat.value}</div>
                                    <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <h3 className="text-3xl md:text-4xl font-serif text-[#C8A96B]">Trusted Partner</h3>
                        <p className="text-lg text-[#C7D2C8] font-light leading-relaxed">
                            Based in the heart of the UAE, we are a leading uniform manufacturer specializing in comprehensive workwear solutions. We understand that a uniform is the face of your company.
                            <br /><br />
                            Whether you need heavy-duty safety gear for industrial work or elegant staff uniforms for a luxury hotel, our fabrics are sourced globally to ensure durability, comfort, and professional aesthetics.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 pt-6">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="flex items-center gap-3 bg-[#1F5C56]/50 backdrop-blur-md p-4 rounded-xl border border-[#C7D2C8]/10 hover:border-[#C8A96B]/50 transition-colors"
                                >
                                    <CheckCircle2 className="text-[#C8A96B]" size={20} />
                                    <span className="text-sm font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const ServicesGrid = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/cards');
                if (response.data && response.data.length > 0) {
                    setCards(response.data);
                } else {
                    setCards(uniformCategories); // Fallback to static data
                }
            } catch (error) {
                console.error('Error fetching cards:', error);
                setCards(uniformCategories);
            } finally {
                setLoading(false);
            }
        };
        fetchCards();
    }, []);

    return (
        <section id="services" className="py-24 lg:py-32 bg-[#F5F3EE]">
            <div className="container mx-auto px-6 md:px-12">
                <SectionHeader
                    title="Uniform Categories"
                    subtitle="Explore our comprehensive range of specialized uniforms for every industry sector."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {cards.map((item, idx) => (
                        <Link to={`/service/${item.id || item._id}`} key={item.id || item._id}>
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative h-[450px] rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-shadow duration-500 block"
                            >
                                <img
                                    src={item.img || item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#0F4A46] via-[#0F4A46]/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                                <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]">
                                    <div className="inline-block px-3 py-1 bg-[#C8A96B] text-[#0F4A46] text-xs font-bold uppercase tracking-wider rounded-full mb-3 self-start shadow-sm">
                                        {item.category || "Service"}
                                    </div>
                                    <h3 className="text-2xl lg:text-3xl font-serif text-[#F5F3EE] mb-2">{item.title}</h3>
                                    <p className="text-[#C7D2C8] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                                        {item.desc || item.description}
                                    </p>

                                    <div className="w-0 h-[2px] bg-[#C8A96B] mt-4 group-hover:w-full transition-all duration-[1s] ease-out"></div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => {
    const scrollReviews = [...reviews, ...reviews];

    return (
        <section id="reviews" className="py-24 lg:py-32 bg-[#C7D2C8] overflow-hidden relative">
            <SectionHeader
                title="Client Testimonials"
                subtitle="Read what our leading corporate clients have to say about their uniform manufacturing experience."
            />

            <div className="relative mt-16 pb-12 flex">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#C7D2C8] to-transparent z-10 hidden md:block"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#C7D2C8] to-transparent z-10 hidden md:block"></div>

                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 30
                    }}
                    className="flex gap-8 px-4"
                    style={{ width: "max-content" }}
                >
                    {scrollReviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="w-[350px] md:w-[450px] bg-[#F5F3EE] p-8 md:p-10 rounded-[2rem] shadow-xl flex-shrink-0 relative group hover:-translate-y-2 transition-transform duration-500"
                        >
                            <div className="absolute -top-6 right-8 text-[#C8A96B] opacity-20 group-hover:scale-110 transition-transform">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                            </div>

                            <div className="flex gap-1 mb-6 text-[#C8A96B]">
                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>

                            <p className="text-[#0F4A46] font-serif text-xl italic mb-8 relative z-10 leading-relaxed">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#C8A96B]" />
                                <div>
                                    <h4 className="font-bold text-[#0F4A46]">{review.name}</h4>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Verified Client</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const Contact = () => {
    const [formState, setReactFormState] = React.useState('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setReactFormState('submitting');
        setTimeout(() => {
            setReactFormState('success');
            setTimeout(() => setReactFormState('idle'), 4000);
        }, 1500);
    };

    return (
        <section id="contact" className="bg-[#0F4A46] text-[#F5F3EE] pt-24 lg:pt-32 pb-10 rounded-t-[3rem] -mt-12 relative z-20">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-2 gap-16 mb-24">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-serif text-[#C8A96B] mb-6">Request a Quote</h2>
                        <p className="text-[#C7D2C8] mb-12 font-light max-w-md md:text-lg">
                            Contact us today to discuss your bulk uniform requirements. We offer personalized consultations and competitive pricing across the UAE.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4 group">
                                <div className="p-4 bg-[#1F5C56]/50 rounded-full text-[#C8A96B] group-hover:bg-[#C8A96B] group-hover:text-[#0F4A46] transition-all duration-300 shadow-sm group-hover:shadow-lg">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif font-bold mb-1 group-hover:text-[#C8A96B] transition-colors">Head Office</h4>
                                    <p className="text-[#C7D2C8] text-sm">Industrial Area 1, Dubai<br />United Arab Emirates</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-4 bg-[#1F5C56]/50 rounded-full text-[#C8A96B] group-hover:bg-[#C8A96B] group-hover:text-[#0F4A46] transition-all duration-300 shadow-sm group-hover:shadow-lg">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif font-bold mb-1 group-hover:text-[#C8A96B] transition-colors">Call Us</h4>
                                    <p className="text-[#C7D2C8] text-sm">+971 50 123 4567<br />Mon-Sat: 9am - 7pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <div className="p-4 bg-[#1F5C56]/50 rounded-full text-[#C8A96B] group-hover:bg-[#C8A96B] group-hover:text-[#0F4A46] transition-all duration-300 shadow-sm group-hover:shadow-lg">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-serif font-bold mb-1 group-hover:text-[#C8A96B] transition-colors">Email</h4>
                                    <p className="text-[#C7D2C8] text-sm">info@uaeuniforms.com</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#1F5C56]/30 p-8 md:p-10 lg:p-12 rounded-[2rem] border border-[#1F5C56]/50 shadow-2xl text-[#F5F3EE]"
                    >
                        <h3 className="text-3xl font-serif font-bold mb-8 text-[#C8A96B]">Send a Message</h3>

                        {formState === 'success' ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="h-full flex flex-col items-center justify-center text-center py-12"
                            >
                                <motion.div
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
                                    className="w-20 h-20 bg-[#C8A96B] text-[#0F4A46] rounded-full flex items-center justify-center mb-6 shadow-xl"
                                >
                                    <CheckCircle2 size={40} />
                                </motion.div>
                                <h4 className="text-3xl font-serif font-bold mb-3 text-[#C8A96B]">Message Sent!</h4>
                                <p className="text-[#C7D2C8]">We will get back to you within 24 hours to proceed with your request.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#C7D2C8]">Company Name</label>
                                    <input required type="text" className="w-full bg-transparent border-b border-[#C7D2C8]/30 py-2 focus:outline-none focus:border-[#C8A96B] transition-colors placeholder:text-[#C7D2C8]/40 text-[#F5F3EE]" placeholder="Your Company LLC" />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#C7D2C8]">Email Address</label>
                                        <input required type="email" className="w-full bg-transparent border-b border-[#C7D2C8]/30 py-2 focus:outline-none focus:border-[#C8A96B] transition-colors placeholder:text-[#C7D2C8]/40 text-[#F5F3EE]" placeholder="contact@example.com" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#C7D2C8]">Category</label>
                                        <select className="w-full bg-transparent border-b border-[#C7D2C8]/30 py-2 focus:outline-none focus:border-[#C8A96B] transition-colors text-[#C7D2C8] [&>option]:bg-[#0F4A46] [&>option]:text-[#F5F3EE]">
                                            {uniformCategories.map(cat => (
                                                <option key={cat.id}>{cat.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#C7D2C8]">Quantity & Details</label>
                                    <textarea required rows="3" className="w-full bg-transparent border-b border-[#C7D2C8]/30 py-2 focus:outline-none focus:border-[#C8A96B] transition-colors resize-none placeholder:text-[#C7D2C8]/40 text-[#F5F3EE]" placeholder="Estimate quantity needed and any specific requirements..."></textarea>
                                </div>
                                <button
                                    disabled={formState === 'submitting'}
                                    type="submit"
                                    className="w-full py-5 mt-4 pt-8"
                                >
                                    <div className="w-full py-4 bg-[#C8A96B] text-[#0F4A46] uppercase tracking-widest text-sm font-bold hover:bg-[#F5F3EE] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center justify-center rounded-lg">
                                        {formState === 'submitting' ? 'Sending...' : 'SUBMIT REQUEST'}
                                    </div>
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>

                <div className="relative border-t border-[#1F5C56] mt-20 pt-16 pb-8 flex flex-col md:flex-row justify-between items-end gap-6 overflow-hidden min-h-[200px]">
                    {/* Large Background Text */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none">
                        <span className="text-[12vw] md:text-[10vw] font-serif font-bold text-[#F5F3EE]/5 leading-none whitespace-nowrap">
                            TAHIR HUSSAIN
                        </span>
                    </div>

                    <p className="text-[#C7D2C8] text-xs font-semibold tracking-widest uppercase relative z-10">
                        &copy; {new Date().getFullYear()} TH STUDIOS.
                    </p>

                    <div className="flex gap-8 text-[#C7D2C8] text-xs font-semibold tracking-widest uppercase relative z-10">
                        <a href="#" className="hover:text-[#C8A96B] transition-colors">Instagram</a>
                        <a href="#" className="hover:text-[#C8A96B] transition-colors">Facebook</a>
                    </div>

                    <p className="text-[#C7D2C8] text-xs font-semibold tracking-widest uppercase relative z-10">
                        Made With Perfection
                    </p>
                </div>
            </div>
        </section>
    );
};

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <ServicesGrid />
            <Testimonials />
            <Contact />
        </>
    );
}
