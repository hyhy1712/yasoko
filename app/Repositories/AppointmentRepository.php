<?php

namespace App\Repositories;

use App\Models\Appointment;
use Hyhy\Common\Repositories\BaseRepository;

class AppointmentRepository extends BaseRepository
{
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
}
