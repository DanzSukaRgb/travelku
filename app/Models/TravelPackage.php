<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TravelPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'destination_id',
        'title',
        'slug',
        'summary',
        'description',
        'duration_days',
        'group_size',
        'price',
        'discount_price',
        'thumbnail',
        'gallery',
        'highlights',
        'inclusions',
        'itinerary',
        'featured_badge',
        'is_featured',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'discount_price' => 'decimal:2',
            'gallery' => 'array',
            'highlights' => 'array',
            'inclusions' => 'array',
            'itinerary' => 'array',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ];
    }

    public function destination(): BelongsTo
    {
        return $this->belongsTo(Destination::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'travel_package_id');
    }

    public function getDisplayPriceAttribute(): string
    {
        return number_format((float) ($this->discount_price ?: $this->price), 0, ',', '.');
    }
}
