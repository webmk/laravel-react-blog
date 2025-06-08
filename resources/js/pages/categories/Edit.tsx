import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category/edit',
    },
];

export default function Edit({cate}) {
    const {data, setData, put} = useForm({
        name: cate.name || '',
        description: cate.description || ''
    })

    const handleupdate = (e) => {
        e.preventDefault();
        put(route('category.update', cate.id));
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <div className="flex-col gap-4 rounded-xl p-4 w-8/12">
                <form onSubmit={handleupdate}>
                    <Label>Name</Label>
                    <Input value={data.name} onChange={(e)=>setData('name',e.target.value)}/>
                    <Label>Description</Label>
                    <Input value={data.description} onChange={(e)=>setData('description',e.target.value)}/>
                    <Button type='submit'>Update</Button>
                </form>
            </div>
        </AppLayout>
    );
}