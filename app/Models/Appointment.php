<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Validation\ValidationException;

class Appointment extends BaseModel
{
    use HasFactory;

    const STATUS_CANCEL = 0;
    const STATUS_BOOKED = 1;

    protected $guarded = [];

    protected static function booted(): void
    {
        static::creating(function (Appointment $appointment) {
            $appointmentCreated = Appointment::query()
                ->where('date', '=', $appointment->date)
                ->where('time', '=', $appointment->time)
                ->where('status', '=', self::STATUS_BOOKED)
                ->first();

            if ($appointmentCreated) {
                throw ValidationException::withMessages(['appointment' => 'Lịch khám đã tồn tại']);
            }
        });
    }
}
