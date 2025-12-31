import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Code2, Github, Cpu, Rocket, Mail, MapPin } from "lucide-react";
import { Input } from "./ui/input";
import heroRobot from "../assets/hero-robot-v2.png";

const LandingPage = () => {
    const scrollToFeatures = () => {
        document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-screen bg-black text-white selection:bg-rose-500/30 overflow-x-hidden">
            {/* Background Glows */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-rose-600/20 blur-[120px] rounded-full pointer-events-none opacity-30" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none opacity-20" />

            {/* Hero Section */}
            <section id="home" className="relative pt-32 pb-20 px-4 container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12 min-h-[calc(100vh-100px)]">
                <div className="flex-1 space-y-8 z-10 animate-in fade-in slide-in-from-bottom-4 duration-700 text-center lg:text-left">
                    <div className="inline-block px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-sm font-medium hover:bg-rose-500/20 transition-colors cursor-default">
                        CodeMate AI 1.0 is live! 🚀
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
                        Your Personalized <br />
                        <span className="bg-gradient-to-r from-rose-500 to-purple-600 bg-clip-text text-transparent">Developer Match</span> <br />
                        Powered by AI
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                        Discover skilled, passionate, and purely compatible coding partners curated by AI — based on your stack, goals, and coding style.
                    </p>

                    <p className="text-lg text-gray-500 max-w-2xl mx-auto lg:mx-0">
                        Track your matches, collaborate on repos, and ship products without the friction. Made for hackers and creators.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                        <Link to="/login">
                            <Button size="lg" className="rounded-full px-10 h-14 text-lg shadow-xl shadow-rose-500/20 bg-gradient-to-r from-rose-600 to-rose-500 text-white hover:opacity-90 transition-all hover:scale-105">
                                Get Started
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={scrollToFeatures}
                            className="rounded-full px-10 h-14 text-lg border-white/20 hover:bg-white/10 hover:text-white transition-all backdrop-blur-sm"
                        >
                            Learn More
                        </Button>
                    </div>
                </div>

                {/* Hero Visual - 3D Illustration */}
                <div className="flex-1 relative w-full max-w-md lg:max-w-xl animate-in fade-in zoom-in-95 duration-1000 delay-300 flex justify-center">
                    <div className="relative aspect-square w-full max-w-[500px]">
                        {/* Glowing Background */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/30 to-purple-600/30 blur-[100px] rounded-full animate-pulse" />

                        <img
                            src={heroRobot}
                            alt="AI Developer Assistant"
                            className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 mix-blend-screen"
                        />

                        {/* Floating Cards (Decorative) */}
                        <div className="absolute top-10 -right-10 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl animate-bounce delay-700 hidden lg:block">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 bg-green-500 rounded-full" />
                                <span className="text-xs font-mono text-green-400">Match Found!</span>
                            </div>
                        </div>
                        <div className="absolute bottom-20 -left-10 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl animate-bounce delay-1000 hidden lg:block">
                            <div className="flex items-center gap-2">
                                <Code2 className="h-4 w-4 text-rose-500" />
                                <span className="text-xs font-mono text-rose-400">React + Node.js</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section id="features" className="py-32 px-4 container mx-auto relative z-10">
                <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Why Choose <span className="text-rose-500">CodeMate?</span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Experience the power of AI-driven developer networking — rooted in compatibility, skills, and open-source culture.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {[
                        {
                            icon: Code2,
                            title: "Personalized Dev Matches",
                            desc: "AI-generated connection recommendations tailored to your tech stack, experience level, and project interests — all 100% relevant.",
                            color: "text-rose-400"
                        },
                        {
                            icon: Github,
                            title: "Repo-Based Skill Analysis",
                            desc: "Just link your GitHub. Our AI instantly analyzes your commits, languages, and coding patterns to build your true profile.",
                            color: "text-purple-400"
                        },
                        {
                            icon: Cpu,
                            title: "AI Project Guidance",
                            desc: "Built on modern engineering principles — including architecture suggestions, repo structure ideas, and stack optimization.",
                            color: "text-blue-400"
                        },
                        {
                            icon: Rocket,
                            title: "Smart Idea Generator",
                            desc: "Tell us what skills you have — we’ll craft exciting, viable hackathon ideas using AI. No block, just code.",
                            color: "text-green-400"
                        }
                    ].map((feature, idx) => (
                        <Card key={idx} className="border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:border-rose-500/30 group p-2">
                            <CardHeader className="space-y-4">
                                <div className={`h-14 w-14 rounded-2xl bg-black/40 flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300 border border-white/5`}>
                                    <feature.icon className="h-8 w-8" />
                                </div>
                                <CardTitle className="text-2xl text-white">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-400 text-lg leading-relaxed">{feature.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Get in Touch Section */}
            <section id="contact" className="py-24 px-4 container mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-700">
                        <h2 className="text-3xl md:text-5xl font-bold">
                            Get in <span className="text-rose-500">Touch</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                            Have questions, feedback, or just want to verify our AI matchmaking? Drop us a line—we're here to help you ship faster.
                        </p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="h-10 w-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <span className="text-lg">support@codemate.ai</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <span className="text-lg">San Francisco, CA</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">First Name</label>
                                    <Input placeholder="John" className="bg-black/50 border-white/10 focus:border-rose-500/50 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Last Name</label>
                                    <Input placeholder="Doe" className="bg-black/50 border-white/10 focus:border-rose-500/50 text-white" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email</label>
                                <Input type="email" placeholder="john@example.com" className="bg-black/50 border-white/10 focus:border-rose-500/50 text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Message</label>
                                <textarea
                                    className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                                    placeholder="Tell us about your project..."
                                />
                            </div>
                            <Button className="w-full h-12 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-lg rounded-xl font-semibold shadow-lg shadow-rose-500/20">
                                Send Message
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/10 to-transparent pointer-events-none" />
                <div className="container mx-auto max-w-4xl relative z-10 text-center rounded-3xl p-12 border border-white/10 bg-black/40 backdrop-blur-xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Ready to elevate your coding journey?</h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Join thousands of developers who have already found their ideal collaborators and launched successful projects.
                    </p>
                    <Link to="/login">
                        <Button size="lg" className="rounded-full px-12 h-16 text-xl shadow-2xl shadow-rose-500/30 bg-rose-600 text-white hover:bg-rose-500 transition-all hover:scale-105">
                            Create Free Account
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
