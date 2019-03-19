<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateLigneCommandeTable extends Migration {

	public function up()
	{
		Schema::create('ligneCommande', function(Blueprint $table) {
			$table->increments('id');
			$table->integer('quantite')->default('1');
			$table->double('sousTotal')->nullable();
			$table->integer('commande_id')->unsigned()->nullable();
			$table->integer('produit_id')->unsigned();
			$table->integer('profile_id')->unsigned();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('ligneCommande');
	}
}