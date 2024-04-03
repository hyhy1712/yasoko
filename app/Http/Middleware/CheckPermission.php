<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Laravel\Sanctum\Http\Middleware\CheckForAnyAbility;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $routeName = $request->route()->getName();
        if (empty($routeName)) {
            throw new AuthorizationException;
        }

        $permissions = config('permissions');
        if (empty($permissions[$routeName])) {
            throw new AuthorizationException;
        }

        $permissionOfRoute = explode(',', $permissions[$routeName]);

        return app(CheckForAnyAbility::class)->handle($request, $next, ...$permissionOfRoute);
    }
}
