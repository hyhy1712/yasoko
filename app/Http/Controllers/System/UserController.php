<?php

namespace App\Http\Controllers\System;

use App\Http\Controllers\Controller;
use App\Http\Requests\System\UserCreateRequest;
use App\Http\Requests\System\UserUpdateRequest;
use App\Services\System\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    private $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index(Request $request)
    {
        return responder()->success($this->userService->list($request->all()));
    }

    public function store(UserCreateRequest $request)
    {
        $user = $this->userService->create($request->all());
        if ($user) {
            return responder()->success();
        }
        return responder()->fail();
    }

    public function show($id)
    {
        return responder()->success($this->userService->detail($id));
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $user = $this->userService->update($id, $request->all());
        if ($user) {
            return responder()->success();
        }
        return responder()->fail();
    }
}
