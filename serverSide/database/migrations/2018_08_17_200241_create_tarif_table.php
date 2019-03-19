<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTarifTable extends Migration {

	public function up()
	{
		Schema::create('tarif', function(Blueprint $table) {
			$table->increments('id');
			$table->float('montant');
			$table->integer('typeLivraison_id')->unsigned();
			$table->integer('ville_id')->unsigned();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('tarif');
	}
}