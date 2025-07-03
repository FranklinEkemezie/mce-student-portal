import Layout from '@/Layouts/AdminLayout'
import {Head, useForm} from '@inertiajs/react'
import React from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import CreateCourseForm from "@/Partials/CreateCourseForm.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

export default function Create({ departments, courses }) {

    const initialCourseFormData = {
        title: '', unit: '', code: '',
        level: '', semester: '',
        department: '', prerequisites: ''
    };
    const { data, post, setData} = useForm({default: initialCourseFormData});

    const handleSubmit = (event) => {
        event.preventDefault();

        post(route('admin.courses.store'));
    }

    const updateCourseFormData = (courseFormId, key, value) => {
        setData((prevCourseFormsData) => {
            const courseFormData = prevCourseFormsData[courseFormId];
            return ({
                ...prevCourseFormsData,
                [courseFormId]: {...courseFormData, [key]: value}
            });
        });
    }

    const deleteCourseEntry = (courseFormId) => {
        setData((previousData) => {
            delete previousData[courseFormId];
            return {...previousData};
        });
    }

    return (
        <Layout header="Add Courses">
            <Head title="Add Courses"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">

                    <div className="bg-white p-4 shadow rounded sm:rounded-lg sm:p-8">

                        <div className="flex items-center justify-between pb-4 border-b">
                            <h2 className="text-xl font-bold">Add Courses</h2>
                        </div>

                        <div className="mt-6">

                            <div className="space-y-6">

                                {
                                    Object.entries(data).map(([courseFormId, courseFormData]) => {
                                        return (
                                            <CreateCourseForm
                                                key={courseFormId}
                                                courseFormId={courseFormId}
                                                courseFormData={courseFormData}
                                                courses={courses}
                                                departments={departments}
                                                handleDeleteButtonClick={deleteCourseEntry}
                                                updateCourseFormData={updateCourseFormData}
                                                canDelete={courseFormId !== 'default'}
                                            />
                                        );
                                    })
                                }

                                <div className="flex justify-between">
                                    <div>
                                        <SecondaryButton onClick={(e) => {
                                            const courseFormId = Date.now();
                                            setData(previousData => {
                                                return {...previousData, [courseFormId]: initialCourseFormData}
                                            });
                                        }}>
                                            Add Course Entry
                                        </SecondaryButton>
                                    </div>
                                    <div>
                                        <PrimaryButton onClick={handleSubmit}>
                                            Submit
                                        </PrimaryButton>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </Layout>
    )
}
