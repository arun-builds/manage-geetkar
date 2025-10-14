import Appbar from "@/components/Appbar";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full">
        <div className="flex flex-col p-2 w-5/6 mx-auto">
            <Appbar />
            <main className="flex-1 overflow-y-auto">
                <div className="">
                    {children}
                </div>
            </main>
        </div>
        </div>
    );
}