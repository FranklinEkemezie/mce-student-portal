import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function StudentLayout({ header, children }) {

    return (
        <AuthenticatedLayout
            navLinks={[
                {title: 'Dashboard', name: 'dashboard'},
                {title: 'Results', name: 'results.index'},
            ]}
            header={header}
            dropdownLinks={[
                {title: 'Profile', name: 'profile.edit'},
                {title: 'Notification', name: 'dashboard'}
            ]}
            logoutRouteName='logout'
        >
            {children}
        </AuthenticatedLayout>
    )
}
