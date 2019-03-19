<?php

use Illuminate\Database\Seeder;
use App\Region;

class RegionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $region = new Region();
        $region->name = 'Fès-Meknès';
        $region->save();
        Region::create(array('name' => 'Béni Mellal-Khénifra'));
        Region::create(array('name' => 'Casablanca-Settat'));
        Region::create(array('name' => 'Dakhla-Oued Ed-Dahab'));
        Region::create(array('name' => 'Drâa-Tafilalet'));
        Region::create(array('name' => 'Guelmim-Oued Noun'));
        Region::create(array('name' => 'L\'Oriental'));
        Region::create(array('name' => 'Laâyoune-Sakia El Hamra'));
        Region::create(array('name' => 'Marrakech-Safi'));
        Region::create(array('name' => 'Rabat-Salé-Kénitra'));
        Region::create(array('name' => 'Souss-Massa'));
        Region::create(array('name' => 'Tanger-Tétouan-Al Hoceïma'));
    }
}
