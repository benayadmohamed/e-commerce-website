<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateSousCategorieTable extends Migration {

	public function up()
	{
		Schema::create('sousCategorie', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name')->unique();
			$table->integer('categorie_id')->unsigned();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('sousCategorie');
	}
}