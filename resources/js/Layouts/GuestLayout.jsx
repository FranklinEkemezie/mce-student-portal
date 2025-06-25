import ApplicationLogo from '@/Components/ApplicationLogo';
import {Link, usePage} from '@inertiajs/react';
import ToastMessage from "@/Components/ToastMessage.jsx";
import Toast from "@/Components/Toast.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import PrimaryLink from "@/Components/PrimaryLink.jsx";
import SecondaryLink from "@/Components/SecondaryLink.jsx";

const defaultFlash = {
    success: null,
    error: null,
    warning: null,
    info: null
}

export default function GuestLayout({ children }) {

    const { props: { flash } } = usePage();

    return (
        <>
            <Toast>
                <ToastMessage type="error" message={flash?.error} hide={3} />
                <ToastMessage type="warning" message={flash?.warning} />
                <ToastMessage type="success" message={flash?.success} />
                <ToastMessage message={flash?.info} />
            </Toast>

            <div className="flex min-h-screen flex-col items-center bg-gray-100 sm:pt-0 p-4">
                <div className="mt-4 self-start w-full space-x-2 px-2 flex items-center justify-between">

                    <div className="mt-4">
                        <Link href="/">
                            <ApplicationLogo className="h-16 w-16 fill-current text-gray-500"/>
                        </Link>
                    </div>

                    <div className="flex flex-col space-x-0 space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
                        {! route().current('login') && (
                            <PrimaryLink href={route('login')}>Log In As Student</PrimaryLink>
                        )}
                        {! route().current('admin.login') && (
                            <SecondaryLink href={route('admin.login')}>Log In As Admin</SecondaryLink>
                        )}
                    </div>
                </div>

                <div
                    className="mt-20 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg rounded">
                    {children}
                </div>
            </div>
        </>
    );
}
