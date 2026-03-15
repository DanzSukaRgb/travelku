import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Login', href: '/login' },
];

export default function MainLayout({ title, children }) {
    const { auth, ziggy } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);

    const currentPath = ziggy?.location ? new URL(ziggy.location).pathname : '/';

    const visibleNavItems = useMemo(
        () =>
            navItems
                .filter((item) => item.label !== 'Login' || !auth.user)
                .filter((item) => item.label !== 'Dashboard' || auth.user),
        [auth.user],
    );

    const isActive = (href) => currentPath === href || (href !== '/' && currentPath.startsWith(href));

    return (
        <>
            <Head title={title} />
            <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_38%)]" />
                <div className="pointer-events-none absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-500/10 blur-3xl" />
                <div className="pointer-events-none absolute left-0 top-2/3 h-[24rem] w-[24rem] rounded-full bg-cyan-400/10 blur-3xl" />

                <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
                    <div className="page-shell flex items-center justify-between py-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 via-sky-400 to-violet-400 text-lg font-black text-slate-950 shadow-lg shadow-cyan-500/20">T</div>
                            <div>
                                <p className="text-lg font-semibold text-white">Travelku</p>
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Easy luxury travel</p>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-2 md:flex">
                            {visibleNavItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`rounded-full px-4 py-2 text-sm transition ${
                                        isActive(item.href)
                                            ? 'bg-white text-slate-950 shadow-lg shadow-white/10'
                                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href={auth.user ? '/packages' : '/register'}
                                className="ml-2 rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-300"
                            >
                                {auth.user ? 'Book now' : 'Create account'}
                            </Link>
                        </nav>

                        <button
                            type="button"
                            onClick={() => setMenuOpen((value) => !value)}
                            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 text-white md:hidden"
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
                            <div className="glass-panel rounded-3xl p-3">
                                <div className="grid gap-2">
                                    {visibleNavItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMenuOpen(false)}
                                            className={`rounded-2xl px-4 py-3 text-sm ${
                                                isActive(item.href)
                                                    ? 'bg-white text-slate-950'
                                                    : 'text-slate-200 hover:bg-white/5'
                                            }`}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href={auth.user ? '/packages' : '/register'}
                                    onClick={() => setMenuOpen(false)}
                                    className="mt-3 block rounded-2xl bg-cyan-400 px-4 py-3 text-center text-sm font-semibold text-slate-950"
                                >
                                    {auth.user ? 'Book now' : 'Create account'}
                                </Link>
                            </div>
                        </div>
                    ) : null}
                </header>

                <main className="relative z-10">{children}</main>

                <footer className="relative z-10 border-t border-white/10 py-12">
                    <div className="page-shell grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
                        <div>
                            <p className="text-base font-semibold text-white">Travelku</p>
                            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                                Travel planning that looks polished, feels clear, and helps people move from browsing to booking without friction.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3 md:justify-end">
                            <Link href="/packages" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">Explore packages</Link>
                            {auth.user ? (
                                <Link href="/dashboard" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">Dashboard</Link>
                            ) : (
                                <Link href="/login" className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white">Login</Link>
                            )}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
