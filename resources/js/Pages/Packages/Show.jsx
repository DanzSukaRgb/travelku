import { Link } from '@inertiajs/react';
import MainLayout from '../../Components/Layout/MainLayout';
import BookingForm from '../../Components/Sections/BookingForm';
import PackageShowcase from '../../Components/Sections/PackageShowcase';

export default function PackagesShow({ package: travelPackage, relatedPackages }) {
    return (
        <MainLayout title={travelPackage.title}>
            <section className="page-shell py-12 sm:py-16">
                <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded-full bg-cyan-400/10 px-4 py-1.5 font-semibold text-cyan-200">{travelPackage.destination.name}</span>
                            <span className="rounded-full border border-white/10 px-4 py-1.5 text-slate-300">{travelPackage.duration_days} days</span>
                            <span className="rounded-full border border-white/10 px-4 py-1.5 text-slate-300">Up to {travelPackage.group_size} travelers</span>
                        </div>

                        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">{travelPackage.title}</h1>
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

                        <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10">
                            <img src={travelPackage.thumbnail} alt={travelPackage.title} className="h-[380px] w-full object-cover" />
                        </div>

                        <div className="mt-8 grid gap-8 lg:grid-cols-2">
                            <div className="glass-panel rounded-[2rem] p-6">
                                <h2 className="text-xl font-semibold text-white">Trip highlights</h2>
                                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                    {(travelPackage.highlights || []).map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="mt-1 text-cyan-300">●</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="glass-panel rounded-[2rem] p-6">
                                <h2 className="text-xl font-semibold text-white">What's included</h2>
                                <ul className="mt-4 space-y-3 text-sm text-slate-300">
                                    {(travelPackage.inclusions || []).map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="mt-1 text-cyan-300">●</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 glass-panel rounded-[2rem] p-6 sm:p-7">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Itinerary flow</h2>
                                    <p className="mt-2 text-sm text-slate-400">Each day is laid out with clearer visual separation so the plan is easier to skim.</p>
                                </div>
                                <Link href="#booking-panel" className="text-sm font-semibold text-cyan-300">Jump to booking</Link>
                            </div>
                            <div className="mt-6 space-y-5">
                                {(travelPackage.itinerary || []).map((item, index) => (
                                    <div key={`${item.title}-${index}`} className="rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Day {index + 1}</p>
                                        <p className="mt-2 text-lg font-semibold text-white">{item.title}</p>
                                        <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {!!(travelPackage.gallery || []).length && (
                            <div className="mt-8 glass-panel rounded-[2rem] p-6">
                                <h3 className="text-xl font-semibold text-white">Gallery moodboard</h3>
                                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {(travelPackage.gallery || []).slice(0, 4).map((image) => (
                                        <img key={image} src={image} alt="gallery" className="h-32 w-full rounded-2xl object-cover" />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8 flex gap-4">
                            <Link href="/packages" className="text-sm font-semibold text-cyan-300">← Back to packages</Link>
                        </div>
                    </div>

                    <div id="booking-panel" className="space-y-6">
                        <BookingForm travelPackage={travelPackage} />
                    </div>
                </div>
            </section>
            {relatedPackages.length ? (
                <PackageShowcase
                    packages={relatedPackages}
                    eyebrow="You may also like"
                    title="More routes around this destination"
                    description="Useful cross-sell options with the same cleaner layout and quick scanning pattern."
                />
            ) : null}
        </MainLayout>
    );
}
