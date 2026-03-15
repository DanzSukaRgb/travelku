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
        <section id="contact" className="page-shell py-16 sm:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="soft-card p-6 sm:p-8">
                    <SectionHeading
                        eyebrow="Butuh bantuan pilih?"
                        title="Kalau mau rute yang lebih cocok, tinggal cerita singkat aja."
                        description="Form ini dibuat ringkas supaya orang nggak capek duluan. Cukup isi kebutuhan dasarnya, nanti tim lanjut bantuin."
                    />
                    <div className="mt-8 space-y-4 text-sm text-stone-600">
                        <p>• Cocok untuk honeymoon, family trip, outing kantor, atau itinerary custom.</p>
                        <p>• Bisa dipakai kalau masih bingung mau pilih paket yang mana.</p>
                        <p>• Pesan masuk tetap rapi ke sistem untuk follow-up tim.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8">
                    <div className="grid gap-4 sm:grid-cols-2">
                        {['name', 'email', 'phone'].map((field) => (
                            <label key={field} className={field === 'phone' ? 'sm:col-span-2' : ''}>
                                <span className="mb-2 block text-sm text-stone-700">{field.replace(/^./, (s) => s.toUpperCase())}</span>
                                <input
                                    value={form[field]}
                                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                                    type={field === 'email' ? 'email' : 'text'}
                                    className="input-shell"
                                    placeholder={field === 'name' ? 'Nama lengkap' : field === 'email' ? 'nama@email.com' : '+62...'}
                                    required={field !== 'phone'}
                                />
                            </label>
                        ))}
                        <label className="sm:col-span-2">
                            <span className="mb-2 block text-sm text-stone-700">Kebutuhan</span>
                            <select
                                value={form.interest}
                                onChange={(e) => setForm({ ...form, interest: e.target.value })}
                                className="input-shell"
                            >
                                <option>Tailor-made trip</option>
                                <option>Group tour</option>
                                <option>Corporate retreat</option>
                                <option>Honeymoon</option>
                            </select>
                        </label>
                        <label className="sm:col-span-2">
                            <span className="mb-2 block text-sm text-stone-700">Ceritain singkat</span>
                            <textarea
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                rows="5"
                                className="input-shell"
                                placeholder="Mau ke mana, berangkat kapan, dan gaya trip seperti apa."
                                required
                            />
                        </label>
                    </div>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <button disabled={loading} className="rounded-full bg-stone-900 px-6 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60">
                            {loading ? 'Mengirim...' : 'Kirim pertanyaan'}
                        </button>
                        <p className="text-sm text-stone-500">Nggak perlu isi panjang-panjang.</p>
                    </div>
                    {status.message ? (
                        <p className={`mt-4 text-sm ${status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>{status.message}</p>
                    ) : null}
                </form>
            </div>
        </section>
    );
}
