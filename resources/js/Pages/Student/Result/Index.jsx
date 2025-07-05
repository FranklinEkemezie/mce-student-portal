import StudentLayout from '@/Layouts/StudentLayout.jsx'
import { Head } from '@inertiajs/react'
import SecondaryLink from "@/Components/SecondaryLink.jsx";
import useResult from "@/hooks/useResult.js";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Index({ registeredCoursesInfo }) {


    const semesterNames = {
        harmattan: 'Harmattan Semester',
        rain: 'Rain Semester'
    }


    return (
        <StudentLayout
            header="Results"
        >
            <Head title="Results"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 text-gray-">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h2 className="text-xl font-bold">📜 Results</h2>
                            </div>

                            <div className="mt-6 overflow-y-auto">

                                <table className="table-auto w-full">
                                    <thead>
                                    <tr className="font-bold bg-gray-100 ">
                                        <th className="text-start px-2 py-4">Session</th>
                                        <th className="text-start px-2 py-4">Semester</th>
                                        <th className="text-start px-2 py-4">Level</th>
                                        <th className="px-2 py-4">Results Published</th>
                                        <th className="text-start px-2 py-4">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        registeredCoursesInfo.map(({semester, session, published, courses, level}) => (
                                            <tr
                                                key={`${session}-${semester}-${level}`}
                                                className="border-b hover:bg-gray-50"
                                            >
                                                <td className="p-2">{session}</td>
                                                <td className="p-2">{semesterNames[semester]}</td>
                                                <td className="p-2">{level} LEVEL</td>
                                                <td className="p-2 text-center">
                                                    {published}
                                                    <span className="opacity-75">/{courses.length}</span>
                                                </td>
                                                <td className="p-2">
                                                    <SecondaryLink href={route(
                                                        'results.show', [session, semester]
                                                    )}>
                                                        View
                                                    </SecondaryLink>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </StudentLayout>
    )
}
