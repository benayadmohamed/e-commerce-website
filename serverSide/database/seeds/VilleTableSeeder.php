<?php

use Illuminate\Database\Seeder;
use App\Ville;

class VilleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Ville::create(array('name' => 'Meknes'));
    }
}
