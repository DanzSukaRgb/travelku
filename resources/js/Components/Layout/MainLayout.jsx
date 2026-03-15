import { Head, Link, usePage } from '@inertiajs/react';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Packages', href: '/packages' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Login', href: '/login' },
];

export default function MainLayout({ title, children }) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title={title} />
            <div className="relative min-h-screen overflow-hidden">
                <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                    <div className="page-shell flex items-center justify-between py-4">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-lg font-bold text-slate-950">T</div>
                            <div>
                                <p className="text-lg font-semibold text-white">Travelku</p>
                                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Modern travel booking</p>
                            </div>
                        </Link>
                        <nav className="hidden items-center gap-3 md:flex">
                            {navItems
                                .filter((item) => item.label !== 'Login' || !auth.user)
                                .filter((item) => item.label !== 'Dashboard' || auth.user)
                                .map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            <Link
                                href={auth.user ? '/packages' : '/register'}
                                className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]"
                            >
                                {auth.user ? 'Book now' : 'Create account'}
                            </Link>
                        </nav>
                    </div>
                </header>
                <main>{children}</main>
                <footer className="border-t border-white/10 py-10">
                    <div className="page-shell flex flex-col gap-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="text-base font-semibold text-white">Travelku</p>
                            <p>Polished full-stack travel booking built with Laravel 12 + React.</p>
                        </div>
                        <div className="flex gap-6">
                            <Link href="/packages">Explore packages</Link>
                            <Link href="/dashboard">Dashboard</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
