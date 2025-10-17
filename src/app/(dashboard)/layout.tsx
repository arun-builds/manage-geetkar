import Appbar from "@/components/Appbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
            <Appbar />
            <main className="flex-1 px-3 sm:px-4 md:px-6 lg:px-8 py-4">
                <div className="max-w-7xl mx-auto w-full">
                    {children}
                </div>
            </main>
            
            {/* Footer */}
            <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-8 md:mt-12">
                <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">
                        <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
                            © {new Date().getFullYear()} Manage Geetkar. All rights reserved.
                        </p>
                        <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
                            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}