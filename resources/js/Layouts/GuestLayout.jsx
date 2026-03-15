import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children, title, subtitle, sideTitle, sideDescription, sidePoints = [] }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-stone-50">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[24rem] bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.14),transparent_38%)]" />
            <div className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
            <div className="page-shell relative z-10 flex min-h-screen items-center py-10">
                <div className="grid w-full gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
                    <div className="hidden lg:block">
                        <Link href="/" className="inline-flex items-center gap-4">
                            <ApplicationLogo className="h-16 w-16" />
                            <div>
                                <p className="text-xl font-semibold text-stone-900">Travelku</p>
                                <p className="text-sm text-stone-500">Rencana liburan yang lebih enak dilihat dan lebih gampang dijalani.</p>
                            </div>
                        </Link>

                        <div className="mt-10 max-w-xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">Akun Travelku</p>
                            <h1 className="mt-4 text-4xl font-semibold leading-tight text-stone-900">{sideTitle || title}</h1>
                            <p className="mt-5 text-lg leading-8 text-stone-600">{sideDescription || subtitle}</p>
                        </div>

                        {sidePoints.length ? (
                            <div className="mt-8 grid gap-4">
                                {sidePoints.map((point) => (
                                    <div key={point.title} className="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm">
                                        <p className="text-base font-semibold text-stone-900">{point.title}</p>
                                        <p className="mt-2 text-sm leading-6 text-stone-600">{point.description}</p>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    <div className="mx-auto w-full max-w-xl">
                        <div className="mb-6 flex items-center justify-center lg:hidden">
                            <Link href="/" className="inline-flex items-center gap-3">
                                <ApplicationLogo className="h-14 w-14" />
                                <div>
                                    <p className="text-lg font-semibold text-stone-900">Travelku</p>
                                    <p className="text-sm text-stone-500">Akun pelanggan</p>
                                </div>
                            </Link>
                        </div>

                        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
                            <div className="mb-8">
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-700">{title}</p>
                                <h2 className="mt-3 text-3xl font-semibold text-stone-900">{subtitle}</h2>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
