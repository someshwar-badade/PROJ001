<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Role;
use App\Models\Company;

use App\Models\PhoneNumber;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function users(Request $request)
    {    
        // Retrieve users with related data (phoneNumbers, roles, and companies)
        $users = User::select('id', 'name', 'email')
            ->with(['phoneNumbers', 'roles', 'companies'])
            ->paginate(10)
            ->withQueryString(); // Keeps pagination query parameters
    
        // Fetch roles and companies using Eloquent (instead of DB::table)
        $roles = Role::all();
        $companies = Company::all();
    
        // Return data to Inertia
        return Inertia::render('usersManage/users', [
            'users' => $users, 
            'roles' => $roles,
            'companies' => $companies, // Fixed naming for consistency
        ]);
    }
    

    public function addUser(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => [
            'required',
            'string',
            'lowercase',
            'email',
            'max:255',
            'unique:users,email',
            function ($attribute, $value, $fail) {
                if (!str_contains($value, '@') || !str_contains($value, '.')) {
                    $fail('The email must contain both "@" and "." characters.');
                }
             },
            ],
            'mobile' => 'required|digits:10|unique:phone_numbers,phone_number',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role_id' => 'required|array|min:1', // Multiple roles required
            'role_id.*' => 'exists:roles,id', // Each role must exist in roles table
            'company_id' => 'required|exists:companies,id', // Company must exist
        ]);

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'company_id' => $validated['company_id'],
                'password' => Hash::make($validated['password']),
            ]);

            PhoneNumber::create([
                'user_id' => $user->id,
                'phone_number' => $validated['mobile'],
            ]);

              // Attach roles in pivot table (user_roles)
              $user->roles()->attach($validated['role_id']); 
              $user->companies()->attach($validated['company_id']);

            event(new Registered($user));
        });

        return redirect()->back()->with('success', 'User added successfully');
    }

    public function editUser($userId)
{
    $user = User::with(['roles:id,name', 'companies:id,name']) // eager load
                ->find($userId);

    if (!$user) {
        return response()->json(['error' => 'User not found'], 404);
    }

    $mobileNumbers = PhoneNumber::where('user_id', $user->id)->get();

    $user->setAttribute('mobile', $mobileNumbers);

    return response()->json([
        'user' => $user,
        'mobile' => $mobileNumbers,
    ]);
}
    
    public function updateUser(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:users,id',
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (!str_contains($value, '@') || !str_contains($value, '.')) {
                        $fail('The email must contain both "@" and "." characters.');
                    }
                },
            ],
            'mobile' => 'nullable|digits:10|unique:phone_numbers,phone_number,' . $request->id . ',user_id',
            'role_id' => 'required|array|min:1', // Multiple roles required
            'role_id.*' => 'exists:roles,id', // Each role must exist in roles table
            'company_id' => 'required|exists:companies,id', // Company must exist
        ]);
 
        $user = User::find($request->id);
        if (!$user) {
            return redirect()->back()->with('error', 'No User Found.');
        }

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($request->password)) {
            $request->validate([
                'password' => ['required', 'confirmed', Rules\Password::defaults()],
            ]);
            $user->password = Hash::make($request->password);
        }
    
        $user->roles()->sync($validated['role_id']);
        $user->companies()->sync($validated['company_id']);

        // If single company (belongsTo):
        $user->company_id = $validated['company_id'];
        $user->save();


        if (!empty($request->mobile)) {
            PhoneNumber::Create(
                ['user_id' => $user->id, 
                'phone_number' => $request->mobile] 
            );
        }
    
        return redirect()->back()->with('success', 'User Updated Successfully.');
    }
    
    public function deleteUser($userId)
    {
        $user = User::find($userId);
        
        if (!$user) {
            return redirect()->back()->with('error', 'User not found.');
        }
    
        PhoneNumber::where('user_id', $userId)->delete();
    
        $user->delete();
    
        return redirect()->back()->with('success', 'User deleted successfully.');
    }
    
}
