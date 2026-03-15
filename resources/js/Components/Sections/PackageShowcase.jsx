import { Link } from '@inertiajs/react';
import SectionHeading from '../UI/SectionHeading';

export default function PackageShowcase({ packages, title = 'Paket pilihan', description, eyebrow = 'Favorit tamu' }) {
    return (
        <section className="page-shell py-16 sm:py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeading eyebrow={eyebrow} title={title} description={description} />
                <Link href="/packages" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-700 transition hover:text-stone-900">
                    Lihat semua paket <span aria-hidden="true">→</span>
                </Link>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {packages.map((item) => (
                    <article key={item.id} className="glass-panel overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="relative overflow-hidden">
                            <img src={item.thumbnail} alt={item.title} className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
                            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700">{item.destination.name}</span>
                                {item.featured_badge ? <span className="rounded-full bg-amber-500 px-3 py-1 text-xs font-semibold text-white">{item.featured_badge}</span> : null}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between gap-3 text-sm text-stone-500">
                                <span>{item.duration_days} hari</span>
                                <span>hingga {item.group_size} orang</span>
                            </div>
                            <h3 className="mt-4 text-2xl font-semibold text-stone-900">{item.title}</h3>
                            <p className="mt-3 min-h-[72px] text-sm leading-6 text-stone-600">{item.summary}</p>
                            <div className="mt-5 flex items-end justify-between gap-4 border-t border-stone-200 pt-5">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Harga mulai</p>
                                    <p className="mt-1 text-xl font-semibold text-stone-900">IDR {Number(item.discount_price || item.price).toLocaleString('id-ID')}</p>
                                </div>
                                <Link href={`/packages/${item.slug}`} className="rounded-full bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800">
                                    Lihat detail
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
