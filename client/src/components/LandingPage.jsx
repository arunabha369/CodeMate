import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Code2, Handshake, TrendingUp, Users } from "lucide-react";

const LandingPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-background to-rose-50/50 dark:to-rose-950/20">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    Why Choose CodeMate?
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-10 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
                    The ultimate platform to find your code soulmate. Match, collaborate, and build something amazing together.
                </p>
                <div className="flex gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    <Link to="/login">
                        <Button size="lg" className="rounded-full px-8 text-lg shadow-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                            Get Started Now
                        </Button>
                    </Link>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all hover:-translate-y-1">
                        <CardHeader>
                            <Code2 className="h-12 w-12 text-primary mb-2" />
                            <CardTitle className="text-xl">Match with Developers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Find developers who share your tech stack and interests.</p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all hover:-translate-y-1">
                        <CardHeader>
                            <Handshake className="h-12 w-12 text-secondary mb-2" />
                            <CardTitle className="text-xl">Project Collaboration</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Start or join exciting projects that match your skills.</p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all hover:-translate-y-1">
                        <CardHeader>
                            <TrendingUp className="h-12 w-12 text-blue-500 mb-2" />
                            <CardTitle className="text-xl">Skill Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Learn from peers and enhance your coding abilities.</p>
                        </CardContent>
                    </Card>

                    <Card className="border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-all hover:-translate-y-1">
                        <CardHeader>
                            <Users className="h-12 w-12 text-green-500 mb-2" />
                            <CardTitle className="text-xl">Network Building</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Build meaningful connections in the tech community.</p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-4 bg-muted/30 text-center">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to find your perfect dev match?</h2>
                    <p className="text-xl text-muted-foreground mb-10">
                        Join thousands of developers who have already found their ideal collaborators.
                    </p>
                    <Link to="/login">
                        <Button size="lg" className="rounded-full px-10 py-6 text-xl shadow-xl bg-primary hover:bg-primary/90">
                            Create Account
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
