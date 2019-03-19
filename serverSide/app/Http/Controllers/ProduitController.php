<?php

namespace App\Http\Controllers;

use App\models\Article;
use App\models\Image;
use App\models\Produit;
use App\myRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProduitController extends Controller
{

    public function __construct()
    {
        $this->middleware(['auth:api', 'admin'], ['except' => ['getById', 'get', 'getByListId', 'getNewArivale', 'getOnSale', 'getByListIdWithoutPaginator']]);
    }

    //
    public function getById($id)
    {
        $v = Produit::with(["categorie", "categorie.sousCategories", "article.images", "article.colors", "article.matieres"])->find($id);
        if ($v == null)
            return null;
        return response()->json($v);
        // return response()->json($request);
    }


    public function getProduitsCompare(Request $request)
    {

    }

    public function getByListIdWithoutPaginator(Request $request)
    {
        $input = $request->all();
        $arr = explode(', ', $input['id']);
        return response()->json(Produit::whereIn('id', $arr)->with(["categorie", "categorie.sousCategories", "article.images", "article.colors", "article.matieres", "reduction"])->get());
    }

    public function getByName(Request $request)
    {
        return response()->json(Produit::where('name', 'like', $request->name . '%')->with(["article.images"])->paginate($request->perPage));
    }

    public function getByListId(Request $request)
    {
        $input = $request->all();
        $arr = explode(', ', $input['id']);
        return response()->json(Produit::whereIn('id', $arr)->with(["categorie", "categorie.sousCategories", "article.images", "article.colors", "article.matieres", "reduction"])->paginate($request->perPage));
    }

    public function getNewArivale(Request $request)
    {
        $input = $request->all();
        return response()->json(Produit::where('created_at', '>', Carbon::now()->subDays(30))->with(["categorie", "categorie.sousCategories", "article.images", "article.colors", "article.matieres", "reduction"])->paginate($request->perPage));
    }

    public function getOnSale(Request $request)
    {
        $input = $request->all();
        return response()->json(Produit::whereHas('reduction')->with(["categorie", "categorie.sousCategories", "article.images", "article.colors", "article.matieres", "reduction"])->paginate($request->perPage));
    }

    public function get(Request $request)
    {
        $input = $request->all();


        /*    return response()->json(Produit::whereHas('categorie', function ($query) use ($input) {
                if (isset($input['categorie_id']) && !empty($input['categorie_id']))
                    $query->where('id', $input['categorie_id']);
            })->whereHas('categorie.sousCategories', function ($query) use ($input) {
                if (isset($input['sousCategorie_id']) && !empty($input['sousCategorie_id']))
                    $query->where('id', $input['sousCategorie_id']);
            })->whereHas('article.colors', function ($query) use ($input) {
                if (isset($input['colors_id']) && !empty($input['colors_id'])) {
                    $arr = explode(', ', $input['colors_id']);
                    $query->whereIn('id', $arr);
                }
            })->whereHas('article.matieres', function ($query) use ($input) {
                if (isset($input['matieres_id']) && !empty($input['matieres_id'])) {
                    $arr = explode(', ', $input['matieres_id']);
                    $query->whereIn('id', $arr);
                }
            })->with(["categorie", "categorie.sousCategories", "article.images", "article.colors", "article.matieres"])->paginate($request->perPage));
        */
        /*     return response()->json(Produit::whereHas('categorie', function ($query) use ($input) {
                 if (isset($input['categorie_id']) && !empty($input['categorie_id']))
                     $query->where('id', $input['categorie_id']);
                 if (isset($input['sousCategorie_id']) && !empty($input['sousCategorie_id'])) {
                     $query->whereHas('sousCategories', function ($query4) use ($input) {
                         $query4->where('id', $input['sousCategorie_id']);
                     });
                 }
             })->whereHas('article', function ($query) use ($input) {

                 if (isset($input['colors_id']) && !empty($input['colors_id'])) {
                     $query->whereHas('colors', function ($query2) use ($input) {
                         $arr = explode(', ', $input['colors_id']);
                         $query2->whereIn('color.id', $arr);
                     });
                 }
                 if (isset($input['matieres_id']) && !empty($input['matieres_id'])) {
                     $query->whereHas('matieres', function ($query3) use ($input) {
                         $arr = explode(', ', $input['matieres_id']);
                         $query3->whereIn('matiere.id', $arr);
                     });
                 }
             })->whereBetween('prix', [$input['prixFrom'], $input['prixTo']])->with(["categorie", "categorie.sousCategories", "article.images", "article.colors", "article.matieres"])->paginate($request->perPage));*/
        $prod = Produit::whereHas('categorie', function ($query) use ($input) {
            if (isset($input['categorie_id']) && !empty($input['categorie_id']))
                $query->where('id', $input['categorie_id']);
            if (isset($input['sousCategorie_id']) && !empty($input['sousCategorie_id'])) {
                $query->whereHas('sousCategories', function ($query4) use ($input) {
                    $query4->where('id', $input['sousCategorie_id']);
                });
            }
        })->whereHas('article', function ($query) use ($input) {
//            $query->where('stock', '>', 0);
            if (isset($input['colors_id']) && !empty($input['colors_id'])) {
                $query->whereHas('colors', function ($query2) use ($input) {
                    $arr = explode(', ', $input['colors_id']);
                    $query2->whereIn('color.id', $arr);
                });
            }
            if (isset($input['matieres_id']) && !empty($input['matieres_id'])) {
                $query->whereHas('matieres', function ($query3) use ($input) {
                    $arr = explode(', ', $input['matieres_id']);
                    $query3->whereIn('matiere.id', $arr);
                });
            }
        });
        if (isset($input['prixFrom']) && !empty($input['prixFrom'])) {
            $prod->whereBetween('prix', [$input['prixFrom'], $input['prixTo']]);
        }
        return response()->json($prod->with(["categorie", "categorie.sousCategories", "article.images", "article.colors", "article.matieres", "reduction"])->paginate($request->perPage));

//        return response()->json(explode(', ', $input['colors_id']));
    }

    public function update(Request $request)
    {
        $input = $request->all();
        $article = Article::findOrFail($input['article']['id']);
        $article->init2($input['article']);
        if (isset($input['article']['colors']))
            $colors = $input['article']['colors'];
        if (isset($input['article']['matieres']))
            $matieres = $input['article']['matieres'];
        $produit = Produit::findOrFail($input['id']);
        $produit->init2($input);
        $produit->id = $input['id'];
        $produit->save();

        $article->produit()->associate($produit);
        $article->save();
        if (isset($input['article']['colors']))
            $article->colors()->sync($colors);
        if (isset($input['article']['matieres']))
            $article->matieres()->sync($matieres);
        if (isset($input['article']['images'])) {
            $images = $input['article']['images'];
            foreach ($images as $image) {
                if (!isset($image['id']) || empty($image['id'])) {
                    $img = new Image();
                    $article->images()->save($img);
                    $tmp = explode('.', $image['name']);
                    $name = 'Img' . $img->id . '_' . $article->id . '_name' . '.' . end($tmp);
                    $img->src = '/storage/ArticleImages/' . $name;
                    $img->name = $name;
                    $img->save();
                    file_put_contents(storage_path("app/public/ArticleImages/") . '' . $name, base64_decode($image['value']));
                }
            }
        }
        return response()->json($article->id);
    }

    public function save(Request $request)
    {
        $input = $request->all();
        $article = Article::init($input['article']);
        $colors = $input['article']['colors'];
        $matieres = $input['article']['matieres'];


        $produit = Produit::init($input);
        $produit->save();

        $article->produit()->associate($produit);
        $article->save();

        $article->colors()->sync($colors);
        $article->matieres()->sync($matieres);

        if (isset($input['article']['images'])) {
            $images = $input['article']['images'];
            foreach ($images as $image) {
                $img = new Image();
                $article->images()->save($img);
                $tmp = explode('.', $image['name']);
                $name = 'Img' . $img->id . '_' . $article->id . '_name' . '.' . end($tmp);
                $img->src = '/storage/ArticleImages/' . $name;
                $img->name = $name;
                $img->save();
                file_put_contents(storage_path("app/public/ArticleImages/") . '' . $name, base64_decode($image['value']));

            }
        }
        return response()->json($article->id);
    }

    public function delete($id)
    {
        $produit = Produit::find($id);
        $article = $produit->article()->first();
        $images = $article->images()->get();
        DB::transaction(function () use ($images, $produit) {
            //
            if ($produit->delete()) {
                foreach ($images as $image) {
                    Storage::delete('public/ArticleImages/' . $image->name);
                }
            }
        });


        return response()->json(['message' => true]);
    }

    public function deleteImage($id, $name)
    {
        /* Storage::put('public/file2.txt', 'text');
         Storage::delete('public/file2.txt');*/
        Image::find($id)->delete();
        Storage::delete('public/ArticleImages/' . $name);
        return response()->json(['message' => true]);
    }
}
