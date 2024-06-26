<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\System\PermissionController;
use App\Http\Controllers\System\RoleController;
use App\Http\Controllers\System\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

//Api Admin
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'meInfo']);

    Route::prefix('all')->group(function () {
        Route::get('/roles', [RoleController::class, 'all']);
        Route::get('/time-appointment', [AppointmentController::class, 'getTimeAppointment']);
    });

    Route::prefix('roles')->name('roles.')->group(function () {
        Route::get('/module-group-permission', [RoleController::class, 'getModuleGroupPermission'])->name('module-group-permission');
        Route::patch('/{id}/active', [RoleController::class, 'active'])->name('active');
        Route::patch('/{id}/deactivate', [RoleController::class, 'deactivate'])->name('deactivate');
    });

    Route::prefix('permissions')->name('permissions.')->group(function () {
        Route::get('/', [PermissionController::class, 'index'])->name('index');
    });

    Route::apiResources(
        [
            'roles' => RoleController::class,
            'users' => UserController::class,
            'categories' => CategoryController::class
        ],
        ['except' => 'destroy']
    );
});

//Api Customer
Route::prefix('appointments')->name('appointments.')->group(function () {
    Route::get('/get-time', [AppointmentController::class, 'getTimeAppointment']);
    Route::post('', [AppointmentController::class, 'store']);
});
