<?php
declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

class ProfileController extends Controller
{
    public function show()
    {
        return inertia('Admin/Dashboard', [
            'admin' => auth()->user()
        ]);
    }

    public function edit()
    {
        return inertia('Admin/Profile/Edit');
    }

    public function update()
    {

    }
}
