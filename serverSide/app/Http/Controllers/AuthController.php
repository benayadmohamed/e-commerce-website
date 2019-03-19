<?php


namespace App\Http\Controllers;

use App\Http\Requests\loginRequest;
use App\Http\Requests\SignUpRequest;
use App\models\Adresse;
use App\models\Profile;
use App\Role;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'loginWithGoogle', 'loginWithFacebook', 'signup']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @param loginRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(loginRequest $request)
    {
        //$credentials = request(['email', 'password']);
        $credentials = $request->only('email', 'password');
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'false'], 401);
        }

        return $this->respondWithToken($token);
    }

    private function login2($user)
    {
        $credentials = ['email' => $user->email, 'password' => ''];
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'false'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function loginWithGoogle(Request $request)
    {
        $input = $request->all();
        $token = $input['token'];


        $client = new \Google_Client(['client_id' => env('GOOGLE_CLIENT_ID')]);
        $payload = $client->verifyIdToken($token);
        if ($payload) {
            $userid = $payload['sub'];
            $user = User::where('sub', $userid)->first();
            if ($user) {
                $user->password = '';
                $user->save();
                $u = $this->login2($user);
            } else {
                $user = new User();
                $user->name = $payload['name'];
                $user->email = $payload['email'];
                $user->password = '';
                $user->sub = $payload['sub'];
                $user->save();
                $u = $this->login2($user);
                $role_client = Role::where('name', 'client')->first();
                auth()->user()->roles()->attach($role_client);
                $profile = new Profile();
                $profile->type = 'client';
                auth()->user()->profile()->save($profile);
                $adresse = new Adresse();
                $adresse->type = 'pro';
                $adresse2 = new Adresse();
                $adresse2->type = 'per';
                $profile = auth()->user()->profile()->first();
                $profile->adresses()->save($adresse);
                $profile->adresses()->save($adresse2);
            }

            return $u;
        } else {
            return response()->json(['error' => 'false'], 401);
        }
    }

    public function loginWithFacebook(Request $request)
    {
        $input = $request->all();
        $token = $input['token'];

        try {
            $fb = new \Facebook\Facebook([
                'app_id' => env('FACEBOOK_APP_ID'),
                'app_secret' => env('FACEBOOK_app_secret'),
                'default_graph_version' => env('FACEBOOK_default_graph_version'),
            ]);
            $fbresponse = $fb->get('/me?fields=id,name,email', $token);
            $me = $fbresponse->getGraphUser();
            $userId = $me->getId();
            $user = User::where('sub', $userId)->first();
            if ($user) {
                $user->password = '';
                $user->save();
                $u = $this->login2($user);
            } else {
                $user = new User();
                $user->name = $me['name'];
                $user->email = $me->getEmail();
                $user->password = '';
                $user->sub = $me->getId();
                $user->save();
                $u = $this->login2($user);
                $role_client = Role::where('name', 'client')->first();
                auth()->user()->roles()->attach($role_client);
                $profile = new Profile();
                $profile->type = 'client';
                auth()->user()->profile()->save($profile);
                $adresse = new Adresse();
                $adresse->type = 'pro';
                $adresse2 = new Adresse();
                $adresse2->type = 'per';
                $profile = auth()->user()->profile()->first();
                $profile->adresses()->save($adresse);
                $profile->adresses()->save($adresse2);
            }

            return $u;
            // return response()->json($me['name'], 401);

        } catch (\Facebook\Exceptions\FacebookResponseException $e) {
            //Handle this error, return a failed request to the app with either 401 or 500
            return response()->json(['error' => 'false'], 401);
        } catch (\Facebook\Exceptions\FacebookSDKException $e) {
            //Handle this error, return a 500 error – something is wrong with your code
            return response()->json(['error' => 'false'], 500);
        }
    }

    public function signup(SignUpRequest $request)
    {
        try {
            User::create($request->all());
            $u = $this->login($request);
            $role_client = Role::where('name', 'client')->first();
            auth()->user()->roles()->attach($role_client);
            $profile = new Profile();
            $profile->type = 'client';
            auth()->user()->profile()->save($profile);
            $adresse = new Adresse();
            $adresse->type = 'pro';
            $adresse2 = new Adresse();
            $adresse2->type = 'per';
            $profile = auth()->user()->profile()->first();
            $profile->adresses()->save($adresse);
            $profile->adresses()->save($adresse2);
            //printf("slamm");
            return $u;

        } catch (Exception $e) {
            report($e);

            return $e;
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(User::with(['profile.adresses'])->find(auth()->user()->id));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'true']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        $roles = null;
        if (isset(auth()->user()->roles[0])) {
            $roles = array_map(function ($v) {
                return $v->name;
            }, array(auth()->user()->roles[0]));
        }
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()->name,
            'roles' => $roles
        ]);
    }
}