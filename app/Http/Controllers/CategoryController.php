<?php

namespace App\Http\Controllers;

use App\Http\Requests\System\UserCreateRequest;
use App\Http\Requests\System\UserUpdateRequest;
use App\Services\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index(Request $request)
    {
        return responder()->success($this->categoryService->list($request->all()));
    }

    public function store(UserCreateRequest $request)
    {
        $user = $this->categoryService->create($request->all());
        if ($user) {
            return responder()->success();
        }
        return responder()->fail();
    }

    public function show($id)
    {
        return responder()->success($this->categoryService->detail($id));
    }

    public function update(UserUpdateRequest $request, $id)
    {
        $user = $this->categoryService->update($id, $request->all());
        if ($user) {
            return responder()->success();
        }
        return responder()->fail();
    }
}
