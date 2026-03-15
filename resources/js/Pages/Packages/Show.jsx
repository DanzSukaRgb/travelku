import { Link } from '@inertiajs/react';
import MainLayout from '../../Components/Layout/MainLayout';
import BookingForm from '../../Components/Sections/BookingForm';
import PackageShowcase from '../../Components/Sections/PackageShowcase';

export default function PackagesShow({ package: travelPackage, relatedPackages }) {
    return (
        <MainLayout title={travelPackage.title}>
            <section className="page-shell grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                    <span className="rounded-full bg-cyan-400/10 px-4 py-1.5 text-sm font-semibold text-cyan-200">{travelPackage.destination.name}</span>
                    <h1 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">{travelPackage.title}</h1>
                    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{travelPackage.description}</p>
                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                        <div className="glass-panel rounded-3xl p-5">
                            <p className="text-sm text-slate-400">Duration</p>
                            <p className="mt-1 text-2xl font-semibold text-white">{travelPackage.duration_days} days</p>
                        </div>
                        <div className="glass-panel rounded-3xl p-5">
                            <p className="text-sm text-slate-400">Group size</p>
                            <p className="mt-1 text-2xl font-semibold text-white">Up to {travelPackage.group_size}</p>
                        </div>
                        <div className="glass-panel rounded-3xl p-5">
                            <p className="text-sm text-slate-400">Price</p>
                            <p className="mt-1 text-2xl font-semibold text-white">IDR {Number(travelPackage.discount_price || travelPackage.price).toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                    <img src={travelPackage.thumbnail} alt={travelPackage.title} className="mt-8 h-[360px] w-full rounded-[2rem] object-cover" />
                    <div className="mt-10 grid gap-8 lg:grid-cols-2">
                        <div className="glass-panel rounded-[2rem] p-6">
                            <h2 className="text-xl font-semibold text-white">Highlights</h2>
                            <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                {(travelPackage.highlights || []).map((item) => <li key={item}>• {item}</li>)}
                            </ul>
                        </div>
                        <div className="glass-panel rounded-[2rem] p-6">
                            <h2 className="text-xl font-semibold text-white">Included</h2>
                            <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                {(travelPackage.inclusions || []).map((item) => <li key={item}>• {item}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 glass-panel rounded-[2rem] p-6">
                        <h2 className="text-xl font-semibold text-white">Itinerary flow</h2>
                        <div className="mt-6 space-y-5">
                            {(travelPackage.itinerary || []).map((item, index) => (
                                <div key={`${item.title}-${index}`} className="rounded-3xl border border-white/10 p-5">
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Day {index + 1}</p>
                                    <p className="mt-2 text-lg font-semibold text-white">{item.title}</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <Link href="/packages" className="text-sm font-semibold text-cyan-300">← Back to packages</Link>
                    </div>
                </div>
                <div className="space-y-6">
                    <BookingForm travelPackage={travelPackage} />
                    <div className="glass-panel rounded-[2rem] p-6">
                        <h3 className="text-xl font-semibold text-white">Gallery moodboard</h3>
                        <div className="mt-5 grid grid-cols-2 gap-3">
                            {(travelPackage.gallery || []).slice(0, 4).map((image) => (
                                <img key={image} src={image} alt="gallery" className="h-32 w-full rounded-2xl object-cover" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {relatedPackages.length ? (
                <PackageShowcase
                    packages={relatedPackages}
                    title="More routes around this destination"
                    description="Useful cross-sell options powered by the same package dataset."
                />
            ) : null}
        </MainLayout>
    );
}
