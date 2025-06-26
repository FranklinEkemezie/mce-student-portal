<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticatedByAnyGuard
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $guards = array_keys(config('auth.guards'));
        foreach ($guards as $guard) {

            // Check if the user is already logged in any of the guard
            if (auth($guard)->check()) {
                return redirect(
                    config("auth.guards.{$guard}.redirects.home")
                        ?? route('dashboard')
                );
            }
        }

        return $next($request);
    }
}
