import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { uniformCategories } from '../data/uniforms';
import axios from 'axios';

export default function ServiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const fetchService = async () => {
            // Check static data first
            const staticService = uniformCategories.find(c => c.id === id);
            if (staticService) {
                setService(staticService);
                setLoading(false);
                return;
            }

            // If not found, try backend
            try {
                const response = await axios.get(`http://localhost:3000/api/cards/${id}`);
                if (response.data) {
                    const dynamicService = {
                        ...response.data,
                        img: response.data.image,
                        category: "Custom Service",
                        fullDesc: response.data.description,
                        features: ["Premium Quality Material", "Custom Branding Available", "Durable Stitching", "Fast Turnaround"]
                    };
                    setService(dynamicService);
                }
            } catch (error) {
                console.error('Error fetching service:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F5F3EE]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0F4A46]"></div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F3EE] text-[#0F4A46]">
                <h1 className="text-4xl font-serif mb-4">Service Not Found</h1>
                <Link to="/" className="text-[#C8A96B] hover:underline flex items-center gap-2">
                    <ArrowLeft size={16} /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-[#F5F3EE] min-h-screen pt-24 pb-20">
            <div className="container mx-auto px-6 md:px-12">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-[#0F4A46] font-medium hover:text-[#C8A96B] transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span className="uppercase text-sm tracking-widest">Back</span>
                </motion.button>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="sticky top-32 rounded-[2rem] overflow-hidden shadow-2xl h-[50vh] lg:h-[70vh] w-full"
                    >
                        <div className="absolute inset-0 bg-black/10 z-10 hidden lg:block hover:bg-transparent transition-colors duration-500"></div>
                        <img
                            src={service.img}
                            alt={service.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 left-6 z-20">
                            <div className="px-4 py-2 bg-[#C8A96B]/90 backdrop-blur-sm text-[#0F4A46] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                                {service.category}
                            </div>
                        </div>
                    </motion.div>

                    <div className="py-6 lg:py-12">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#0F4A46] mb-8 leading-tight"
                        >
                            {service.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="text-lg text-gray-700 font-light mb-10 leading-relaxed"
                        >
                            {service.fullDesc}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-[#0F4A46] text-[#F5F3EE] p-8 md:p-10 rounded-[2rem] shadow-xl"
                        >
                            <h3 className="text-2xl font-serif text-[#C8A96B] mb-6">Key Specifications & Features</h3>
                            <ul className="space-y-4">
                                {service.features && service.features.map((feature, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + (idx * 0.1) }}
                                        className="flex items-start gap-4"
                                    >
                                        <CheckCircle2 className="text-[#C8A96B] flex-shrink-0 mt-1" size={20} />
                                        <span className="text-[#C7D2C8] leading-relaxed">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="mt-12 pt-8 border-t border-[#1F5C56]">
                                <Link
                                    to="/#contact"
                                    className="w-full block text-center px-8 py-4 bg-[#C8A96B] text-[#0F4A46] uppercase tracking-widest text-sm font-bold hover:bg-[#F5F3EE] transition-colors duration-300 rounded-sm"
                                >
                                    Inquire for Bulk Order
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
