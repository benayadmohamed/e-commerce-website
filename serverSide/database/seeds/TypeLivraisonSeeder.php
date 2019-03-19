<?php

use Illuminate\Database\Seeder;

class TypeLivraisonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\models\TypeLivraison::create(array('name' => 'free'));
    }
}
