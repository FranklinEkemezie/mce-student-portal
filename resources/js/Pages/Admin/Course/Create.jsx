import Layout from '@/Layouts/AdminLayout'
import {Head, useForm} from '@inertiajs/react'
import React, {useState} from "react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import CreateCourseForm from "@/Partials/CreateCourseForm.jsx";
import SecondaryButton from "@/Components/SecondaryButton.jsx";

export default function Create({ departments, courses }) {

    const [ courseFormIds, setCourseFormIds ] = useState([]);

    const [ defaultCourseFormData, setDefaultCourseFormData ] = useState({});
    const [ courseFormsData, setCourseFormsData ] = useState({});

    const {  post, setData } = useForm({
        title: '', unit: '',
        level: '', semester: '',
        code: '', prerequisites: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        const formsData = {'default': defaultCourseFormData, ...courseFormsData};
        for (const courseFormId in formsData) {
            const {
                title, unit,
                level, semester,
                courseCodeName, courseCodeDigit,
                prerequisites
            } = formsData[courseFormId];

            const courseCode = `${courseCodeName} ${courseCodeDigit}`;

            setData({
                title, unit, level, semester, prerequisites, code: courseCode
            });

            post(route('admin.courses'));
        }

    }

    const updateCourseFormData = (courseFormId, updatedCourseFormData) => {

        setCourseFormsData((prevCourseFormsData) => {

            return ({
                ...prevCourseFormsData,
                [courseFormId]: updatedCourseFormData
            });
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

                                {/* Default course form   */}
                                <CreateCourseForm
                                    courseFormId='default'
                                    courses={courses}
                                    departments={departments}
                                    canDelete={false}
                                    updateCourseFormData={(courseFormId, updatedCourseFormData) => {
                                        setDefaultCourseFormData({...updatedCourseFormData});
                                    }}
                                />

                                {/* Added course forms  */}
                                {
                                    courseFormIds.map(courseFormId => {
                                        return (
                                            <CreateCourseForm
                                                key={courseFormId}
                                                courseFormId={courseFormId}
                                                courses={courses}
                                                departments={departments}
                                                handleDeleteButtonClick={courseFormId => {
                                                    setCourseFormIds((prevCourseFormIds) => [
                                                        ...prevCourseFormIds.filter(id => id !== courseFormId)
                                                    ]);

                                                    setCourseFormsData((prevCourseFormsData) => {
                                                        delete prevCourseFormsData[courseFormId];
                                                        return {...prevCourseFormsData};
                                                    });
                                                }}
                                                updateCourseFormData={updateCourseFormData}
                                            />
                                        );
                                    })
                                }

                                <div className="flex justify-between">
                                    <div>
                                        <SecondaryButton onClick={(e) => {
                                            const courseFormId = Date.now();
                                            setCourseFormIds([...courseFormIds, courseFormId]);
                                            setCourseFormsData((prevState) => ({
                                                ...prevState, [courseFormId]: null
                                            }));
                                        }}>
                                            Add Another Course
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
