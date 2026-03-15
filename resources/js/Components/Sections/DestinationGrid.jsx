import SectionHeading from '../UI/SectionHeading';

export default function DestinationGrid({ destinations }) {
    return (
        <section className="page-shell py-16 sm:py-20">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <SectionHeading
                    eyebrow="Destinasi pilihan"
                    title="Mulai dari tempat yang memang bikin orang pengin berangkat."
                    description="Penyajiannya dibuat lebih ringan dan hangat, jadi terasa seperti brand travel yang niat, bukan template teknologi yang dipaksa jadi travel site."
                />
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-4">
                {destinations.map((destination) => (
                    <article key={destination.id} className="glass-panel overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-md">
                        <div className="relative overflow-hidden">
                            <img src={destination.hero_image} alt={destination.name} className="h-64 w-full object-cover transition duration-500 hover:scale-105" />
                            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
                                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-stone-700">{destination.country}</span>
                                <span className="rounded-full bg-stone-900/85 px-3 py-1 text-xs font-semibold text-white">★ {destination.rating}</span>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-stone-900">{destination.name}</h3>
                            <p className="mt-3 text-sm leading-6 text-stone-600">{destination.tagline}</p>
                            <div className="mt-5 flex items-center justify-between gap-3 border-t border-stone-200 pt-4">
                                <div>
                                    <p className="text-xs uppercase tracking-[0.3em] text-stone-400">Mulai dari</p>
                                    <p className="mt-1 text-base font-semibold text-stone-900">IDR {Number(destination.base_price).toLocaleString('id-ID')}</p>
                                </div>
                                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs text-stone-600">Pilihan populer</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
