<?php

namespace App\Services\System;

use App\Models\System\Role;
use App\Repositories\System\RoleRepository;
use DB;
use Log;
use Throwable;

class RoleService
{
    private $roleRepository;

    public function __construct(RoleRepository $roleRepository)
    {
        $this->roleRepository = $roleRepository;
    }

    public function all($columns = ['*']){{
        return $this->roleRepository->all($columns);
    }}

    public function list(array $params = [])
    {
        return $this->roleRepository->list($params);
    }

    public function create(array $params)
    {
        try {
            DB::beginTransaction();
            /** @var Role $role */
            $role = $this->roleRepository->create([
                'name' => $params['name'],
                'display_name' => $params['display_name'],
                'description' => $params['description'] ?? null
            ]);
            $role->permissions()->attach($params['permissions'] ?? []);
            DB::commit();
            return true;
        } catch (Throwable $exception) {
            Log::error($exception);
        }
        DB::rollBack();
        return false;

    }

    public function detail($id)
    {
        return $this->roleRepository->with('permissions')->findWhereFirst(['id' => $id]);
    }

    public function update($id, array $params)
    {
        try {
            DB::beginTransaction();
            $role = $this->roleRepository->update($params, $id);
            $role->permissions()->sync($params['permissions']);
            DB::commit();
            return true;
        } catch (Throwable $exception) {
            Log::error($exception);
        }
        DB::rollBack();
        return false;
    }

    public function active($id)
    {
        return $this->roleRepository->update(['is_active' => Role::IS_ACTIVE], $id);
    }

    public function deactivate($id)
    {
        return $this->roleRepository->update(['is_active' => Role::NOT_ACTIVE], $id);
    }
}
