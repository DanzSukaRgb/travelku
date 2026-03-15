import ContactSection from '../Components/Sections/ContactSection';
import DestinationGrid from '../Components/Sections/DestinationGrid';
import HeroSection from '../Components/Sections/HeroSection';
import PackageShowcase from '../Components/Sections/PackageShowcase';
import TestimonialSection from '../Components/Sections/TestimonialSection';
import MainLayout from '../Components/Layout/MainLayout';

export default function Home(props) {
    return (
        <MainLayout title="Home">
            <HeroSection hero={props.hero} />
            <DestinationGrid destinations={props.destinations} />
            <PackageShowcase
                packages={props.featuredPackages}
                eyebrow="Paket unggulan"
                title="Pilihan perjalanan yang enak dilihat dan gampang dipilih."
                description="Fokusnya bukan gaya yang terlalu futuristik, tapi halaman travel yang rapi, meyakinkan, dan cepat dipahami calon pelanggan."
            />
            <TestimonialSection testimonials={props.testimonials} />
            <ContactSection />
        </MainLayout>
    );
}
