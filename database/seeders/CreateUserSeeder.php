<?php

namespace Database\Seeders;

use App\Models\System\Role;
use App\Models\System\User;
use Illuminate\Database\Seeder;

class CreateUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => \Hash::make('123456')
        ]);

        $role = Role::create([
           'name' => 'admin',
           'slug' => 'admin'
        ]);

        $admin->roles()->attach($role['id']);
    }
}
