<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $getFlash = fn(string $key) => (
            fn () => ([
                'message'   => $v = $request->session()->get($key),
                'timestamp' => $v ? now()->timestamp : null
            ])
        );

        return [
            ...parent::share($request),
            'auth' => [
                'user'      => $request->user(),
                'student'   => $request->user('student')?->load('user')
            ],
            'flash' => [
                'success'   => $getFlash('message'),    // success
                'error'     => $getFlash('error'),      // errors
                'warning'   => $getFlash('warning'),    // warnings
                'info'      => $getFlash('info')        // infos
            ]
        ];
    }
}
