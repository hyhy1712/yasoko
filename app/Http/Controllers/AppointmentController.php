<?php

namespace App\Http\Controllers;

use App\Services\AppointmentService;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    private $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function getTimeAppointment(Request $request)
    {
        $times = $this->appointmentService->getTime($request->date);
        return responder()->success($times);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'gender' => 'required',
            'date_of_birth' => 'required',
            'phone' => 'required',
            'date' => 'required',
            'time' => 'required',
            'description' => 'required'
        ]);

        $appointment = $this->appointmentService->create($request->only([
            'name',
            'gender',
            'date_of_birth',
            'phone',
            'date',
            'time',
            'description'
        ]));
        return responder()->success($appointment);
    }

    public function index(Request $request)
    {
        return responder()->success($this->appointmentService->list($request->all()));
    }
}
