<?php

namespace App\Services;

use App\Constants\TimeAppointment;
use App\Models\Appointment;
use App\Repositories\AppointmentRepository;

class AppointmentService
{
    private $appointmentRepository;

    public function __construct(AppointmentRepository $appointmentRepository)
    {
        $this->appointmentRepository = $appointmentRepository;
    }

    public function getTime($date)
    {
        if (!$date) {
            return TimeAppointment::TIME_APPOINTMENT;
        }

        $timeBooked = $this->appointmentRepository->getTimeBooked($date);

        $timeValid = TimeAppointment::TIME_APPOINTMENT;
        foreach ($timeValid as &$timeAppointment) {
            if (!in_array($timeAppointment['id'], $timeBooked)) {
                $timeAppointment['enable'] = true;
            }
        }

        return $timeValid;
    }

    public function create($data)
    {
        $data['status'] = Appointment::STATUS_BOOKED;
        $this->appointmentRepository->create($data);
    }

    public function list(array $params = [])
    {
        return $this->appointmentRepository->list($params);
    }

}
