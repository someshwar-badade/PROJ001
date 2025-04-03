<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CompanyJob extends Model {
    use HasFactory;
    
    protected $fillable = ['company_id','job_name', 'dimensions', 'job_url', 'description'];

    public function company(): BelongsTo {
        return $this->belongsTo(Company::class);
    }

    public function images(): HasMany {
        return $this->hasMany(CompanyJobImage::class, 'client_job_id');
    }
}