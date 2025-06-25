<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Student;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{


    public function index(Request $request)
    {
        return \inertia('Dashboard', [
            'student' => $request->user('student')->load('user')
        ]);
    }

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user('student') instanceof MustVerifyEmail,
            'status' => session('status'),
            'student' => $request->user('student')->load('user')
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        $student = $request->user('student');

        $studentAttrs = $request->validate([
            'first_name'    => ['required', 'string'],
            'last_name'     => ['required', 'string'],
        ]);
        $userAttrs = $request->validate([
            'username' => ['required', 'string', 'max:255', 'regex:/^[a-zA-Z0-9_]+$/',
                Rule::unique(User::class)->ignore($student->user->id)
            ],
            'email' => ['required', 'email', 'max:255',
                Rule::unique(User::class)->ignore($student->user->id)
            ]
        ], [
            'username.regex' => 'Username can only contain alphabets, numbers and underscore (__)',
            'email.unique'  => 'Email already exists'
        ]);

        $student->fill($studentAttrs);
        $student->user->fill($userAttrs);

        if ($student->user->isDirty('email')) {
            $student->user->email_verified_at = null;
        }

        $student->save();
        $student->user->save();

        return redirect(route('profile.edit'))->with('success', 'Profile updated successfully');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

}
