<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreTravelPackageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return (bool) $this->user()?->is_admin;
    }

    public function rules(): array
    {
        return [
            'destination_id' => ['required', 'exists:destinations,id'],
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', Rule::unique('travel_packages', 'slug')->ignore($this->route('travelPackage'))],
            'summary' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'duration_days' => ['required', 'integer', 'min:1', 'max:30'],
            'group_size' => ['required', 'integer', 'min:1', 'max:30'],
            'price' => ['required', 'numeric', 'min:0'],
            'discount_price' => ['nullable', 'numeric', 'min:0'],
            'thumbnail' => ['required', 'url'],
            'gallery' => ['nullable', 'array'],
            'gallery.*' => ['url'],
            'highlights' => ['nullable', 'array'],
            'highlights.*' => ['string', 'max:255'],
            'inclusions' => ['nullable', 'array'],
            'inclusions.*' => ['string', 'max:255'],
            'itinerary' => ['nullable', 'array'],
            'itinerary.*.title' => ['required_with:itinerary', 'string', 'max:255'],
            'itinerary.*.description' => ['required_with:itinerary', 'string'],
            'featured_badge' => ['nullable', 'string', 'max:80'],
            'is_featured' => ['nullable', 'boolean'],
            'is_active' => ['nullable', 'boolean'],
        ];
    }
}
