import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout
            title="Daftar"
            subtitle="Bikin akun biar booking lebih gampang."
            sideTitle="Mulai pakai akun Travelku"
            sideDescription="Dengan akun, calon pelanggan bisa lanjut pilih paket, simpan proses booking, dan terasa lebih percaya karena alurnya rapi dari awal."
            sidePoints={[
                {
                    title: 'Proses lebih singkat',
                    description: 'Data dasar pelanggan tersimpan, jadi langkah berikutnya tidak terasa mengulang dari nol.',
                },
                {
                    title: 'Tampilan lebih relevan',
                    description: 'Register dibuat seperti bagian dari website travel, bukan halaman admin generik.',
                },
            ]}
        >
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Nama" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-2"
                        autoComplete="name"
                        placeholder="Nama lengkap"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

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
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-2"
                        autoComplete="new-password"
                        placeholder="Minimal 8 karakter"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Konfirmasi password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-2"
                        autoComplete="new-password"
                        placeholder="Ulangi password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-stone-500">
                        Sudah punya akun?{' '}
                        <Link href={route('login')} className="font-semibold text-stone-900 hover:text-amber-700">
                            Masuk di sini
                        </Link>
                    </p>

                    <PrimaryButton className="sm:min-w-[160px]" disabled={processing}>
                        {processing ? 'Mendaftar...' : 'Buat akun'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
