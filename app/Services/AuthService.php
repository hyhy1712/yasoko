<?php

namespace App\Services;

use App\Models\System\User;
use Carbon\Carbon;
use Laravel\Sanctum\NewAccessToken;

class AuthService
{
    public function createAccessToken(User $user): NewAccessToken
    {
        $token = $user->createToken(
            'authToken',
            $this->getPermissions($user),
            Carbon::now()->addMinutes(config('sanctum.expiration'))
        );
        return $token;
    }

    private function getPermissions(User $user): array
    {
        if ($user->hasRole(config('app.role_admin'))) {
            return ['*'];
        }
        return $user->getPermissions();
    }
}
