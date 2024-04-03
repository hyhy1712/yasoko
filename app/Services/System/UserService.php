<?php

namespace App\Services\System;

use App\Models\System\User;
use App\Repositories\System\UserRepository;
use DB;
use Illuminate\Support\Facades\Hash;
use Log;

class UserService
{
    private $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function list(array $params = [])
    {
        return $this->userRepository->list($params);
    }

    public function create(array $params)
    {
        try {
            DB::beginTransaction();

            /** @var User $user */
            $user = $this->userRepository->create([
                'name' => $params['name'],
                'username' => $params['username'],
                'password' => Hash::make($params['password']),
                'status' => $params['status'],
                'gtc_extension' => $params['gtc_extension'],
                'call_center' => $params['call_center'],
                'email' => $params['email'],
            ]);
            $this->syncUserRoleAndDepartment($user, $params['role'], $params['department']);

            DB::commit();
            return true;
        } catch (\Throwable $exception) {
            Log::error($exception);
        }
        DB::rollBack();
        return false;
    }

    public function detail($id)
    {
        return $this->userRepository->with(['roles', 'groups'])->findWhereFirst(['id' => $id]);
    }

    public function update($id, array $params)
    {
        try {
            DB::beginTransaction();

            /** @var User $user */
            $user = $this->userRepository->update($params, $id);
            $this->syncUserRoleAndDepartment($user, $params['role'], $params['department']);

            DB::commit();
            return true;
        } catch (\Throwable $exception) {
            Log::error($exception);
        }
        DB::rollBack();
        return false;
    }

    private function syncUserRoleAndDepartment(User $user, $roleIds, $departmentId)
    {
        $user->groups()->sync([
            $departmentId => ['type' => User::USER_DEPARTMENT_TYPE_MEMBER]
        ]);
        $user->roles()->sync($roleIds);
    }
}
