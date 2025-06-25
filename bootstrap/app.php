<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        /**
         * Determine the appropriate redirect route for a request based on the guard.
         *
         * This function attempts to inspect the guard used in the current request
         * (e.g. 'admin', etc.) and returns a route based on a given redirect type
         * (such as 'login', 'home', 'dashboard'). It reads from the `redirects`
         * array defined in each guard's configuration in `config/auth.php`.
         *
         * This is useful for customising redirection for both guests
         * (unauthenticated users) and authenticated users, depending
         * on the context in which the route is being accessed.
         * @param Request $request The current incoming request instance.
         * @param string $redirectType The key in the `redirects` array of the guard
         * (e.g. 'home', 'login', 'dashboard').
         * @param string $default The fallback route path or URL to use if no
         * custom redirect is found.
         * @return string The resolved redirect URL or path.
         */
        $getGuardRedirectToRoute = function  (Request $request, string $redirectType, string $default): string {
            $route = $request->route();

            // Get middlewares attached to the current route
            $middlewareStack = $route?->gatherMiddleware() ?? [];
            foreach ($middlewareStack as $middleware) {
                if (! str_starts_with($middleware, 'auth:')) continue;

                [, $guard] = explode(':', $middleware);

                $redirects = config("auth.guards.{$guard}.redirects");
                if (is_array($redirects) && isset($redirects[$redirectType])) {
                    return $redirects[$redirectType];
                }

                return $default;
            }

            return $default;
        };

        $middleware->redirectGuestsTo(fn (Request $request) => (
            $getGuardRedirectToRoute($request, 'login', route('login'))
        ));
        $middleware->redirectUsersTo(fn (Request $request) => (
            $getGuardRedirectToRoute($request, 'home', route('dashboard'))
        ));

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
