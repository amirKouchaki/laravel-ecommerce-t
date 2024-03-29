<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required','email'],
            'password' => ['required'],
            'remember' => ['boolean']
        ]);
        $remember = $credentials['remember'];
        unset($credentials['remember']);

        if(!Auth::attempt($credentials,$remember))
            return response(['message' => 'Email or password is wrong'],422);

        /** @var User $user */
        $user = \auth()->user();

        if(!$user->is_admin){
            Auth::logout();
            return response(['message' => 'You don\'t have permission to authenticate as admin'],403);
        }

        $token = $user->createToken('main')->plainTextToken;
        return response([
            'user' => new UserResource($user),
            'token' => $token
        ]);
    }

    public function logout(){
        /** @var User $user */
        $user = \auth()->user();
        $user->currentAccessToken()->delete();
        return response('',204);
    }

    public function getUser(Request $request){
        return new UserResource($request->user());
    }
}
