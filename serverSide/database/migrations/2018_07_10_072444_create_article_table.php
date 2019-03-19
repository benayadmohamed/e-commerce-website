<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateArticleTable extends Migration {

	public function up()
	{
		Schema::create('article', function(Blueprint $table) {
			$table->increments('id');
			$table->float('taille')->nullable();
			$table->integer('stock');
			$table->integer('produit_id')->unsigned();
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('article');
	}
}