import SectionHeading from '../UI/SectionHeading';

export default function DestinationGrid({ destinations }) {
    return (
        <section className="page-shell py-20">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SectionHeading
                    eyebrow="Featured destinations"
                    title="Start with places that already sell the feeling."
                    description="Destinations are presented with cleaner scanning: image first, promise second, and pricing visible without making visitors work for it."
                />
                <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-300">
                    <p className="font-semibold text-white">Why this helps UX</p>
                    <p className="mt-1 leading-6 text-slate-400">Stronger visual grouping makes the list feel less like cards and more like clear choices.</p>
                </div>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-4">
                {destinations.map((destination) => (
                    <article key={destination.id} className="glass-panel group overflow-hidden rounded-[2rem] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30">
                        <div className="relative overflow-hidden">
                            <img src={destination.hero_image} alt={destination.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                                <span className="rounded-full bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{destination.country}</span>
                                <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-100 backdrop-blur">★ {destination.rating}</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                            <p className="mt-3 text-sm leading-6 text-slate-300">{destination.tagline}</p>
                            <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Typical budget</p>
                                    <p className="mt-1 text-base font-semibold text-white">From IDR {Number(destination.base_price).toLocaleString('id-ID')}</p>
                                </div>
                                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">Curated route</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
