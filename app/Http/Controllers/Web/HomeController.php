<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\HomePageData;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Home', HomePageData::make());
    }
}
