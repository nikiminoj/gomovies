export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="min-h-screen flex items-center justify-center py-12">
            {children}
        </div>
    );
}


