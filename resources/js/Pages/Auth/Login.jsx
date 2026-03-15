import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout
            title="Masuk"
            subtitle="Lanjutkan rencana perjalananmu."
            sideTitle="Masuk ke akun Travelku"
            sideDescription="Akses booking, lihat detail paket yang sudah dipilih, dan lanjutkan proses tanpa mulai dari awal lagi."
            sidePoints={[
                {
                    title: 'Lebih cepat lanjut booking',
                    description: 'User yang sudah punya akun bisa kembali ke paket yang diminati tanpa ribet.',
                },
                {
                    title: 'Tetap terasa satu brand',
                    description: 'Halaman login sekarang nyambung dengan tampilan public site, bukan template admin polos.',
                },
            ]}
        >
            <Head title="Log in" />

            {status && (
                <div className="mb-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-2"
                        autoComplete="username"
                        placeholder="nama@email.com"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="flex items-center justify-between gap-4">
                        <InputLabel htmlFor="password" value="Password" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-stone-500 transition hover:text-stone-900"
                            >
                                Lupa password?
                            </Link>
                        )}
                    </div>
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2"
                        autoComplete="current-password"
                        placeholder="Masukkan password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <label className="flex items-center gap-3">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="text-sm text-stone-600">Tetap masuk di perangkat ini</span>
                </label>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-stone-500">
                        Belum punya akun?{' '}
                        <Link href={route('register')} className="font-semibold text-stone-900 hover:text-amber-700">
                            Daftar di sini
                        </Link>
                    </p>

                    <PrimaryButton className="sm:min-w-[140px]" disabled={processing}>
                        {processing ? 'Masuk...' : 'Masuk'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
