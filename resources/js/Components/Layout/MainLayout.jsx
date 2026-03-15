import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Paket', href: '/packages' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Masuk', href: '/login' },
];

export default function MainLayout({ title, children }) {
    const { auth, ziggy } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    const currentPath = ziggy?.location ? new URL(ziggy.location).pathname : '/';

    const visibleNavItems = useMemo(
        () =>
            navItems
                .filter((item) => item.label !== 'Masuk' || !auth.user)
                .filter((item) => item.label !== 'Dashboard' || auth.user),
        [auth.user],
    );

    const isActive = (href) => currentPath === href || (href !== '/' && currentPath.startsWith(href));

    return (
        <>
            <Head title={title} />
            <div className="relative min-h-screen overflow-hidden bg-stone-50 text-stone-800">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[30rem] bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_35%)]" />
                <div className="pointer-events-none absolute right-0 top-1/4 h-[24rem] w-[24rem] rounded-full bg-sky-100 blur-3xl" />
                <div className="pointer-events-none absolute left-0 top-2/3 h-[18rem] w-[18rem] rounded-full bg-amber-100 blur-3xl" />

                <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-xl">
                    <div className="page-shell flex items-center justify-between py-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-lg font-black text-white">T</div>
                            <div>
                                <p className="text-lg font-semibold text-stone-900">Travelku</p>
                                <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Teman rencana jalan-jalan</p>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-2 md:flex">
                            {visibleNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`rounded-full px-4 py-2 text-sm transition ${
                                        isActive(item.href)
                                            ? 'bg-stone-900 text-white'
                                            : 'text-stone-600 hover:bg-white hover:text-stone-900'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href={auth.user ? '/packages' : '/register'}
                                className="ml-2 rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600"
                            >
                                {auth.user ? 'Pesan sekarang' : 'Buat akun'}
                            </Link>
                        </nav>

                        <button
                            type="button"
                            onClick={() => setMenuOpen((value) => !value)}
                            className="inline-flex items-center justify-center rounded-2xl border border-stone-200 bg-white p-3 text-stone-700 md:hidden"
                            aria-label="Toggle navigation"
                        >
                            <span className="space-y-1.5">
                                <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                                <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? 'opacity-0' : ''}`} />
                                <span className={`block h-0.5 w-5 bg-current transition ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                            </span>
                        </button>
                    </div>

                    {menuOpen ? (
                        <div className="page-shell pb-4 md:hidden">
                            <div className="soft-card p-3">
                                <div className="grid gap-2">
                                    {visibleNavItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`rounded-2xl px-4 py-3 text-sm ${
                                                isActive(item.href)
                                                    ? 'bg-stone-900 text-white'
                                                    : 'text-stone-700 hover:bg-white'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href={auth.user ? '/packages' : '/register'}
                                    onClick={() => setMenuOpen(false)}
                                    className="mt-3 block rounded-2xl bg-amber-500 px-4 py-3 text-center text-sm font-semibold text-white"
                                >
                                    {auth.user ? 'Pesan sekarang' : 'Buat akun'}
                                </Link>
                            </div>
                        </div>
                    ) : null}
                </header>

                <main className="relative z-10">{children}</main>

                <footer className="relative z-10 mt-8 border-t border-stone-200 py-12">
                    <div className="page-shell grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                        <div>
                            <p className="text-base font-semibold text-stone-900">Travelku</p>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-stone-600">
                                Bantu orang lebih cepat pindah dari lihat-lihat ke booking, tanpa tampilan yang terasa terlalu ribet atau terlalu mesin.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 md:justify-end">
                            <Link href="/packages" className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700 transition hover:bg-white">Lihat paket</Link>
                            {auth.user ? (
                                <Link href="/dashboard" className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700 transition hover:bg-white">Dashboard</Link>
                            ) : (
                                <Link href="/login" className="rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700 transition hover:bg-white">Masuk</Link>
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
