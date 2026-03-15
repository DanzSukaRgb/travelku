import { useMemo, useState } from 'react';
import { bookingService } from '../../Services/api';

export default function BookingForm({ travelPackage }) {
    const [form, setForm] = useState({
        travel_package_id: travelPackage.id,
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        travel_date: '',
        travelers: 2,
        special_request: '',
    });
    const [feedback, setFeedback] = useState({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    const estimatedTotal = useMemo(() => Number(travelPackage.discount_price || travelPackage.price) * Number(form.travelers || 1), [travelPackage, form.travelers]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setFeedback({ type: null, message: '' });

        try {
            const { data } = await bookingService.create(form);
            setFeedback({
                type: 'success',
                message: `${data.message} Booking code: ${data.data.booking_code}`,
            });
            setForm({ ...form, customer_name: '', customer_email: '', customer_phone: '', travel_date: '', travelers: 2, special_request: '' });
        } catch (error) {
            setFeedback({ type: 'error', message: error.response?.data?.message || 'Booking failed. Please review your input.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-6 sm:p-7 lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-semibold text-white">Book this package</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">Pick a date, share the traveler details, and let Travelku confirm availability.</p>
                </div>
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">Fast request</span>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4">
                <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-400">Starting from</span>
                    <span className="font-semibold text-white">IDR {Number(travelPackage.discount_price || travelPackage.price).toLocaleString('id-ID')}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                    <span className="text-slate-400">Estimated total</span>
                    <span className="font-semibold text-cyan-300">IDR {estimatedTotal.toLocaleString('id-ID')}</span>
                </div>
            </div>

            <div className="mt-6 grid gap-4">
                {[
                    ['customer_name', 'Full name', 'text', 'Your full name'],
                    ['customer_email', 'Email address', 'email', 'you@example.com'],
                    ['customer_phone', 'WhatsApp / phone', 'text', '+62...'],
                    ['travel_date', 'Preferred departure date', 'date', ''],
                ].map(([key, label, type, placeholder]) => (
                    <label key={key}>
                        <span className="mb-2 block text-sm text-slate-300">{label}</span>
                        <input
                            type={type}
                            value={form[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            className="input-shell"
                            placeholder={placeholder}
                            required
                        />
                    </label>
                ))}
                <label>
                    <span className="mb-2 block text-sm text-slate-300">Travelers</span>
                    <input
                        type="number"
                        min="1"
                        max={travelPackage.group_size || 12}
                        value={form.travelers}
                        onChange={(e) => setForm({ ...form, travelers: Number(e.target.value) })}
                        className="input-shell"
                        required
                    />
                    <p className="mt-2 text-xs text-slate-500">Recommended max group size: {travelPackage.group_size} travelers.</p>
                </label>
                <label>
                    <span className="mb-2 block text-sm text-slate-300">Special request</span>
                    <textarea
                        value={form.special_request}
                        onChange={(e) => setForm({ ...form, special_request: e.target.value })}
                        rows="4"
                        className="input-shell"
                        placeholder="Optional: dietary needs, room preferences, celebration notes, etc."
                    />
                </label>
            </div>
            <button disabled={loading} className="mt-6 w-full rounded-full bg-cyan-400 px-5 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 disabled:opacity-60">
                {loading ? 'Processing...' : 'Confirm booking request'}
            </button>
            <p className="mt-3 text-center text-xs text-slate-500">You submit the request here. Final confirmation still depends on live availability.</p>
            {feedback.message ? (
                <p className={`mt-4 text-sm ${feedback.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>{feedback.message}</p>
            ) : null}
        </form>
    );
}
