<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class AuthenticatedStudentSessionController extends Controller
{

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return inertia('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

        $credentials = $request->validate([
            'reg_no'    => ['required', 'string'],
            'password'  => ['required', 'string']
        ], [
            'reg_no.required'   => 'The registration number field is required.'
        ]);

        $remember = !! $request->get('remember');
        if (! Auth::guard('student')->attempt($credentials, $remember)) {
            return redirect()->back()
                ->with('error', 'Invalid registration number or password');
        }

        return redirect('/dashboard');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        //

        Auth::guard('student')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('login'));
    }
}
