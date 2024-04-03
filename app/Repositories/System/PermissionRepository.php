<?php

namespace App\Repositories\System;

use App\Models\System\Permission;
use Hyhy\Common\Repositories\BaseRepository;

class PermissionRepository extends BaseRepository
{
    public function model()
    {
        return Permission::class;
    }

}
