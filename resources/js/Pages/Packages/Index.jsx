import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MainLayout from '../../Components/Layout/MainLayout';
import SectionHeading from '../../Components/UI/SectionHeading';

export default function PackagesIndex({ packages, destinations }) {
    const [activeDestination, setActiveDestination] = useState('all');

    const filtered = useMemo(() => {
        if (activeDestination === 'all') return packages;
        return packages.filter((item) => item.destination.slug === activeDestination);
    }, [packages, activeDestination]);

    return (
        <MainLayout title="Packages">
            <section className="page-shell py-16">
                <SectionHeading
                    eyebrow="Explore trips"
                    title="Browse packages that are ready to book today."
                    description="Use the filter to focus by destination, then open a package detail page for itinerary, highlights, and booking form."
                />
                <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => setActiveDestination('all')} className={`rounded-full px-4 py-2 text-sm ${activeDestination === 'all' ? 'bg-white text-slate-950' : 'border border-white/10 text-slate-300'}`}>
                        All destinations
                    </button>
                    {destinations.map((destination) => (
                        <button
                            key={destination.id}
                            onClick={() => setActiveDestination(destination.slug)}
                            className={`rounded-full px-4 py-2 text-sm ${activeDestination === destination.slug ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 text-slate-300'}`}
                        >
                            {destination.name}
                        </button>
                    ))}
                </div>
                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    {filtered.map((item) => (
                        <article key={item.id} className="glass-panel overflow-hidden rounded-[2rem]">
                            <img src={item.thumbnail} alt={item.title} className="h-64 w-full object-cover" />
                            <div className="p-6">
                                <div className="flex items-center justify-between gap-3">
                                    <span className="text-sm text-cyan-300">{item.destination.name}</span>
                                    <span className="text-sm text-slate-400">{item.duration_days} days</span>
                                </div>
                                <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-slate-300">{item.summary}</p>
                                <div className="mt-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Price</p>
                                        <p className="text-xl font-semibold text-white">IDR {Number(item.discount_price || item.price).toLocaleString('id-ID')}</p>
                                    </div>
                                    <Link href={`/packages/${item.slug}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">View trip</Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
