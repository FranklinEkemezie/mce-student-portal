import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function AdminLayout({ header, children }) {

    return (
        <AuthenticatedLayout
            navLinks={[
                {title: 'Dashboard', name: 'admin.dashboard'},
                {title: 'Students', name: 'students'},
                {title: 'Courses', name: 'admin.courses'},
            ]}
            header={header}
            dropdownLinks={[
                {title: 'Profile', name: 'admin.dashboard'},
                {title: 'Notification', name: 'admin.dashboard'}
            ]}
            logoutRouteName='logout'
        >
            {children}
        </AuthenticatedLayout>
    )
}
