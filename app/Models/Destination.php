<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Destination extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'country',
        'tagline',
        'description',
        'hero_image',
        'base_price',
        'rating',
        'is_featured',
    ];

    protected function casts(): array
    {
        return [
            'base_price' => 'decimal:2',
            'rating' => 'decimal:1',
            'is_featured' => 'boolean',
        ];
    }

    public function packages(): HasMany
    {
        return $this->hasMany(TravelPackage::class);
    }
}
