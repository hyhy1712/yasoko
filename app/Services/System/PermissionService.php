<?php

namespace App\Services\System;

use App\Repositories\System\PermissionRepository;

class PermissionService
{
    private $permissionRepository;

    public function __construct(PermissionRepository $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
    }

    public function list()
    {
        return $this->permissionRepository->all(['display_name AS title', 'id AS key', 'group'])->groupBy('group');
    }
}
