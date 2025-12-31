
import { Link } from "react-router-dom";
import { Mail, Linkedin, Instagram, Github, Heart, Twitter, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
    return (
        <footer className="w-full bg-black text-gray-300 border-t border-white/10 mt-auto relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose-900/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/5 pb-12">

                    {/* Brand Section (4 cols) */}
                    <div className="md:col-span-4 space-y-6">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent inline-block">
                            CodeMate
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-sm">
                            The ultimate AI-powered platform for developers to find their perfect coding match.
                            Build faster, collaborate better, and ship products that matter.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                                <a key={idx} href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-500/20 hover:text-rose-400 transition-all duration-300 border border-white/5 hover:border-rose-500/30 group">
                                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Column 1 (2 cols) */}
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="font-semibold text-white tracking-wide">Platform</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="#" className="hover:text-rose-400 transition-colors">Find a Partner</Link></li>
                            <li><Link to="#" className="hover:text-rose-400 transition-colors">Browse Projects</Link></li>
                            <li><Link to="#" className="hover:text-rose-400 transition-colors">AI Matchmaker</Link></li>
                            <li><Link to="#" className="hover:text-rose-400 transition-colors">Success Stories</Link></li>
                        </ul>
                    </div>

                    {/* Links Column 2 (2 cols) */}
                    <div className="md:col-span-2 space-y-4">
                        <h3 className="font-semibold text-white tracking-wide">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="#" className="hover:text-rose-400 transition-colors">About Us</Link></li>
                            <li><Link to="#" className="hover:text-rose-400 transition-colors">Careers</Link></li>
                            <li><Link to="#" className="hover:text-rose-400 transition-colors">Blog</Link></li>
                            <li><Link to="#" className="hover:text-rose-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter (4 cols) */}
                    <div className="md:col-span-4 space-y-4">
                        <h3 className="font-semibold text-white tracking-wide">Stay Updated</h3>
                        <p className="text-sm text-gray-400">
                            Join our newsletter for the latest AI trends and feature updates.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-white/5 border-white/10 focus:border-rose-500/50 text-white placeholder:text-gray-600 rounded-lg"
                            />
                            <Button className="bg-rose-600 hover:bg-rose-700 text-white rounded-lg px-4">
                                <Send className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        © 2025 CodeMate Inc. Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500 animate-pulse" /> in India.
                    </div>
                    <div className="flex gap-6">
                        <Link to="#" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
                        <Link to="#" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
                        <Link to="#" className="hover:text-gray-400 transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
