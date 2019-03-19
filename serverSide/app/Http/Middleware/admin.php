<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

class admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */

    public function handle($request, Closure $next, ...$guards)
    {

        $u = null !== Auth::user()->roles()->where('name', 'admin')->first();
        if ($request->user()->isAdmin()) {
            return $next($request);
        }
        // return response()->json(['message' => 'Unauthenticated  :(.']);
        throw new AuthenticationException($u, $guards);
    }


}
