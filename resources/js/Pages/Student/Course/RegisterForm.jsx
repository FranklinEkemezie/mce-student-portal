import Layout from '@/Layouts/StudentLayout'
import {Head, useForm} from '@inertiajs/react'
import DangerLink from "@/Components/DangerLink.jsx";
import InputLabel from "@/Components/InputLabel.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import React from "react";

export default function RegisterForm({ }) {

    const academicSessions = [
        2022, 2023, 2024, 2025, 2026, 2027, 2028
    ];

    const { data, setData, get, processing } = useForm({
        session: `${academicSessions[0]}-${academicSessions[0] + 1}`,
        level: 100,
        semester: 'harmattan'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        get(route('courses.register'));
    }

    return (
        <Layout
            header="Register Courses"
        >
            <Head title="Course Registration"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 text-gray-">
                            <div className="flex items-center justify-between border-b pb-4">
                                <h2 className="text-xl font-bold">📝 Register Courses</h2>
                                <div>
                                    <DangerLink href={route('courses.index')}>Cancel</DangerLink>
                                </div>
                            </div>

                            <div className="mt-6">

                                <form onSubmit={handleSubmit}>

                                    <div className="space-y-6">

                                        {/* Academic Session */}
                                        <div>
                                            <InputLabel htmlFor="session" value="Academic Session"/>
                                            <select
                                                id="session"
                                                className="w-full border-gray-300 rounded"
                                                onChange={(e) => setData('session', e.target.value)}
                                            >
                                                {
                                                    academicSessions.map((session) => (
                                                        <option
                                                            key={`${session}`}
                                                            value={`${session}-${session + 1}`}
                                                        >
                                                            {session}-{session + 1}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        {/* Level */}
                                        <div>
                                            <InputLabel htmlFor="level" value="Level"/>
                                            <select
                                                id="level"
                                                className="w-full border-gray-300 rounded"
                                                onChange={(e) => setData('level', parseInt(e.target.value))}
                                            >
                                                {
                                                    (new Array(6)).fill(100).map((value, index) => (
                                                        <option
                                                            key={`${index}`}
                                                            value={(index + 1) * value}
                                                        >
                                                            {(index + 1) * value} Level
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                        {/* Semester */}
                                        <div>
                                            <InputLabel htmlFor="semester" value="Semester" />
                                            <select
                                                id="semester"
                                                className="w-full border-gray-300 rounded"
                                                onChange={(e) => setData('semester', e.target.value)}
                                            >
                                                <option value="harmattan">Harmattan Semester</option>
                                                <option value="rain">Rain Semester</option>
                                            </select>
                                        </div>

                                        <div>
                                            <PrimaryButton disabled={processing} type="submit">
                                                Continue
                                            </PrimaryButton>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </Layout>
    )
}
