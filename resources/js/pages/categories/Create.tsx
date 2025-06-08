import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category/create',
    },
];

export default function Create() {
    const {data, setData, post} = useForm({
        name: '',
        description: ''
    });
    const handleformsubmit = (e) => {
        e.preventDefault();
        post(route('category.store'));
        
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 w-8/12">
                <form onSubmit={handleformsubmit}>
                    <Label>Category</Label>
                    <Input placeholder='Enter category' value={data.name} onChange={(e)=>{setData('name',e.target.value)}}/>
                    <Label>Description</Label>
                    <Input placeholder='Enter Description' value={data.description} onChange={(e)=>{setData('description',e.target.value)}}/>
                    <Button type='submit'>Save</Button>
                </form>
            </div>
        </AppLayout>
    );
}