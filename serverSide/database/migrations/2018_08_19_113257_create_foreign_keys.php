<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Eloquent\Model;

class CreateForeignKeys extends Migration {

	public function up()
	{
		Schema::table('profile', function(Blueprint $table) {
			$table->foreign('user_id')->references('id')->on('profile')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('adresse', function(Blueprint $table) {
			$table->foreign('profile_id')->references('id')->on('profile')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('adresse', function(Blueprint $table) {
			$table->foreign('ville_id')->references('id')->on('villes')
						->onDelete('set null')
						->onUpdate('set null');
		});
		Schema::table('adresse', function(Blueprint $table) {
			$table->foreign('region_id')->references('id')->on('regions')
						->onDelete('set null')
						->onUpdate('set null');
		});
		Schema::table('commande', function(Blueprint $table) {
			$table->foreign('profile_id')->references('id')->on('profile')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('produit', function(Blueprint $table) {
			$table->foreign('categorie_id')->references('id')->on('categorie')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('produit', function(Blueprint $table) {
			$table->foreign('sousCategorie_id')->references('id')->on('sousCategorie')
						->onDelete('set null')
						->onUpdate('cascade');
		});
		Schema::table('produit', function(Blueprint $table) {
			$table->foreign('marque_id')->references('id')->on('marque')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('produit', function(Blueprint $table) {
			$table->foreign('reduction_id')->references('id')->on('reduction')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('article', function(Blueprint $table) {
			$table->foreign('produit_id')->references('id')->on('produit')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('image', function(Blueprint $table) {
			$table->foreign('article_id')->references('id')->on('article')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('sousCategorie', function(Blueprint $table) {
			$table->foreign('categorie_id')->references('id')->on('categorie')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('ligneCommande', function(Blueprint $table) {
			$table->foreign('commande_id')->references('id')->on('commande')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('ligneCommande', function(Blueprint $table) {
			$table->foreign('produit_id')->references('id')->on('produit')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('ligneCommande', function(Blueprint $table) {
			$table->foreign('profile_id')->references('id')->on('profile')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('color_article', function(Blueprint $table) {
			$table->foreign('color_id')->references('id')->on('color')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('color_article', function(Blueprint $table) {
			$table->foreign('article_id')->references('id')->on('article')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('matiere_article', function(Blueprint $table) {
			$table->foreign('article_id')->references('id')->on('article')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('matiere_article', function(Blueprint $table) {
			$table->foreign('matiere_id')->references('id')->on('matiere')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('wishlist', function(Blueprint $table) {
			$table->foreign('produit_id')->references('id')->on('produit')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('wishlist', function(Blueprint $table) {
			$table->foreign('profile_id')->references('id')->on('profile')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('compare', function(Blueprint $table) {
			$table->foreign('produit_id')->references('id')->on('produit')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('compare', function(Blueprint $table) {
			$table->foreign('profile_id')->references('id')->on('profile')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('avis', function(Blueprint $table) {
			$table->foreign('profile_id')->references('id')->on('profile')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('avis', function(Blueprint $table) {
			$table->foreign('produit_id')->references('id')->on('produit')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('tarif', function(Blueprint $table) {
			$table->foreign('typeLivraison_id')->references('id')->on('typeLivraison')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('tarif', function(Blueprint $table) {
			$table->foreign('ville_id')->references('id')->on('villes')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('paiement', function(Blueprint $table) {
			$table->foreign('profile_id')->references('id')->on('profile')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('paiement', function(Blueprint $table) {
			$table->foreign('commande_id')->references('id')->on('commande')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('livraison', function(Blueprint $table) {
			$table->foreign('typeLivraison_id')->references('id')->on('typeLivraison')
						->onDelete('set null')
						->onUpdate('set null');
		});
		Schema::table('livraison', function(Blueprint $table) {
			$table->foreign('commande_id')->references('id')->on('commande')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('role_user', function(Blueprint $table) {
			$table->foreign('role_id')->references('id')->on('roles')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
		Schema::table('role_user', function(Blueprint $table) {
			$table->foreign('user_id')->references('id')->on('users')
						->onDelete('cascade')
						->onUpdate('cascade');
		});
	}

	public function down()
	{
		Schema::table('profile', function(Blueprint $table) {
			$table->dropForeign('profile_user_id_foreign');
		});
		Schema::table('adresse', function(Blueprint $table) {
			$table->dropForeign('adresse_profile_id_foreign');
		});
		Schema::table('adresse', function(Blueprint $table) {
			$table->dropForeign('adresse_ville_id_foreign');
		});
		Schema::table('adresse', function(Blueprint $table) {
			$table->dropForeign('adresse_region_id_foreign');
		});
		Schema::table('commande', function(Blueprint $table) {
			$table->dropForeign('commande_profile_id_foreign');
		});
		Schema::table('produit', function(Blueprint $table) {
			$table->dropForeign('produit_categorie_id_foreign');
		});
		Schema::table('produit', function(Blueprint $table) {
			$table->dropForeign('produit_sousCategorie_id_foreign');
		});
		Schema::table('produit', function(Blueprint $table) {
			$table->dropForeign('produit_marque_id_foreign');
		});
		Schema::table('produit', function(Blueprint $table) {
			$table->dropForeign('produit_reduction_id_foreign');
		});
		Schema::table('article', function(Blueprint $table) {
			$table->dropForeign('article_produit_id_foreign');
		});
		Schema::table('image', function(Blueprint $table) {
			$table->dropForeign('image_article_id_foreign');
		});
		Schema::table('sousCategorie', function(Blueprint $table) {
			$table->dropForeign('sousCategorie_categorie_id_foreign');
		});
		Schema::table('ligneCommande', function(Blueprint $table) {
			$table->dropForeign('ligneCommande_commande_id_foreign');
		});
		Schema::table('ligneCommande', function(Blueprint $table) {
			$table->dropForeign('ligneCommande_produit_id_foreign');
		});
		Schema::table('ligneCommande', function(Blueprint $table) {
			$table->dropForeign('ligneCommande_profile_id_foreign');
		});
		Schema::table('color_article', function(Blueprint $table) {
			$table->dropForeign('color_article_color_id_foreign');
		});
		Schema::table('color_article', function(Blueprint $table) {
			$table->dropForeign('color_article_article_id_foreign');
		});
		Schema::table('matiere_article', function(Blueprint $table) {
			$table->dropForeign('matiere_article_article_id_foreign');
		});
		Schema::table('matiere_article', function(Blueprint $table) {
			$table->dropForeign('matiere_article_matiere_id_foreign');
		});
		Schema::table('wishlist', function(Blueprint $table) {
			$table->dropForeign('wishlist_produit_id_foreign');
		});
		Schema::table('wishlist', function(Blueprint $table) {
			$table->dropForeign('wishlist_profile_id_foreign');
		});
		Schema::table('compare', function(Blueprint $table) {
			$table->dropForeign('compare_produit_id_foreign');
		});
		Schema::table('compare', function(Blueprint $table) {
			$table->dropForeign('compare_profile_id_foreign');
		});
		Schema::table('avis', function(Blueprint $table) {
			$table->dropForeign('avis_profile_id_foreign');
		});
		Schema::table('avis', function(Blueprint $table) {
			$table->dropForeign('avis_produit_id_foreign');
		});
		Schema::table('tarif', function(Blueprint $table) {
			$table->dropForeign('tarif_typeLivraison_id_foreign');
		});
		Schema::table('tarif', function(Blueprint $table) {
			$table->dropForeign('tarif_ville_id_foreign');
		});
		Schema::table('paiement', function(Blueprint $table) {
			$table->dropForeign('paiement_profile_id_foreign');
		});
		Schema::table('paiement', function(Blueprint $table) {
			$table->dropForeign('paiement_commande_id_foreign');
		});
		Schema::table('livraison', function(Blueprint $table) {
			$table->dropForeign('livraison_typeLivraison_id_foreign');
		});
		Schema::table('livraison', function(Blueprint $table) {
			$table->dropForeign('livraison_commande_id_foreign');
		});
		Schema::table('role_user', function(Blueprint $table) {
			$table->dropForeign('role_user_role_id_foreign');
		});
		Schema::table('role_user', function(Blueprint $table) {
			$table->dropForeign('role_user_user_id_foreign');
		});
	}
}