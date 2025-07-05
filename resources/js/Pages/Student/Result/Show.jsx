import StudentLayout from '@/Layouts/StudentLayout.jsx'
import { Head } from '@inertiajs/react'
import SecondaryLink from "@/Components/SecondaryLink.jsx";
import useResult from "@/hooks/useResult.js";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Index({ results }) {

    const {
        processResult, getGrade, getRemark, getTotalScore
    } = useResult();

    const semesterNames = {
        harmattan: 'Harmattan Semester',
        rain: 'Rain Semester'
    }

    const { TGP, GNU, CGPA } = processResult(results);

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
                                <div>
                                    <PrimaryButton>🖨 Print</PrimaryButton>
                                </div>
                            </div>

                            <div className="mt-6 overflow-y-auto">

                                <table className="table-auto w-full">
                                    <thead>
                                    <tr className="font-bold bg-gray-100 ">
                                        <th className="text-start px-2 py-4">S/N</th>
                                        <th className="text-start px-2 py-4">
                                            Course
                                            <span className="opacity-60 text-xs ms-2">(Unit)</span>
                                        </th>
                                        <th className="text-start px-2 py-4">Test</th>
                                        <th className="text-start px-2 py-4">Lab</th>
                                        <th className="text-start px-2 py-4">Exam</th>
                                        <th className="text-start px-2 py-4">Total</th>
                                        <th className="px-2 py-4">Grade</th>
                                        <th className="text-start px-2 py-4">Remark</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        results.map(([course, result], index) => {

                                            const {id, unit: courseUnit, code: courseCode} = course;

                                            return (
                                                <tr key={id} className={
                                                    `border-b hover:bg-gray-50
                                                    ${getGrade(result) === 'F' && 'text-red-500'}`
                                                }>
                                                    <td className="p-2">{index + 1}</td>
                                                    <td className="p-2">
                                                        {courseCode}
                                                        <span
                                                            className="opacity-60 text-sm ms-2"> ({courseUnit})</span>
                                                    </td>
                                                    <td className="p-2">{result['TEST'] || '-'}</td>
                                                    <td className="p-2">{result['LAB'] || '-'}</td>
                                                    <td className="p-2">{result['EXAM'] || '-'}</td>
                                                    <td className="p-2">{getTotalScore(result)}</td>
                                                    <td className="p-2 text-center font-semibold">{getGrade(result)}</td>
                                                    <td className="p-2">{getRemark(result)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                    <tfoot className="border-b-2">
                                    <tr>
                                        <td colSpan={6}></td>
                                        <td className="text-end px-2 py-1 pt-4">TGP</td>
                                        <td className="font-semibold px-2 py-1 pt-4">{TGP}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6}></td>
                                        <td className="text-end px-2 py-1">GNU</td>
                                        <td className="font-semibold px-2 py-1">{GNU}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6}></td>
                                        <td className="text-end px-2 py-1">Semester CGPA</td>
                                        <td className="font-semibold px-2 py-1">{CGPA}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan={6}></td>
                                        <td className="text-end px-2 py-1 pb-4">CGPA</td>
                                        <td className="font-semibold px-2 py-1 pb-4">{CGPA}</td>
                                    </tr>
                                    </tfoot>
                                </table>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </StudentLayout>
    )
}
