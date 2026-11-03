<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Filiere;
use Illuminate\Http\Request;

class PublicController extends Controller
{
    public function getFilieres()
    {
        return response()->json(Filiere::where('active', true)->get());
    }
}
