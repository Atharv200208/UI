<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IncidentReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'studentId',
        'studentName',
        'incident',
        'fine',
        'deposit',
        'remaining',
        'date',
        'verifiedBy',
        'status',
        'proofUrl',
    ];
}
