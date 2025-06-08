<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title',
        'category',
        'description',
        'image',
    ];

    public function categories(){
        return $this->belongsToMany(Category::class);
    }
}
