import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useForm } from '@inertiajs/react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/post/edit',
    },
];

export default function Edit({ posts, categories }) {
    const [selectedCategories, setSelectedCategories] = useState(
        posts.categories.map((cat) => String(cat.id))
    );
    const { data, setData, put, processing, errors } = useForm({
    title: posts.title || '',
    category: selectedCategories || '',
    description: posts.description || '',
    })

    useEffect(() => {
        setData("category", selectedCategories); // keep form data in sync
    }, [selectedCategories]);

    const toggleCategory = (id) => {
        setSelectedCategories((prev) =>
            prev.includes(id)
                ? prev.filter((c) => c !== id)
                : [...prev, id]
        );
    };
    console.log(posts);
    const handleFormSubmit = (e) => {
        e.preventDefault();
        put(route('post.update', posts.id));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 w-6/12">
                <form onSubmit={handleFormSubmit}>
                    <div className='mt-2'>
                    <Label>Title</Label>
                    <Input placeholder='Enter Title' value={data.title} onChange={(e)=>setData('title', e.target.value)}></Input>
                    </div>
                    <div className='mt-2'>
                    <Label>Category</Label>
                    <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-[180px] justify-start text-left"
                                >
                                    {selectedCategories.length > 0
                                        ? categories
                                              .filter((cat) =>
                                                  selectedCategories.includes(
                                                      String(cat.id)
                                                  )
                                              )
                                              .map((c) => c.name)
                                              .join(", ")
                                        : "Select Categories"}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px]">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center gap-2 py-1"
                                    >
                                        <Checkbox
                                            id={`cat-${category.id}`}
                                            checked={selectedCategories.includes(
                                                String(category.id)
                                            )}
                                            onCheckedChange={() =>
                                                toggleCategory(
                                                    String(category.id)
                                                )
                                            }
                                        />
                                        <Label htmlFor={`cat-${category.id}`}>
                                            {category.name}
                                        </Label>
                                    </div>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='mt-2'>
                    <Label>Description</Label>
                    <Textarea placeholder='Enter description' value={data.description} onChange={(e)=>setData('description', e.target.value)}></Textarea>
                    </div>
                    <div className='mt-2'>
                        <Button type='submit'>Update</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}