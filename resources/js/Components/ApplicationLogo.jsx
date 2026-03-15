export default function ApplicationLogo({ className = '' }) {
    return (
        <div className={`flex items-center justify-center rounded-[1.75rem] bg-amber-500 text-white ${className}`}>
            <span className="text-3xl font-black tracking-tight">T</span>
        </div>
    );
}
