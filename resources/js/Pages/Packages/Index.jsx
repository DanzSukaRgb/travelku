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
                        eyebrow="Cari paket"
                        title="Pilih paket dengan cara yang lebih santai dan gampang dimengerti."
                        description="Filter tetap ada, tapi tampilannya dibuat lebih natural. Jadi terasa seperti situs travel yang matang, bukan dashboard yang disamarkan."
                    />
                    <div className="soft-card p-5 sm:p-6">
                        <label>
                            <span className="mb-2 block text-sm text-stone-700">Cari paket atau destinasi</span>
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                type="text"
                                placeholder="Coba Bali, honeymoon, diving..."
                                className="input-shell"
                            />
                        </label>
                        <p className="mt-3 text-sm text-stone-500">Menampilkan <span className="font-semibold text-stone-900">{filtered.length}</span> hasil.</p>
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                    <button onClick={() => setActiveDestination('all')} className={`rounded-full px-4 py-2.5 text-sm transition ${activeDestination === 'all' ? 'bg-stone-900 text-white' : 'border border-stone-300 bg-white text-stone-700 hover:bg-stone-100'}`}>
                        Semua destinasi
                    </button>
                    {destinations.map((destination) => (
                        <button
                            key={destination.id}
                            onClick={() => setActiveDestination(destination.slug)}
                            className={`rounded-full px-4 py-2.5 text-sm transition ${activeDestination === destination.slug ? 'bg-amber-500 text-white' : 'border border-stone-300 bg-white text-stone-700 hover:bg-stone-100'}`}
                        >
                            {destination.name}
                        </button>
                    ))}
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-3">
                    {filtered.length ? (
                        filtered.map((item) => (
                            <article key={item.id} className="glass-panel overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-md">
                                <div className="relative overflow-hidden">
                                    <img src={item.thumbnail} alt={item.title} className="h-64 w-full object-cover transition duration-500 hover:scale-105" />
                                    <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700">{item.destination.name}</span>
                                        <span className="rounded-full bg-stone-900/85 px-3 py-1 text-xs text-white">{item.duration_days} hari</span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center justify-between gap-3 text-sm text-stone-500">
                                        <span>hingga {item.group_size} orang</span>
                                        {item.featured_badge ? <span className="font-semibold text-amber-700">{item.featured_badge}</span> : null}
                                    </div>
                                    <h3 className="mt-3 text-2xl font-semibold text-stone-900">{item.title}</h3>
                                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-stone-600">{item.summary}</p>
                                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-stone-200 pt-5">
                                        <div>
                                            <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Harga</p>
                                            <p className="mt-1 text-xl font-semibold text-stone-900">IDR {Number(item.discount_price || item.price).toLocaleString('id-ID')}</p>
                                        </div>
                                        <Link href={`/packages/${item.slug}`} className="rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800">Lihat paket</Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="soft-card col-span-full p-8 text-center">
                            <p className="text-lg font-semibold text-stone-900">Belum ada paket yang cocok dengan filter itu.</p>
                            <p className="mt-2 text-sm text-stone-500">Coba ganti destinasi atau pakai kata kunci yang lebih umum.</p>
                            <button onClick={() => { setActiveDestination('all'); setSearch(''); }} className="mt-5 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white">
                                Reset filter
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </MainLayout>
    );
}
