<?php

use Illuminate\Database\Seeder;
use App\models\InfoSite;

class InfoSiteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        InfoSite::create(array(
            'tele' => '+212 6 61 50 30 43',
            'name' => 'Palais Damasquini',
            'fax' => '+212 5 35 53 35 02',
            'adresse' => 'N° 10 Kobt Souk Kissariat Lahrir - Meknès',
            'debutDeService' => '08:00 AM',
            'finDeService' => '18:00 AM',
            'email' => 'palaisdamasquini@gmail.com',
            'x' => '33.8954655',
            'y' => '-5.5568128'
        ));
    }
}
