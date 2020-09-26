<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class SPAController extends Controller
{
    //
    public function serve(Request $request) {

        $request_token = md5($request->fullUrl() . json_encode($request->all()));

        $html = Cache::remember('spa-' . $request_token, 600, function() use ($request) {
            $index = public_path($request->path() . '/index.html');

            if (!file_exists($index)) {
                $index = public_path('index.html');
            }

            return file_get_contents($index);
        });

        return response($html);
    }
}
