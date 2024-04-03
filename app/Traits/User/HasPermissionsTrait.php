<?php

namespace App\Traits\User;

use App\Models\System\Role;

trait HasPermissionsTrait
{
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'users_roles', 'user_id', 'role_id')->withTimestamps();
    }

    public function hasRole($role)
    {
        $roles = $this->getRoles();
        return array_search($role, $roles) === false ? false : true;
    }

    public function hasPermission($permission)
    {
        $permissions = $this->getPermissions();
        return array_search($permission, $permissions) === false ? false : true;
    }

    public function getRoles()
    {
        $this->loadMissing('roles');
        foreach ($this->roles as $role) {
            $roles[] = $role['name'];
        }
        return $roles;
    }

    public function getPermissions()
    {
        $permissions = [];
        $this->loadMissing('roles.permissions');
        foreach ($this->roles as $role) {
            foreach ($role->permissions as $permission) {
                $permissions[$permission['name']] = $permission['name'];
            }
        }
        return array_values($permissions);
    }
}
