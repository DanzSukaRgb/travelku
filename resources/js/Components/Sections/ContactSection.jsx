import { useState } from 'react';
import { leadService } from '../../Services/api';
import SectionHeading from '../UI/SectionHeading';

const initialState = {
    name: '',
    email: '',
    phone: '',
    interest: 'Tailor-made trip',
    message: '',
};

export default function ContactSection() {
    const [form, setForm] = useState(initialState);
    const [status, setStatus] = useState({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: '' });

        try {
            const { data } = await leadService.create(form);
            setStatus({ type: 'success', message: data.message });
            setForm(initialState);
        } catch (error) {
            setStatus({ type: 'error', message: error.response?.data?.message || 'Unable to submit your request right now.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="contact" className="page-shell py-20">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <SectionHeading
                        eyebrow="Concierge contact"
                        title="Need a custom route, team retreat, or honeymoon plan?"
                        description="Leave a short brief and let our ops team turn it into a bookable proposal with the same clean experience."
                    />
                    <div className="mt-8 space-y-4 text-sm text-slate-300">
                        <p>• Average response time under 15 minutes during business hours.</p>
                        <p>• Great for private groups, company trips, and multi-city itineraries.</p>
                        <p>• Message stored securely in the lead dashboard for follow-up.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-6 sm:p-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {['name', 'email', 'phone'].map((field) => (
                            <label key={field} className={field === 'phone' ? 'sm:col-span-2' : ''}>
                                <span className="mb-2 block text-sm text-slate-300">{field.replace(/^./, (s) => s.toUpperCase())}</span>
                                <input
                                    value={form[field]}
                                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                                    type={field === 'email' ? 'email' : 'text'}
                                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                    required={field !== 'phone'}
                                />
                            </label>
                        ))}
                        <label className="sm:col-span-2">
                            <span className="mb-2 block text-sm text-slate-300">Interest</span>
                            <select
                                value={form.interest}
                                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                            >
                                <option>Tailor-made trip</option>
                                <option>Group tour</option>
                                <option>Corporate retreat</option>
                                <option>Honeymoon</option>
                            </select>
                        </label>
                        <label className="sm:col-span-2">
                            <span className="mb-2 block text-sm text-slate-300">Message</span>
                            <textarea
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                rows="5"
                                className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                required
                            />
                        </label>
                    </div>
                    <button disabled={loading} className="mt-6 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 disabled:opacity-60">
                        {loading ? 'Sending...' : 'Send inquiry'}
                    </button>
                    {status.message ? (
                        <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>{status.message}</p>
                    ) : null}
                </form>
            </div>
        </section>
    );
}
