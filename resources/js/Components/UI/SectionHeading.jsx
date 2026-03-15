export default function SectionHeading({ eyebrow, title, description, align = 'left', kicker }) {
    return (
        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
            {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-cyan-300">{eyebrow}</p> : null}
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
            {description ? <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">{description}</p> : null}
            {kicker ? <p className="mt-5 text-sm font-medium text-slate-400">{kicker}</p> : null}
        </div>
    );
}
