import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import ToastMessage from "@/Components/ToastMessage.jsx";
import Toast from "@/Components/Toast.jsx";

const defaultFlash = {
    success: null,
    error: null,
    warning: null,
    info: null
}

export default function GuestLayout({ children, flash: { success, error, warning, info } = defaultFlash }) {

    return (
        <>
            <Toast>
                <ToastMessage type="error" message={error} hide={3} />
                <ToastMessage type="warning" message={warning} />
                <ToastMessage type="success" message={success} />
                <ToastMessage message={info } />
            </Toast>

            <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
                <div>
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </>
    );
}
