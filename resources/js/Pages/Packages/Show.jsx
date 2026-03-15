import { Link } from '@inertiajs/react';
import MainLayout from '../../Components/Layout/MainLayout';
import BookingForm from '../../Components/Sections/BookingForm';
import PackageShowcase from '../../Components/Sections/PackageShowcase';

export default function PackagesShow({ package: travelPackage, relatedPackages }) {
    return (
        <MainLayout title={travelPackage.title}>
            <section className="page-shell py-12 sm:py-16">
                <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
                    <div>
                        <div className="flex flex-wrap items-center gap-3 text-sm">
                            <span className="rounded-full bg-amber-100 px-4 py-1.5 font-semibold text-amber-700">{travelPackage.destination.name}</span>
                            <span className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-stone-600">{travelPackage.duration_days} hari</span>
                            <span className="rounded-full border border-stone-300 bg-white px-4 py-1.5 text-stone-600">hingga {travelPackage.group_size} orang</span>
                        </div>

                        <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">{travelPackage.title}</h1>
                        <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-600">{travelPackage.description}</p>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            <div className="soft-card bg-white p-5">
                                <p className="text-sm text-stone-500">Durasi</p>
                                <p className="mt-1 text-2xl font-semibold text-stone-900">{travelPackage.duration_days} hari</p>
                            </div>
                            <div className="soft-card bg-white p-5">
                                <p className="text-sm text-stone-500">Jumlah grup</p>
                                <p className="mt-1 text-2xl font-semibold text-stone-900">hingga {travelPackage.group_size}</p>
                            </div>
                            <div className="soft-card bg-white p-5">
                                <p className="text-sm text-stone-500">Harga</p>
                                <p className="mt-1 text-2xl font-semibold text-stone-900">IDR {Number(travelPackage.discount_price || travelPackage.price).toLocaleString('id-ID')}</p>
                            </div>
                        </div>

                        <div className="mt-8 overflow-hidden rounded-[2rem] border border-stone-200 bg-white">
                            <img src={travelPackage.thumbnail} alt={travelPackage.title} className="h-[380px] w-full object-cover" />
                        </div>

                        <div className="mt-8 grid gap-8 lg:grid-cols-2">
                            <div className="glass-panel p-6">
                                <h2 className="text-xl font-semibold text-stone-900">Yang menarik dari trip ini</h2>
                                <ul className="mt-4 space-y-3 text-sm text-stone-600">
                                    {(travelPackage.highlights || []).map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="mt-1 text-amber-600">●</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="glass-panel p-6">
                                <h2 className="text-xl font-semibold text-stone-900">Yang sudah termasuk</h2>
                                <ul className="mt-4 space-y-3 text-sm text-stone-600">
                                    {(travelPackage.inclusions || []).map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <span className="mt-1 text-amber-600">●</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 glass-panel p-6 sm:p-7">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-stone-900">Rencana perjalanan</h2>
                                    <p className="mt-2 text-sm text-stone-500">Urutan harinya dibuat lebih gampang dibaca supaya orang cepat kebayang trip-nya seperti apa.</p>
                                </div>
                                <Link href="#booking-panel" className="text-sm font-semibold text-stone-700">Langsung ke form booking</Link>
                            </div>
                            <div className="mt-6 space-y-5">
                                {(travelPackage.itinerary || []).map((item, index) => (
                                    <div key={`${item.title}-${index}`} className="rounded-3xl border border-stone-200 bg-stone-50 p-5">
                                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">Hari {index + 1}</p>
                                        <p className="mt-2 text-lg font-semibold text-stone-900">{item.title}</p>
                                        <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {!!(travelPackage.gallery || []).length && (
                            <div className="mt-8 glass-panel p-6">
                                <h3 className="text-xl font-semibold text-stone-900">Galeri singkat</h3>
                                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                                    {(travelPackage.gallery || []).slice(0, 4).map((image) => (
                                        <img key={image} src={image} alt="gallery" className="h-32 w-full rounded-2xl object-cover" />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-8 flex gap-4">
                            <Link href="/packages" className="text-sm font-semibold text-stone-700">← Kembali ke daftar paket</Link>
                        </div>
                    </div>

                    <div id="booking-panel" className="space-y-6">
                        <BookingForm travelPackage={travelPackage} />
                    </div>
                </div>
            </section>
            {relatedPackages.length ? (
                <PackageShowcase
                    packages={relatedPackages}
                    eyebrow="Paket serupa"
                    title="Kalau mau bandingin, ini pilihan lain yang masih satu vibe"
                    description="Tetap dibuat ringan supaya user bisa membandingkan tanpa merasa halaman ini terlalu penuh atau terlalu teknis."
                />
            ) : null}
        </MainLayout>
    );
}
