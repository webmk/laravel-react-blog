<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('categories')->paginate(5);
        return Inertia::render('posts/Index', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('posts/Create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'category' => 'required',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,png|max:2048',
        ]);

        if($request->has('image')){
            $path = $request->file('image')->store('posts', 'public');
        }
        $post = Post::create([
            'title' => $request->title,
            'description' => $request->description,
            'image' => $path,
        ]);
        $post->categories()->attach($validated['category']);
        return redirect()->route('post.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post, $id)
    {
        
        $post = Post::findOrFail($id);
        return Inertia::render('posts/Edit', [
            'posts' => $post->load('categories'),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
       $validated = $request->validate([
            'title' => 'required',
            'category' => 'array',
            'description' => 'required',
            'category.*' => 'exists:categories,id',
        ]);

        $post = Post::findOrFail($id);
        $post->update($request->except('category'));
        $post->categories()->sync($validated['category']);

        return to_route('post.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Post::destroy($id);

        return redirect()->back();
    }
}
