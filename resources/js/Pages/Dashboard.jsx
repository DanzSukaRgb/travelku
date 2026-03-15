import { useState } from 'react';
import AuthenticatedLayout from '../Layouts/AuthenticatedLayout';
import { bookingService } from '../Services/api';

const statusOptions = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function Dashboard({ auth, stats, bookings, packages, isAdmin }) {
    const [items, setItems] = useState(bookings);
    const [savingId, setSavingId] = useState(null);

    const updateStatus = async (id, status) => {
        setSavingId(id);
        try {
            await bookingService.updateStatus(id, status);
            setItems((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
        } finally {
            setSavingId(null);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="text-xl font-semibold leading-tight text-white">Dashboard</h2>}>
            <div className="space-y-8 py-10">
                <div className="grid gap-4 md:grid-cols-4">
                    {Object.entries(stats).map(([key, value]) => (
                        <div key={key} className="glass-panel rounded-[1.75rem] p-5">
                            <p className="text-sm capitalize text-slate-400">{key}</p>
                            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
                    <section className="glass-panel rounded-[2rem] p-6">
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-white">{isAdmin ? 'Recent bookings' : 'Your bookings'}</h3>
                                <p className="text-sm text-slate-400">Track booking requests without leaving the dashboard.</p>
                            </div>
                            {isAdmin ? <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">Admin-lite controls</span> : null}
                        </div>
                        <div className="space-y-4">
                            {items.map((booking) => (
                                <div key={booking.id} className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-4">
                                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                        <div>
                                            <p className="font-semibold text-white">{booking.customer_name} · {booking.booking_code}</p>
                                            <p className="text-sm text-slate-400">{booking.travel_package.title} — {booking.travel_package.destination.name}</p>
                                            <p className="text-sm text-slate-500">{booking.customer_email} · {booking.customer_phone}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-white">{booking.status}</span>
                                            {isAdmin ? (
                                                <select
                                                    value={booking.status}
                                                    disabled={savingId === booking.id}
                                                    onChange={(e) => updateStatus(booking.id, e.target.value)}
                                                    className="rounded-full border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white"
                                                >
                                                    {statusOptions.map((status) => <option key={status}>{status}</option>)}
                                                </select>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <section className="glass-panel rounded-[2rem] p-6">
                        <h3 className="text-xl font-semibold text-white">Package control snapshot</h3>
                        <p className="mt-2 text-sm text-slate-400">Latest packages seeded in the backend. API create/update routes are ready for admin extension.</p>
                        <div className="mt-5 space-y-4">
                            {packages.map((item) => (
                                <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-slate-950/40 p-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div>
                                            <p className="font-semibold text-white">{item.title}</p>
                                            <p className="text-sm text-slate-400">{item.destination.name} · {item.duration_days} days</p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.is_active ? 'bg-emerald-400/10 text-emerald-300' : 'bg-rose-400/10 text-rose-300'}`}>
                                            {item.is_active ? 'Active' : 'Draft'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
