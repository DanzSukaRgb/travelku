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
        <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-7 lg:sticky lg:top-24">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h3 className="text-2xl font-semibold text-stone-900">Pesan paket ini</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">Isi tanggal dan data dasar dulu. Nanti tim akan konfirmasi ketersediaannya.</p>
                </div>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">Ringkas</span>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4">
                <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="text-stone-500">Harga mulai</span>
                    <span className="font-semibold text-stone-900">IDR {Number(travelPackage.discount_price || travelPackage.price).toLocaleString('id-ID')}</span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                    <span className="text-stone-500">Perkiraan total</span>
                    <span className="font-semibold text-amber-700">IDR {estimatedTotal.toLocaleString('id-ID')}</span>
                </div>
            </div>

            <div className="mt-6 grid gap-4">
                {[
                    ['customer_name', 'Nama lengkap', 'text', 'Nama lengkap'],
                    ['customer_email', 'Email', 'email', 'nama@email.com'],
                    ['customer_phone', 'WhatsApp / telepon', 'text', '+62...'],
                    ['travel_date', 'Tanggal berangkat yang diinginkan', 'date', ''],
                ].map(([key, label, type, placeholder]) => (
                    <label key={key}>
                        <span className="mb-2 block text-sm text-stone-700">{label}</span>
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
                    <span className="mb-2 block text-sm text-stone-700">Jumlah traveler</span>
                    <input
                        type="number"
                        min="1"
                        max={travelPackage.group_size || 12}
                        value={form.travelers}
                        onChange={(e) => setForm({ ...form, travelers: Number(e.target.value) })}
                        className="input-shell"
                        required
                    />
                    <p className="mt-2 text-xs text-stone-500">Maksimal rekomendasi untuk paket ini: {travelPackage.group_size} orang.</p>
                </label>
                <label>
                    <span className="mb-2 block text-sm text-stone-700">Catatan tambahan</span>
                    <textarea
                        value={form.special_request}
                        onChange={(e) => setForm({ ...form, special_request: e.target.value })}
                        rows="4"
                        className="input-shell"
                        placeholder="Misalnya: kamar twin, kebutuhan makanan, atau request khusus lain."
                    />
                </label>
            </div>
            <button disabled={loading} className="mt-6 w-full rounded-full bg-stone-900 px-5 py-3.5 font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60">
                {loading ? 'Memproses...' : 'Ajukan booking'}
            </button>
            <p className="mt-3 text-center text-xs text-stone-500">Pengajuan masuk dulu, lalu tim akan bantu konfirmasi jadwal dan detailnya.</p>
            {feedback.message ? (
                <p className={`mt-4 text-sm ${feedback.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>{feedback.message}</p>
            ) : null}
        </form>
    );
}
