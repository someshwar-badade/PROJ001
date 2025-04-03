<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyJobImage extends Model {
    use HasFactory;
    
    protected $fillable = ['client_job_id', 'url'];

    public function job(): BelongsTo {
        return $this->belongsTo(CompanyJob::class, 'client_job_id');
    }
}