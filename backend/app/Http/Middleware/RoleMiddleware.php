<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class RoleMiddleware
{
   public function handle(Request $request, Closure $next, ...$roles)
{
    $user = auth()->user();

    if (!$user) {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    // 🔥 direct DB check (no relation needed)
    $hasRole = $user->roles()
        ->whereIn('role_code', $roles)
        ->exists();

    if (!$hasRole) {
        return response()->json([
            'error' => 'Forbidden. You do not have permission.'
        ], 403);
    }

    return $next($request);
}
}