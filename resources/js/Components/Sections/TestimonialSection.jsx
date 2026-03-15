import SectionHeading from '../UI/SectionHeading';

export default function TestimonialSection({ testimonials }) {
    return (
        <section className="page-shell py-20">
            <SectionHeading
                eyebrow="Traveler feedback"
                title="A better interface should still feel good after checkout."
                description="The goal isn't just to impress on the homepage. It's to reduce hesitation, support trust, and keep the whole booking experience feeling clean."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {testimonials.map((item) => (
                    <article key={item.name} className="glass-panel rounded-[2rem] p-6">
                        <div className="mb-5 flex gap-1 text-cyan-300">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <span key={index}>★</span>
                            ))}
                        </div>
                        <p className="text-base leading-7 text-slate-200">“{item.quote}”</p>
                        <div className="mt-6 border-t border-white/10 pt-5">
                            <p className="font-semibold text-white">{item.name}</p>
                            <p className="text-sm text-slate-400">{item.role}</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
