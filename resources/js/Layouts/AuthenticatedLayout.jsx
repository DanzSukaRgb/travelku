import Dropdown from '@/Components/Dropdown';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <nav className="border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="page-shell flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-lg font-semibold text-white">Travelku</Link>
                        <div className="hidden items-center gap-3 md:flex">
                            <Link href="/dashboard" className="text-sm text-slate-300 hover:text-white">Dashboard</Link>
                            <Link href="/packages" className="text-sm text-slate-300 hover:text-white">Packages</Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
                                    {user.name}
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                <Dropdown.Link href={route('logout')} method="post" as="button">Log out</Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                    <button className="md:hidden" onClick={() => setShowMenu((value) => !value)}>☰</button>
                </div>
                {showMenu ? (
                    <div className="page-shell space-y-3 border-t border-white/10 py-4 md:hidden">
                        <Link href="/dashboard" className="block text-sm text-slate-300">Dashboard</Link>
                        <Link href="/packages" className="block text-sm text-slate-300">Packages</Link>
                        <Link href={route('profile.edit')} className="block text-sm text-slate-300">Profile</Link>
                    </div>
                ) : null}
            </nav>
            {header ? <header className="page-shell py-8">{header}</header> : null}
            <main className="page-shell pb-12">{children}</main>
        </div>
    );
}
