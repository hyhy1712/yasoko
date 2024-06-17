<?php

namespace App\Repositories;

use App\Models\Category;
use Hyhy\Common\Repositories\BaseRepository;

class CategoryRepository extends BaseRepository
{
    protected $filterFields = [
        'name' => [self::CONDITION_FILTER_FIELD_NOT_EMPTY, 'like', '%name%'],
        'slug' => [self::CONDITION_FILTER_FIELD_NOT_EMPTY, 'like', '%slug%']
    ];

    public function model()
    {
        return Category::class;
    }

    public function list($params)
    {
        return $this->filter($params)->findWherePaginate();
    }
}
