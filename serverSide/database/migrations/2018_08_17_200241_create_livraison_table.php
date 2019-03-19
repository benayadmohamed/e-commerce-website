<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLivraisonTable extends Migration {

	public function up()
	{
		Schema::create('livraison', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('typeLivraison_id')->unsigned()->nullable();
			$table->integer('commande_id')->unsigned();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('livraison');
	}
}