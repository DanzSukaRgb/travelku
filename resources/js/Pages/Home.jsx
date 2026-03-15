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
                eyebrow="Ready-to-book picks"
                title="Signature journeys that feel easier to choose."
                description="Clear pricing, stronger visual hierarchy, and fewer dead ends so visitors can move from interest to booking faster."
            />
            <TestimonialSection testimonials={props.testimonials} />
            <ContactSection />
        </MainLayout>
    );
}
