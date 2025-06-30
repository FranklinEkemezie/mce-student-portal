<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Traits\BelongsToUser;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
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
     * @throws Exception
     */
    public function share(Request $request): array
    {
        $getFlash = fn(string $key) => (
            fn () => ([
                'message'   => $v = $request->session()->get($key),
                'timestamp' => $v ? now()->timestamp : null
            ])
        );

        /**
         * Get the authenticated user
         * @param Request $request
         * @param array $guards
         * @param array $relations
         * @return User|null
         * @throws Exception
         */
        $getAuthUser = function (Request $request, array $guards=[], array $relations=[]): ?User {

            $guards[] = null;
            foreach ($guards as $guard) {
                $user = $request->user($guard);
                if ($user) break;
            }

            if (! $user) return null;
            if ($user instanceof User) return $user->load($relations);
            if ($user instanceof Model &&
                in_array(BelongsToUser::class, class_uses($user))) {
                return $user->getUser()->load($relations);
            }

            throw new Exception(
                "The request user model belong to a user and use the " .
                BelongsToUser::class . " trait"
            );
        };

        return [
            // Define global props
            ...parent::share($request),
            'auth' => [
                'user' => $getAuthUser($request, ['student', 'admin'], ['student', 'admin'])
            ],
            'flash' => [
                'success'   => $getFlash('success'),    // success
                'error'     => $getFlash('error'),      // errors
                'warning'   => $getFlash('warning'),    // warnings
                'info'      => $getFlash('info')        // infos
            ]
        ];
    }
}
