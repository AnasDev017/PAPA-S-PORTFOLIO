import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, LogOut, Image as ImageIcon, FileText, Upload, Settings, LayoutDashboard, Lock, Mail, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Profile Settings State
    const [isUploadingProfile, setIsUploadingProfile] = useState(false);

    // Card Details State
    const [cardTitle, setCardTitle] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    const [cardImage, setCardImage] = useState(null);
    const [isUploadingCard, setIsUploadingCard] = useState(false);
    const [existingCards, setExistingCards] = useState([]);
    const [loadingCards, setLoadingCards] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === 'admin@gmail.com' && password === 'admin123') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    const fetchExistingCards = async () => {
        setLoadingCards(true);
        try {
            const res = await axios.get('https://papa-s-portfolio-ds4q.vercel.app/api/cards');
            setExistingCards(res.data);
        } catch (err) {
            console.error('Error fetching cards:', err);
        } finally {
            setLoadingCards(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchExistingCards();
        }
    }, [isAuthenticated]);

    const handleDeleteCard = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This card will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0F4A46',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`https://papa-s-portfolio-ds4q.vercel.app/api/cards/${id}`);
                Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The card has been removed.' });
                fetchExistingCards(); // Refresh list
            } catch (err) {
                Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to delete card.' });
            }
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-md w-full border border-[#C7D2C8]/30"
                >
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-[#0F4A46] text-[#C8A96B] rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                            <Lock size={32} className="-rotate-3" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-center text-[#0F4A46] mb-2">Admin Portal</h2>
                    <p className="text-center text-[#1F5C56]/70 mb-8">Sign in to manage your portfolio</p>

                    <form onSubmit={handleLogin} className="space-y-6">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#0F4A46]">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1F5C56]/50" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#F5F3EE]/50 border border-[#C7D2C8] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B] transition-all text-[#0F4A46]"
                                    placeholder="admin@gmail.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#0F4A46]">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1F5C56]/50" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#F5F3EE]/50 border border-[#C7D2C8] rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B] transition-all text-[#0F4A46]"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3.5 mt-2 bg-[#C8A96B] text-[#0F4A46] rounded-xl font-bold uppercase tracking-wider text-sm flex items-center justify-center gap-2 hover:bg-[#0F4A46] hover:text-[#C8A96B] transition-all shadow-md group"
                        >
                            Sign In
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F3EE] pt-24 pb-24">
            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-[#C7D2C8]/30"
                >
                    <div className="flex flex-col md:flex-row min-h-[80vh]">
                        {/* Sidebar */}
                        <div className="w-full md:w-64 lg:w-72 bg-[#0F4A46] text-[#F5F3EE] p-6 lg:p-8 flex flex-col flex-shrink-0">
                            <h2 className="text-2xl font-serif font-bold text-[#C8A96B] mb-8 flex items-center gap-3">
                                <Settings size={28} />
                                Admin Panel
                            </h2>
                            <nav className="flex-1 space-y-3">
                                <button
                                    onClick={() => document.getElementById('manage-cards').scrollIntoView({ behavior: 'smooth' })}
                                    className="w-full flex items-center gap-3 text-[#F5F3EE] hover:text-[#C8A96B] transition-colors p-3 rounded-xl bg-[#1F5C56]/80 border border-[#C8A96B]/30 shadow-sm"
                                >
                                    <LayoutDashboard size={20} />
                                    <span className="font-medium tracking-wide">Manage Cards</span>
                                </button>
                            </nav>
                            <div className="mt-8 pt-6 border-t border-[#1F5C56]">
                                <button onClick={() => setIsAuthenticated(false)} className="flex items-center gap-2 text-sm text-[#C7D2C8] hover:text-white transition-colors" type="button">
                                    <LogOut size={20} />
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 p-6 sm:p-8 lg:p-12 bg-[#F5F3EE]">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                                <div>
                                    <h1 className="text-3xl font-serif text-[#0F4A46] font-bold">Portfolio Settings</h1>
                                    <p className="text-[#1F5C56]/70 mt-2">Manage your homepage content and images.</p>
                                </div>
                            </div>

                            <div className="space-y-8 max-w-3xl">
                                {/* Main Profile Picture Upload */}
                                <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#C7D2C8]/30">
                                    <h3 className="text-xl font-serif text-[#0F4A46] font-bold mb-4 flex items-center gap-2">
                                        <ImageIcon className="text-[#C8A96B]" size={20} />
                                        Main Profile Picture
                                    </h3>
                                    <p className="text-sm text-[#1F5C56]/70 mb-4">This profile image will be displayed on the website.</p>
                                    <div className="mt-2 flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-56 border-2 border-[#1F5C56]/20 border-dashed rounded-xl cursor-pointer bg-[#F5F3EE]/50 hover:bg-[#F5F3EE] transition-colors relative overflow-hidden group">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-10 h-10 text-[#C8A96B] mb-3 group-hover:scale-110 transition-transform" />
                                                <p className="mb-2 text-sm text-[#1F5C56]"><span className="font-semibold text-[#0F4A46]">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-[#1F5C56]/70">SVG, PNG, JPG (MAX. 1920x1080px)</p>
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                name="profileImage"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;

                                                    const formData = new FormData();
                                                    formData.append('profileImage', file);

                                                    try {
                                                        const res = await fetch('https://papa-s-portfolio-ds4q.vercel.app/api/profile/upload', {
                                                            method: 'POST',
                                                            body: formData,
                                                        });
                                                        if (res.ok) {
                                                            Swal.fire({
                                                                icon: 'success',
                                                                title: 'Success',
                                                                text: 'Profile image updated successfully!',
                                                                confirmButtonColor: '#0F4A46'
                                                            });
                                                        } else {
                                                            Swal.fire({
                                                                icon: 'error',
                                                                title: 'Failed',
                                                                text: 'Upload failed.',
                                                            });
                                                        }
                                                    } catch (err) {
                                                        Swal.fire({ icon: 'error', title: 'Error', text: 'An error occurred.' });
                                                    }
                                                }}
                                            />
                                        </label>
                                    </div>
                                </section>

                                {/* Card Details Fields */}
                                <section className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#C7D2C8]/30">
                                    <h3 className="text-xl font-serif text-[#0F4A46] font-bold mb-6 flex items-center gap-2">
                                        <FileText className="text-[#C8A96B]" size={20} />
                                        Card Details
                                    </h3>
                                    <p className="text-sm text-[#1F5C56]/70 mb-6">Set the product picture, title, and description for cards (Max 6).</p>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#0F4A46]">Product Picture</label>
                                            <div className="mt-2 flex items-center justify-center w-full">
                                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-[#1F5C56]/20 border-dashed rounded-xl cursor-pointer bg-[#F5F3EE]/50 hover:bg-[#F5F3EE] transition-colors relative overflow-hidden group">
                                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                        <Upload className="w-8 h-8 text-[#C8A96B] mb-3 group-hover:scale-110 transition-transform" />
                                                        <p className="mb-2 text-sm text-[#1F5C56]"><span className="font-semibold text-[#0F4A46]">{cardImage ? cardImage.name : "Click to upload"}</span> or drag and drop</p>
                                                        <p className="text-xs text-[#1F5C56]/70">SVG, PNG, JPG (800x600px)</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => setCardImage(e.target.files[0])}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#0F4A46]">Title</label>
                                            <input
                                                type="text"
                                                value={cardTitle}
                                                onChange={(e) => setCardTitle(e.target.value)}
                                                className="w-full bg-[#F5F3EE]/50 border border-[#C7D2C8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B] transition-all text-[#0F4A46]"
                                                placeholder="Enter product title..."
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-[#0F4A46]">Description</label>
                                            <textarea
                                                rows="4"
                                                value={cardDescription}
                                                onChange={(e) => setCardDescription(e.target.value)}
                                                className="w-full bg-[#F5F3EE]/50 border border-[#C7D2C8] rounded-xl px-4 py-3 focus:outline-none focus:border-[#C8A96B] focus:ring-1 focus:ring-[#C8A96B] transition-all text-[#0F4A46] resize-none"
                                                placeholder="Enter product description..."
                                            ></textarea>
                                        </div>
                                        <button
                                            type="button"
                                            disabled={isUploadingCard}
                                            onClick={async () => {
                                                if (!cardImage || !cardTitle || !cardDescription) {
                                                    return Swal.fire({ icon: 'warning', title: 'Missing Info', text: 'Please fill all fields.' });
                                                }
                                                setIsUploadingCard(true);
                                                const formData = new FormData();
                                                formData.append('productImage', cardImage);
                                                formData.append('title', cardTitle);
                                                formData.append('description', cardDescription);

                                                try {
                                                    const res = await fetch('https://papa-s-portfolio-ds4q.vercel.app/api/cards/upload', {
                                                        method: 'POST',
                                                        body: formData,
                                                    });
                                                    const data = await res.json();
                                                    if (res.ok) {
                                                        Swal.fire({ icon: 'success', title: 'Success', text: 'Card created!', confirmButtonColor: '#0F4A46' });
                                                        setCardTitle('');
                                                        setCardDescription('');
                                                        setCardImage(null);
                                                        fetchExistingCards(); // Refresh list
                                                    } else {
                                                        Swal.fire({ icon: 'error', title: 'Error', text: data.message || 'Failed to create card.' });
                                                    }
                                                } catch (err) {
                                                    Swal.fire({ icon: 'error', title: 'Error', text: 'An error occurred.' });
                                                } finally {
                                                    setIsUploadingCard(false);
                                                }
                                            }}
                                            className="w-full py-4 bg-[#0F4A46] text-[#F5F3EE] rounded-xl font-bold uppercase tracking-wider hover:bg-[#C8A96B] hover:text-[#0F4A46] transition-all shadow-md disabled:opacity-50"
                                        >
                                            {isUploadingCard ? 'Creating...' : 'Create Service Card'}
                                        </button>
                                    </div>
                                </section>

                                {/* Review Cards Section */}
                                <section id="manage-cards" className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#C7D2C8]/30">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-xl font-serif text-[#0F4A46] font-bold flex items-center gap-2">
                                            <LayoutDashboard className="text-[#C8A96B]" size={20} />
                                            Active Service Cards
                                        </h3>
                                        <div className="px-3 py-1 bg-[#F5F3EE] text-[#0F4A46] text-xs font-bold rounded-full border border-[#C7D2C8]">
                                            {existingCards.length} / 6 Cards
                                        </div>
                                    </div>
                                    <p className="text-sm text-[#1F5C56]/70 mb-8">View and manage your current service cards displayed on the homepage.</p>

                                    {loadingCards ? (
                                        <div className="flex justify-center py-10">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#0F4A46]"></div>
                                        </div>
                                    ) : existingCards.length === 0 ? (
                                        <div className="text-center py-10 bg-[#F5F3EE]/50 rounded-xl border border-dashed border-[#C7D2C8]">
                                            <p className="text-[#1F5C56]/50">No cards uploaded yet.</p>
                                        </div>
                                    ) : (
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            {existingCards.map((card) => (
                                                <div key={card._id} className="bg-[#F5F3EE] rounded-2xl overflow-hidden border border-[#C7D2C8]/30 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                                                    <div className="h-40 relative group">
                                                        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <button
                                                                onClick={() => handleDeleteCard(card._id)}
                                                                className="p-3 bg-red-600 text-white rounded-full hover:scale-110 transition-transform shadow-lg"
                                                                title="Delete Card"
                                                            >
                                                                <Trash2 size={24} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="p-4 flex-1">
                                                        <h4 className="font-serif font-bold text-[#0F4A46] text-lg mb-1">{card.title}</h4>
                                                        <p className="text-sm text-[#1F5C56]/70 line-clamp-2">{card.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Admin;
