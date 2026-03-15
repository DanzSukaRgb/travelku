import { useState } from 'react';
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
        <form onSubmit={handleSubmit} className="glass-panel rounded-[2rem] p-6">
            <h3 className="text-2xl font-semibold text-white">Book this package</h3>
            <p className="mt-2 text-sm text-slate-400">Secure your preferred date and let Travelku confirm availability.</p>
            <div className="mt-6 grid gap-4">
                {[
                    ['customer_name', 'Full name', 'text'],
                    ['customer_email', 'Email address', 'email'],
                    ['customer_phone', 'WhatsApp / phone', 'text'],
                    ['travel_date', 'Preferred departure date', 'date'],
                ].map(([key, label, type]) => (
                    <label key={key}>
                        <span className="mb-2 block text-sm text-slate-300">{label}</span>
                        <input
                            type={type}
                            value={form[key]}
                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                            required
                        />
                    </label>
                ))}
                <label>
                    <span className="mb-2 block text-sm text-slate-300">Travelers</span>
                    <input
                        type="number"
                        min="1"
                        max="12"
                        value={form.travelers}
                        onChange={(e) => setForm({ ...form, travelers: Number(e.target.value) })}
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                        required
                    />
                </label>
                <label>
                    <span className="mb-2 block text-sm text-slate-300">Special request</span>
                    <textarea
                        value={form.special_request}
                        onChange={(e) => setForm({ ...form, special_request: e.target.value })}
                        rows="4"
                        className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                    />
                </label>
            </div>
            <button disabled={loading} className="mt-6 w-full rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 disabled:opacity-60">
                {loading ? 'Processing...' : 'Confirm booking request'}
            </button>
            {feedback.message ? (
                <p className={`mt-4 text-sm ${feedback.type === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>{feedback.message}</p>
            ) : null}
        </form>
    );
}
