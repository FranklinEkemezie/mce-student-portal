import {Head, Link, usePage} from '@inertiajs/react';
import AdminLayout from "@/Layouts/AdminLayout.jsx";
import PrimaryLink from "@/Components/PrimaryLink.jsx";
import SecondaryLink from "@/Components/SecondaryLink.jsx";


export default function Dashboard({ admin, students }) {

    const {
        data: students_data,
        from, to, links,
        prev_page_url, next_page_url
    } = students;

    return (
        <AdminLayout
            admin={admin}
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 text-gray-900">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold">Students ({from} - {to})</h2>
                                <div className="space-x-2">
                                    <PrimaryLink href={prev_page_url} disabled={! prev_page_url}>Previous</PrimaryLink>
                                    <SecondaryLink href={next_page_url} disabled={! next_page_url}>Next</SecondaryLink>
                                </div>
                            </div>

                            <div className="mt-6 overflow-y-auto">
                                <table className="table-auto w-full">
                                    <thead>
                                    <tr className="font-bold bg-gray-100 ">
                                        <th className="text-start px-2 py-4">S/N</th>
                                        <th className="text-start px-2 py-4">First Name</th>
                                        <th className="text-start px-2 py-4">Last Name</th>
                                        <th className="text-start px-2 py-4">Reg. No.</th>
                                        <th className="text-start px-2 py-4">
                                            Email
                                            <span className="text-sm text-gray-800 font-light inline-block ms-1">(Click to send mail)</span>
                                        </th>
                                        <th className="text-start px-2 py-4">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        students_data.map((student, index) => {
                                            const { first_name, last_name, reg_no, user: { email } } = student;

                                            return (
                                                <tr key={reg_no} className="border-b hover:bg-gray-50">
                                                    <td className="p-2">{from + index}</td>
                                                    <td className="p-2">{first_name}</td>
                                                    <td className="p-2">{last_name}</td>
                                                    <td className="p-2">{reg_no}</td>
                                                    <td className="p-2 hover:underline hover:underline-offset-4">
                                                        <a
                                                            href={`mailto:${email}`}
                                                            title={`Send email to ${email}`}
                                                        >{email}</a>
                                                    </td>
                                                    <td className="p-2">
                                                        <SecondaryLink href={`/students/${student.id}`}>
                                                            View Profile
                                                        </SecondaryLink>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <div>
                                    <PrimaryLink
                                        href={prev_page_url}
                                        disabled={! prev_page_url}
                                    >Previous</PrimaryLink>
                                </div>

                                <div className="hidden md:block">
                                    {
                                        links.map(({ url, label, active }, i) => (
                                            <span
                                                key={label}
                                                className={`p-2 px-4 border border-gray-300/90 cursor-pointer
                                                hover:bg-gray-100 transition duration-300
                                                ${active && 'bg-gray-300/90 font-medium hover:bg-gray-400'}
                                                ${i === 0 && 'rounded-s'}
                                                ${i === links.length - 1 ? 'rounded-e border-e' : 'border-e-0'}
                                                `}>
                                                {
                                                    url ? (
                                                        <Link href={url} dangerouslySetInnerHTML={ { __html: label } } />
                                                    ) : (
                                                        <span dangerouslySetInnerHTML={ { __html: label } }></span>
                                                    )
                                                }
                                            </span>
                                        ))
                                    }
                                </div>

                                <div>
                                    <PrimaryLink
                                        href={next_page_url}
                                        disabled={! next_page_url}
                                    >Next</PrimaryLink>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
