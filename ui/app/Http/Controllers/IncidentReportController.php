<?php

namespace App\Http\Controllers;

use App\Models\IncidentReport;
use Illuminate\Http\Request;

class IncidentReportController extends Controller
{
    // Get all reports
    public function index()
    {
        return IncidentReport::all();
    }

    // Store a new report
    public function store(Request $request)
{
    $data = $request->validate([
        'studentId'   => 'required',
        'studentName' => 'required',
        'incident'    => 'required|string',
        'fine'        => 'required|numeric',
        'deposit'     => 'required|numeric',
        'date'        => 'required|date',
        'verifiedBy'  => 'nullable|string',
        'status'      => 'required|string',
        'proof'       => 'nullable|file|mimes:jpg,png,pdf|max:2048',
    ]);

    if ($request->hasFile('proof')) {
        $data['proofUrl'] = $request->file('proof')->store('proofs', 'public');
    }

    // calculate remaining server‐side if you like
    $data['remaining'] = $data['deposit'] - $data['fine'];

    $report = IncidentReport::create($data);
    return response()->json($report, 201);
}

    // Update a specific report
    public function update(Request $request, $id)
    {
        $report = IncidentReport::findOrFail($id);

        $data = $request->validate([
            'studentId' => 'sometimes|required',
            'studentName' => 'sometimes|required',
            'fine' => 'sometimes|required|numeric',
            'deposit' => 'sometimes|required|numeric',
            'remaining' => 'sometimes|required|numeric',
            'date' => 'sometimes|required|date',
            'status' => 'sometimes|required|string'
        ]);

        $report->update($data);

        return response()->json([
            'message' => 'Report updated successfully',
            'report' => $report
        ]);
    }

    // Delete a report
    public function destroy($id)
    {
        $report = IncidentReport::findOrFail($id);
        $report->delete();

        return response()->json(['message' => 'Report deleted successfully']);
    }
}
