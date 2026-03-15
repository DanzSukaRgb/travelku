import { Link } from '@inertiajs/react';
import SectionHeading from '../UI/SectionHeading';

export default function PackageShowcase({ packages, title = 'Signature packages', description }) {
    return (
        <section className="page-shell py-20">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <SectionHeading eyebrow="Best seller" title={title} description={description} />
                <Link href="/packages" className="text-sm font-semibold text-cyan-300">See all packages →</Link>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {packages.map((item) => (
                    <article key={item.id} className="glass-panel overflow-hidden rounded-[2rem]">
                        <img src={item.thumbnail} alt={item.title} className="h-64 w-full object-cover" />
                        <div className="p-6">
                            <div className="flex items-center justify-between gap-3">
                                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">{item.destination.name}</span>
                                {item.featured_badge ? <span className="text-xs font-semibold text-cyan-300">{item.featured_badge}</span> : null}
                            </div>
                            <h3 className="mt-4 text-2xl font-semibold text-white">{item.title}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-300">{item.summary}</p>
                            <div className="mt-5 flex items-center justify-between">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Starts from</p>
                                    <p className="mt-1 text-xl font-semibold text-white">IDR {Number(item.discount_price || item.price).toLocaleString('id-ID')}</p>
                                </div>
                                <Link href={`/packages/${item.slug}`} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">
                                    Details
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
