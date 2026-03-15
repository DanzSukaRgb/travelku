import { Link } from '@inertiajs/react';
import SectionHeading from '../UI/SectionHeading';

export default function PackageShowcase({ packages, title = 'Signature packages', description, eyebrow = 'Best seller' }) {
    return (
        <section className="page-shell py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeading eyebrow={eyebrow} title={title} description={description} />
                <Link href="/packages" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
                    See all packages <span aria-hidden="true">→</span>
                </Link>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {packages.map((item) => (
                    <article key={item.id} className="glass-panel overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
                        <div className="relative overflow-hidden">
                            <img src={item.thumbnail} alt={item.title} className="h-72 w-full object-cover transition duration-500 hover:scale-105" />
                            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                                <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{item.destination.name}</span>
                                {item.featured_badge ? <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur">{item.featured_badge}</span> : null}
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                                <span>{item.duration_days} days</span>
                                <span>Up to {item.group_size} travelers</span>
                            </div>
                            <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
                            <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-300">{item.summary}</p>
                            <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/10 pt-5">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Starts from</p>
                                    <p className="mt-1 text-xl font-semibold text-white">IDR {Number(item.discount_price || item.price).toLocaleString('id-ID')}</p>
                                </div>
                                <Link href={`/packages/${item.slug}`} className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5">
                                    View details
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
