<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateMatiereArticleTable extends Migration {

	public function up()
	{
		Schema::create('matiere_article', function(Blueprint $table) {
			$table->increments('id');
			$table->timestamps();
			$table->integer('article_id')->unsigned();
			$table->integer('matiere_id')->unsigned();
		});
	}

	public function down()
	{
		Schema::drop('matiere_article');
	}
}