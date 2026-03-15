<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactLeadRequest;
use App\Models\ContactLead;
use Illuminate\Http\JsonResponse;

class ContactLeadController extends Controller
{
    public function store(StoreContactLeadRequest $request): JsonResponse
    {
        $lead = ContactLead::create([
            ...$request->validated(),
            'source' => $request->input('source', 'website'),
            'status' => 'new',
        ]);

        return response()->json([
            'message' => 'Thanks, your message has been sent. We will reach out soon.',
            'data' => $lead,
        ], 201);
    }
}
