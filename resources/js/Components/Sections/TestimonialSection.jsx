import SectionHeading from '../UI/SectionHeading';

export default function TestimonialSection({ testimonials }) {
    return (
        <section className="page-shell py-16 sm:py-20">
            <SectionHeading
                eyebrow="Cerita pelanggan"
                title="Yang dicari bukan cuma tampilan bagus, tapi rasa yakin waktu mau booking."
                description="Bagian ini dibuat lebih sederhana supaya terasa seperti testimoni brand travel sungguhan, bukan elemen dekorasi yang terlalu dibuat-buat."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {testimonials.map((item) => (
                    <article key={item.name} className="glass-panel p-6">
                        <div className="mb-5 flex gap-1 text-amber-500">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <span key={index}>★</span>
                            ))}
                        </div>
                        <p className="text-base leading-7 text-stone-700">“{item.quote}”</p>
                        <div className="mt-6 border-t border-stone-200 pt-5">
                            <p className="font-semibold text-stone-900">{item.name}</p>
                            <p className="text-sm text-stone-500">{item.role}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
