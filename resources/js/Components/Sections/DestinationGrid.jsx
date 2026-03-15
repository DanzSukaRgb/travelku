import SectionHeading from '../UI/SectionHeading';

export default function DestinationGrid({ destinations }) {
    return (
        <section className="page-shell py-20">
            <SectionHeading
                eyebrow="Featured destinations"
                title="Start with places that already feel like a story."
                description="Handpicked routes with elevated stays, better pacing, and clearer value from the first glance."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-4">
                {destinations.map((destination) => (
                    <article key={destination.id} className="glass-panel group overflow-hidden rounded-[2rem]">
                        <img src={destination.hero_image} alt={destination.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" />
                        <div className="p-6">
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                                    <p className="text-sm text-slate-400">{destination.country}</p>
                                </div>
                                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">★ {destination.rating}</span>
                            </div>
                            <p className="mt-4 text-sm leading-6 text-slate-300">{destination.tagline}</p>
                            <p className="mt-4 text-sm font-semibold text-white">From IDR {Number(destination.base_price).toLocaleString('id-ID')}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
