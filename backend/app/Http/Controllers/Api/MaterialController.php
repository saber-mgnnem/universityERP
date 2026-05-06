<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MaterialProgress;

class MaterialController extends Controller
{
public function markDone($id, Request $request)
{
    $user = auth()->user();

    $progress = MaterialProgress::updateOrCreate(
        [
            'user_id' => $user->id,
            'course_material_id' => $id,
        ],
        [
            'is_completed' => true
        ]
    );

    return response()->json([
        'message' => 'Material marked as completed',
        'data' => $progress
    ]);

}

public function getCompleted()
{
    $user = auth()->user();

    $completed = MaterialProgress::where('user_id', $user->id)
        ->where('is_completed', true)
        ->pluck('course_material_id'); // return only IDs

    return response()->json($completed);
}
}
