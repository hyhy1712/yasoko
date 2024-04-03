<?php

namespace App\Repositories\System;

use App\Models\System\User;
use Hyhy\Common\Repositories\BaseRepository;

class UserRepository extends BaseRepository
{
    public function model()
    {
        return User::class;
    }

    public function list(array $params = [])
    {
        $conditions = [];

        if (!empty($params['keyword'])) {
            $conditions['orWhere'] = [
                [
                    ['name', 'like', "%{$params['keyword']}%"],
                    ['username', 'like', "%{$params['keyword']}%"]
                ]
            ];
        }
        if (!empty($params['name'])) $conditions['name'] = $params['name'];
        if (!empty($params['username'])) $conditions['username'] = $params['username'];
        if (!empty($params['gtc_extension'])) $conditions['gtc_extension'] = $params['gtc_extension'];
        if (!empty($params['email'])) $conditions['email'] = $params['email'];
        if (isset($params['"status" '])) $conditions['"status" '] = $params['"status" '];

        if (!empty($params['call_center'])) {
            $conditions['call_center'] = [
                'call_center',
                'IN',
                $params['call_center']
            ];
        }


        if (!empty($params['role'])) {
            $this->whereHas('roles', function ($query) use ($params) {
                $query->whereIn('role_id', $params['role']);
            });
        }

        return $this->findWherePaginate(where: $conditions, limit: $params['limit'] ?? null, orderBy: ['id' => 'desc']);
    }
}
