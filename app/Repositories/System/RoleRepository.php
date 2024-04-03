<?php

namespace App\Repositories\System;

use App\Models\System\Role;
use Hyhy\Common\Repositories\BaseRepository;

class RoleRepository extends BaseRepository
{
    public function model()
    {
        return Role::class;
    }

    public function list(array $params = [])
    {
        $conditions = [];

        if (!empty($params['keyword'])) {
            $conditions['orWhere'] = [
                [
                    ['name', 'like', "%{$params['keyword']}%"],
                    ['display_name', 'like', "%{$params['keyword']}%"]
                ]
            ];
        }
        if (!empty($params['name'])) $conditions['name'] = $params['name'];
        if (!empty($params['display_name'])) $conditions['display_name'] = $params['display_name'];
        if (isset($params['is_active'])) $conditions['is_active'] = $params['is_active'];

        return $this->findWherePaginate(where: $conditions, limit: $params['limit'] ?? null, orderBy: ['id' => 'desc', 'is_active' => 'desc']);
    }
}
