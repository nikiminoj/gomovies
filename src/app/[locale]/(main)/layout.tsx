import { Footer } from '@/components/footer';
import { Header } from '@/components/header';

export default async function MainLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    return (
        <div className="min-h-screen">
            <Header />
            {children}
            <Footer />
        </div >

    );
}