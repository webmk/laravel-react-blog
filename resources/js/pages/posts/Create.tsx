import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useForm } from '@inertiajs/react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from '@/components/ui/checkbox';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/post/create',
    },
];

export default function Create({ categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        category: '',
        image: ''
    })

    const toggleCategory = (id) => {
        if (data.category.includes(id)) {
            setData('category', data.category.filter(item => item !== id));
        } else {
            setData('category', [...data.category, id]);
        }
    };

    const getLabel = () => {
        if (data.category.length === 0) return "Select categories";
        const names = categories
            .filter(cat => data.category.includes(cat.id))
            .map(cat => cat.name);
        return names.join(", ");
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        post(route('post.store'),{
            forceFormData: true,
        });
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 w-6/12">
                <form onSubmit={handleFormSubmit}>
                    <div className='mt-2'>
                        <Label>Title</Label>
                        <Input placeholder='Enter Title' value={data.title} onChange={(e) => setData('title', e.target.value)}></Input>
                    </div>
                    <div className='mt-2'>
                        <Label>Category</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-start text-left">
                                    {getLabel()}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] max-h-60 overflow-auto">
                                <div className="flex flex-col gap-2">
                                    {categories.map((category) => (
                                        <label key={category.id} className="flex items-center gap-2">
                                            <Checkbox
                                                checked={data.category.includes(category.id)}
                                                onCheckedChange={() => toggleCategory(category.id)}
                                            />
                                            <span>{category.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='mt-2'>
                        <Label>Description</Label>
                        <Textarea placeholder='Enter description' value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <div className='mt-2'>
                    <Label>Image Upload</Label>
                    <Input type='file' name='image' onChange={(e)=>setData('image', e.target.files[0])} />
                    </div>
                    <div className='mt-2'>
                        <Button type='submit'>Save</Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}