import { Link } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import MainLayout from '../../Components/Layout/MainLayout';
import SectionHeading from '../../Components/UI/SectionHeading';

export default function PackagesIndex({ packages, destinations }) {
    const [activeDestination, setActiveDestination] = useState('all');
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
        const keyword = search.trim().toLowerCase();

        return packages.filter((item) => {
            const matchesDestination = activeDestination === 'all' || item.destination.slug === activeDestination;
            const matchesSearch =
                !keyword ||
                item.title.toLowerCase().includes(keyword) ||
                item.summary.toLowerCase().includes(keyword) ||
                item.destination.name.toLowerCase().includes(keyword);

            return matchesDestination && matchesSearch;
        });
    }, [packages, activeDestination, search]);

    return (
        <MainLayout title="Packages">
            <section className="page-shell py-16 sm:py-20">
                <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
                    <SectionHeading
                        eyebrow="Explore trips"
                        title="Browse packages with a cleaner path from search to booking."
                        description="Destination filter, keyword search, and stronger card summaries make the list easier to scan instead of forcing people to open everything first."
                    />
                    <div className="soft-card p-5 sm:p-6">
                        <label>
                            <span className="mb-2 block text-sm text-slate-300">Search package or destination</span>
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                type="text"
                                placeholder="Try Bali, honeymoon, diving..."
                                className="input-shell"
                            />
                        </label>
                        <p className="mt-3 text-sm text-slate-400">Showing <span className="font-semibold text-white">{filtered.length}</span> result{filtered.length === 1 ? '' : 's'}.</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => setActiveDestination('all')} className={`rounded-full px-4 py-2.5 text-sm transition ${activeDestination === 'all' ? 'bg-white text-slate-950' : 'border border-white/10 text-slate-300 hover:bg-white/5'}`}>
                        All destinations
                    </button>
                    {destinations.map((destination) => (
                        <button
                            key={destination.id}
                            onClick={() => setActiveDestination(destination.slug)}
                            className={`rounded-full px-4 py-2.5 text-sm transition ${activeDestination === destination.slug ? 'bg-cyan-400 text-slate-950' : 'border border-white/10 text-slate-300 hover:bg-white/5'}`}
                        >
                            {destination.name}
                        </button>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    {filtered.length ? (
                        filtered.map((item) => (
                            <article key={item.id} className="glass-panel overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
                                <div className="relative overflow-hidden">
                                    <img src={item.thumbnail} alt={item.title} className="h-64 w-full object-cover transition duration-500 hover:scale-105" />
                                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                                        <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{item.destination.name}</span>
                                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100 backdrop-blur">{item.duration_days} days</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                                        <span>Up to {item.group_size} travelers</span>
                                        {item.featured_badge ? <span className="font-semibold text-cyan-300">{item.featured_badge}</span> : null}
                                    </div>
                                    <h3 className="mt-3 text-2xl font-semibold text-white">{item.title}</h3>
                                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-300">{item.summary}</p>
                                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Price</p>
                                            <p className="mt-1 text-xl font-semibold text-white">IDR {Number(item.discount_price || item.price).toLocaleString('id-ID')}</p>
                                        </div>
                                        <Link href={`/packages/${item.slug}`} className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">View trip</Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="soft-card col-span-full p-8 text-center">
                            <p className="text-lg font-semibold text-white">No package matched that filter.</p>
                            <p className="mt-2 text-sm text-slate-400">Try another destination or a simpler keyword.</p>
                            <button onClick={() => { setActiveDestination('all'); setSearch(''); }} className="mt-5 rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950">
                                Reset filters
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
