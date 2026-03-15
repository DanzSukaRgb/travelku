import { Link } from '@inertiajs/react';

export default function HeroSection({ hero }) {
    return (
        <section className="page-shell section-subtle-grid grid gap-10 overflow-hidden pb-20 pt-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:rounded-[2.5rem] lg:pb-24 lg:pt-16">
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-200">
                    <span className="h-2 w-2 rounded-full bg-cyan-300" />
                    {hero.eyebrow}
                </div>
                <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
                    Plan trips that feel <span className="gradient-text">premium and obvious to book</span> from the first screen.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">{hero.subtitle}</p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/packages" className="rounded-full bg-cyan-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300">
                        Explore packages
                    </Link>
                    <a href="#contact" className="rounded-full border border-white/15 px-6 py-3.5 font-semibold text-white transition hover:bg-white/5">
                        Talk to a specialist
                    </a>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {hero.stats.map((item) => (
                        <div key={item.label} className="glass-panel rounded-3xl p-5">
                            <p className="text-3xl font-semibold text-white">{item.value}</p>
                            <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/15 via-transparent to-violet-500/20" />
                <div className="relative space-y-5">
                    <div className="relative overflow-hidden rounded-[1.75rem]">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                            alt="Tropical destination"
                            className="h-[360px] w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-6">
                            <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">Popular this week</p>
                            <p className="mt-2 text-2xl font-semibold text-white">Bali – Nusa Penida Escape</p>
                            <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">Private boat, coastal villa stay, and curated sunset dining packed into one smooth itinerary.</p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
                            <p className="text-sm text-cyan-300">Booking clarity</p>
                            <p className="mt-2 text-xl font-semibold text-white">See price, duration, and route instantly</p>
                            <p className="mt-3 text-sm leading-6 text-slate-400">No hunting around. Users can compare options faster and reach detail pages with less friction.</p>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
                            <p className="text-sm text-violet-300">Operationally ready</p>
                            <p className="mt-2 text-xl font-semibold text-white">Lead and booking flows stay actionable</p>
                            <p className="mt-3 text-sm leading-6 text-slate-400">The polished frontend still feeds a backend your ops team can actually use for follow-up.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
