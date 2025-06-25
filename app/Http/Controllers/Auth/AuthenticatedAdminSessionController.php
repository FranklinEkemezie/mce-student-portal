<?php
declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use http\Client\Curl\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthenticatedAdminSessionController extends Controller
{

    public function create()
    {
        return inertia('Admin/Auth/Login', [
            'admin'
        ]);
    }

    public function store(Request $request)
    {

        $credentials = $request->validate([
            'username'  => ['required', 'string'],
            'password'  => ['required', 'string']
        ]);

        $user = \App\Models\User::query()
            ->where('username', $credentials['username'])
            ->whereHas('admin')
            ->first();

        if (! $user || ! \Hash::check($credentials['password'],  $user->password)) {
            return back()->with('error', 'Incorrect username or password');
        }

        Auth::guard('admin')->login($user);

        return redirect(route('admin.dashboard'));
    }
}
