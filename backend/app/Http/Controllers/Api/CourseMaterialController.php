<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CourseMaterial;
use Illuminate\Support\Facades\Auth;

class CourseMaterialController extends Controller
{


    // 📌 GET materials for a course offering (professor view)
    public function index($offeringId)
    {
        return CourseMaterial::where('course_offering_id', $offeringId)
            ->orderBy('week_number')
            ->orderBy('display_order')
            ->get();
    }

     public function studentindex($offeringId)
    {
        return CourseMaterial::where('course_offering_id', $offeringId)
            ->where('is_active', true)
            ->orderBy('week_number')
            ->orderBy('display_order')
            ->get();
    }

    // 📌 STORE new material
    public function store(Request $request)
    {
        $request->validate([
            'course_offering_id' => 'required|exists:course_offerings,id',
            'material_title' => 'required|string',
            'material_type' => 'required|string',
        ]);

        $material = CourseMaterial::create([
            'course_offering_id' => $request->course_offering_id,
            'material_title' => $request->material_title,
            'material_type' => $request->material_type,
            'material_description' => $request->material_description,
            'file_url' => $request->file_url,
            'external_link_url' => $request->external_link_url,
            'uploaded_by' => Auth::id(),
            'upload_date' => now(),
            'is_required_reading' => $request->is_required_reading ?? false,
            'week_number' => $request->week_number,
            'display_order' => $request->display_order,
            'is_active' => true,
        ]);

        return response()->json($material, 201);
    }

    // 📌 UPDATE material
    public function update(Request $request, $id)
    {
        $material = CourseMaterial::findOrFail($id);

        $material->update($request->only([
            'material_title',
            'material_type',
            'material_description',
            'file_url',
            'external_link_url',
            'is_required_reading',
            'week_number',
            'display_order',
            'is_active',
        ]));

        return response()->json($material);
    }

    // 📌 DELETE material
    public function destroy($id)
    {
        CourseMaterial::findOrFail($id)->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}