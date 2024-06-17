<?php

namespace App\Services;

use App\Repositories\CategoryRepository;

class CategoryService
{
    private $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function list(array $params = [])
    {
        return $this->categoryRepository->list($params);
    }

    public function create(array $params)
    {
        return true;
    }

    public function detail($id)
    {
        return $this->categoryRepository->findWhereFirst(['id' => $id]);
    }

    public function update($id, array $params)
    {
        return true;
    }
}
