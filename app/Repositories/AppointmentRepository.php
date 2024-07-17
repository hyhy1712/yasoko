<?php

namespace App\Repositories;

use App\Models\Appointment;
use Hyhy\Common\Repositories\BaseRepository;

class AppointmentRepository extends BaseRepository
{
    protected $filterFields = [
        'name' => [self::CONDITION_FILTER_FIELD_NOT_EMPTY, 'like', '%name%'],
        'phone' => [self::CONDITION_FILTER_FIELD_NOT_EMPTY, 'like', '%phone%'],
        'date' => 'date',
        'time' => [self::CONDITION_FILTER_FIELD_NOT_EMPTY, 'in', 'time'],
    ];

    public function model()
    {
        return Appointment::class;
    }

    public function getTimeBooked($date)
    {
        return $this->findWhere([
            'date' => $date,
            'status' => Appointment::STATUS_BOOKED
        ])->pluck('time')->toArray();
    }

    public function list($params)
    {
        $conditions = [];
        if (!empty($params['keyword'])) {
            $conditions['orWhere'] = [
                [
                    ['name', 'like', "%{$params['keyword']}%"],
                    ['phone', 'like', "%{$params['keyword']}%"]
                ]
            ];
        }

        return $this->filter($params)->findWherePaginate(
            $conditions,
            $params['limit'] ?? null,
            ['date' => 'desc', 'time' => 'desc']
        );
    }
}
