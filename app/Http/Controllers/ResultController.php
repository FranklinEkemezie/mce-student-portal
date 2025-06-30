<?php
declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class ResultController extends Controller
{
    public function index()
    {

    }

    public function create()
    {
        return inertia('Result/Create', [
            'courses' => Course::all()
        ]);
    }

    public function store(Request $request)
    {
    }

    public function show($id)
    {
    }

    public function edit($id)
    {
    }

    public function update(Request $request, $id)
    {
    }

    public function destroy($id)
    {
    }
}
