<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateCategorieTable extends Migration {

	public function up()
	{
		Schema::create('categorie', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name')->unique();
			$table->string('sexe')->nullable();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('categorie');
	}
}