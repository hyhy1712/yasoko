<?php

namespace App\Repositories\System;

use App\Models\System\User;
use Hyhy\Common\Repositories\BaseRepository;

class UserRepository extends BaseRepository
{
    protected $filterFields = [
        'name' => 'name',
        'username' => 'username',
        'gtc_extension' => 'gtc_extension',
        'email' => 'email',
        'status' => [self::CONDITION_FILTER_FIELD_ISSET, '=', 'status'],
        'call_center' => [self::CONDITION_FILTER_FIELD_NOT_EMPTY, 'IN', 'call_center'],
    ];

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

        if (!empty($params['department'])) {
            $this->whereHas('groups', function ($query) use ($params) {
                $query->whereIn('group_id', $params['department']);
            });
        }

        if (!empty($params['role'])) {
            $this->whereHas('roles', function ($query) use ($params) {
                $query->whereIn('role_id', $params['role']);
            });
        }

        return $this
            ->filter($params)
            ->with('groups')
            ->findWherePaginate($conditions, $params['limit'] ?? null, ['id' => 'desc']);
    }
}
