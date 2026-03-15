import { Link } from '@inertiajs/react';

export default function HeroSection({ hero }) {
    return (
        <section className="page-shell grid gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-20 lg:pt-14">
            <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    {hero.eyebrow}
                </div>
                <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight text-stone-900 sm:text-5xl lg:text-6xl">
                    Liburan terasa lebih enak kalau dari awal <span className="gradient-text">pilihannya sudah jelas</span>.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600 sm:text-xl">{hero.subtitle}</p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <Link href="/packages" className="rounded-full bg-stone-900 px-6 py-3.5 font-semibold text-white transition hover:bg-stone-800">
                        Lihat paket
                    </Link>
                    <a href="#contact" className="rounded-full border border-stone-300 px-6 py-3.5 font-semibold text-stone-700 transition hover:bg-white">
                        Tanya dulu
                    </a>
                </div>

                <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    {hero.stats.map((item) => (
                        <div key={item.label} className="soft-card bg-white p-5">
                            <p className="text-3xl font-semibold text-stone-900">{item.value}</p>
                            <p className="mt-1 text-sm text-stone-500">{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-panel overflow-hidden p-4 sm:p-5">
                <div className="space-y-4">
                    <div className="relative overflow-hidden rounded-[1.5rem]">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                            alt="Tropical destination"
                            className="h-[360px] w-full object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/70 to-transparent p-6">
                            <p className="text-sm font-medium text-white/80">Pilihan populer minggu ini</p>
                            <p className="mt-1 text-2xl font-semibold text-white">Bali – Nusa Penida Escape</p>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] bg-stone-50 p-5">
                            <p className="text-sm font-semibold text-amber-700">Lebih gampang dibanding</p>
                            <p className="mt-2 text-lg font-semibold text-stone-900">Harga, durasi, dan tujuan langsung kelihatan</p>
                            <p className="mt-3 text-sm leading-6 text-stone-600">User tidak perlu buka banyak halaman dulu cuma buat ngerti paket ini cocok atau tidak.</p>
                        </div>
                        <div className="rounded-[1.5rem] bg-stone-50 p-5">
                            <p className="text-sm font-semibold text-sky-700">Tetap berguna buat tim</p>
                            <p className="mt-2 text-lg font-semibold text-stone-900">Inquiry dan booking masih rapi masuk ke sistem</p>
                            <p className="mt-3 text-sm leading-6 text-stone-600">Jadi bukan cuma bagus dilihat, tapi tetap enak dipakai setelah ada lead masuk.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
