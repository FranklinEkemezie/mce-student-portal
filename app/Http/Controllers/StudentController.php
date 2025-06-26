<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        return Inertia::render('Admin/Students', [
            'students' => Student::with(['user'])->paginate(50)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentController $student)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentController $student)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentController $student)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentController $student)
    {
        //
    }
}
