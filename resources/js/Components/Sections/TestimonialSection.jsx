import SectionHeading from '../UI/SectionHeading';

export default function TestimonialSection({ testimonials }) {
    return (
        <section className="page-shell py-20">
            <SectionHeading
                eyebrow="What travelers said"
                title="The polished feel should survive beyond the landing page."
                description="Real-world feedback that this isn't just pretty marketing — the booking and follow-up process also land well."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {testimonials.map((item) => (
                    <article key={item.name} className="glass-panel rounded-[2rem] p-6">
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
