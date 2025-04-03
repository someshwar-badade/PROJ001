<?php 
namespace App\Http\Controllers;

use App\Models\CompanyJob;
use App\Models\CompanyJobImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CompanyJobController extends Controller {
    public function index(): Response {
        $jobs = CompanyJob::with('company', 'images')->get();
        return Inertia::render('CompanyJobs/Index', ['jobs' => $jobs]);
    }

    public function create(): Response {
        return Inertia::render('CompanyJobs/Create');
    }

    public function store(Request $request) {
        $request->validate([
            'job_name' => 'required',
            'dimensions' => 'required|string',
            'job_url' => 'nullable|url',
            'description' => 'nullable|string',
            'images.*' => 'image|max:2048',
        ]);

        $job = CompanyJob::create($request->only(['company_id','job_name', 'dimensions', 'job_url', 'description']));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('jobs', 'public');
                CompanyJobImage::create(['client_job_id' => $job->id, 'url' => $path]);
            }
        }

        return redirect()->route('company_jobs.index');
    }

    public function show(CompanyJob $companyJob): Response {
        return Inertia::render('CompanyJobs/Show', ['job' => $companyJob->load('images')]);
    }

    public function edit(CompanyJob $companyJob): Response {
        return Inertia::render('CompanyJobs/Edit', ['job' => $companyJob]);
    }

    /**
     * Update the specified company in the database.
     */
    public function update(Request $request, CompanyJob $companyJob)
    {
        $validated = $request->validate([
            'job_name' => 'required|string',
            'dimensions' => 'required|string',
            'job_url' => 'nullable|url',
            'description' => 'nullable|string',
        ]);

        $companyJob->update($validated);

        return redirect()->route('company_jobs.index')->with('success', 'Job updated successfully.');
    }
}