<?php


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([

    'middleware' => 'api',

], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('loginWithGoogle', 'AuthController@loginWithGoogle');
    Route::post('loginWithFacebook', 'AuthController@loginWithFacebook');
    Route::post('signup', 'AuthController@signup');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');

    Route::post('sendRestPasswordLink', 'RestPasswordController@sendMail');
    Route::post('resetPassword', 'RestPasswordController@process');
    Route::get('me', 'AuthController@me');

    Route::get('GInfoSite', 'InfoSiteController@get');
    Route::put('UInfoSite', 'InfoSiteController@update');

    Route::get('GAR', 'RegionController@getRegions');
    Route::put('UR', 'RegionController@update');
    Route::post('SR', 'RegionController@save');
    Route::delete('DR/{id}', 'RegionController@delete');

    Route::get('GACAT', 'categorieController@getCategories');
    Route::put('UCAT', 'categorieController@update');
    Route::post('SCAT', 'categorieController@save');
    Route::delete('DCAT/{id}', 'categorieController@delete');

    Route::get('GASCAT', 'SousCategorieController@getSousCategories');
    Route::put('USCAT', 'SousCategorieController@update');
    Route::post('SSCAT', 'SousCategorieController@save');
    Route::delete('DSCAT/{id}', 'SousCategorieController@delete');

    Route::get('GAMAR', 'MarqueController@getMarques');
    Route::put('UMAR', 'MarqueController@update');
    Route::post('SMAR', 'MarqueController@save');
    Route::delete('DMAR/{id}', 'MarqueController@delete');

    Route::get('GAPRODBID/{id}', 'ProduitController@getById');
    Route::get('GAPRODBLID', 'ProduitController@getByListId');
    Route::get('GAPRODNA', 'ProduitController@getNewArivale');
    Route::get('GAPRODOS', 'ProduitController@getOnSale');
    Route::get('GAPRODBN', 'ProduitController@getByName');
    Route::get('GAPRODBLIDWP', 'ProduitController@getByListIdWithoutPaginator');
    Route::get('GAPROD', 'ProduitController@get');
    Route::put('UPROD', 'ProduitController@update');
    Route::post('SPROD', 'ProduitController@save');
    Route::delete('DPROD/{id}', 'ProduitController@delete');
    Route::delete('DIPROD/{id}/{name}', 'ProduitController@deleteImage');

    Route::get('GACOL', 'ColorController@getColors');
    Route::put('UCOL', 'ColorController@update');
    Route::post('SCOL', 'ColorController@save');
    Route::delete('DCOL/{id}', 'ColorController@delete');


    Route::get('GARED', 'reductionController@get');
    Route::put('URED', 'reductionController@update');
    Route::post('SRED', 'reductionController@save');
    Route::delete('DRED/{id}', 'reductionController@delete');

    Route::get('GACMDA', 'CommandeAdminController@get');
    Route::put('UCMDA', 'CommandeAdminController@update');
    Route::delete('DCMDA/{id}', 'CommandeAdminController@delete');
    Route::get('GCMDA/{id}', 'CommandeAdminController@getById');


    Route::get('GACMD', 'CommandeController@get');
    Route::post('SCMD', 'CommandeController@saveCash');

    Route::get('GATL', 'typeLivraisonController@get');
    Route::put('UTL', 'typeLivraisonController@update');
    Route::post('STL', 'typeLivraisonController@save');
    Route::delete('DTL/{id}', 'typeLivraisonController@delete');

    Route::get('GACT', 'ActualiteController@get');
    Route::get('GAACT', 'ActualiteController@getAll');
    Route::put('UACT', 'ActualiteController@update');
    Route::post('SACT', 'ActualiteController@save');
    Route::delete('DACT/{id}', 'ActualiteController@delete');

    Route::get('GATAR/{id}', 'tarifController@get');
    Route::get('GTAR', 'tarifController@get2');
    Route::put('UTAR', 'tarifController@update');
    Route::post('STAR', 'tarifController@save');
    Route::delete('DTAR/{id}', 'tarifController@delete');


    Route::get('GAPWL', 'wishlistController@get');
    Route::post('SPWL', 'wishlistController@save');
    Route::post('SPUWL', 'wishlistController@save2');
    Route::delete('DPWL/{id}', 'wishlistController@delete');
    Route::delete('DAPWL', 'wishlistController@deleteAll');

    Route::get('GAPCOM', 'compareController@get');
    Route::post('SPCOM', 'compareController@save');
    Route::post('SPUCOM', 'compareController@save2');
    Route::delete('DPCOM/{id}', 'compareController@delete');
    Route::delete('DAPCOM', 'compareController@deleteAll');

    Route::get('GAPSC', 'shoppingCartController@get');
    Route::post('SPSC', 'shoppingCartController@save');
    Route::put('UPSC', 'shoppingCartController@update');
    Route::delete('DPSC/{id}', 'shoppingCartController@delete');
    Route::delete('DAPSC', 'shoppingCartController@deleteAll');


    Route::get('GAMAT', 'MatiereController@getMatieres');
    Route::put('UMAT', 'MatiereController@update');
    Route::post('SMAT', 'MatiereController@save');
    Route::delete('DMAT/{id}', 'MatiereController@delete');


    Route::get('GAV', 'VilleController@getVilles');
    Route::put('UV', 'VilleController@update');
    Route::post('SV', 'VilleController@save');
    Route::delete('DV/{id}', 'VilleController@delete');

    Route::get('GP', 'ProfileController@get');
    Route::put('UP', 'ProfileController@update');
    Route::post('CHP', 'ProfileController@changePassword');


    Route::post('SC', 'contactController@sendContact');

    Route::get('GA', 'AdresseController@get');
    Route::get('GAPer', 'AdresseController@getAPer');
    Route::get('GAPro', 'AdresseController@getAPro');
    Route::put('UA', 'AdresseController@update');


});