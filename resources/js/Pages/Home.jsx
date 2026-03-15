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
                title="Signature journeys with fewer compromises"
                description="All packages are stored in the same backend your ops team can manage later from the dashboard."
            />
            <TestimonialSection testimonials={props.testimonials} />
            <ContactSection />
        </MainLayout>
    );
}
