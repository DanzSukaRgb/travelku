import { Link } from '@inertiajs/react';

export default function HeroSection({ hero }) {
    return (
        <section className="page-shell grid gap-10 pb-20 pt-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20">
            <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-cyan-300">{hero.eyebrow}</p>
                <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">
                    Travel feels better when the experience is <span className="gradient-text">already premium</span> before takeoff.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{hero.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/packages" className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300">
                        View packages
                    </Link>
                    <a href="#contact" className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/5">
                        Talk to specialist
                    </a>
                </div>
                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {hero.stats.map((item) => (
                        <div key={item.label} className="glass-panel rounded-3xl p-5">
                            <p className="text-2xl font-semibold text-white">{item.value}</p>
                            <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-violet-500/20" />
                <div className="relative space-y-5">
                    <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                        alt="Tropical destination"
                        className="h-[320px] w-full rounded-[1.75rem] object-cover"
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
                            <p className="text-sm text-cyan-300">Top route</p>
                            <p className="mt-2 text-xl font-semibold text-white">Bali – Nusa Penida Escape</p>
                            <p className="mt-3 text-sm text-slate-400">Private boat, oceanfront stay, and sunset dining in one smooth itinerary.</p>
                        </div>
                        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/50 p-5">
                            <p className="text-sm text-violet-300">Fast response</p>
                            <p className="mt-2 text-xl font-semibold text-white">Booking ops inside dashboard</p>
                            <p className="mt-3 text-sm text-slate-400">Ops team can monitor bookings, update status, and manage package data safely.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
