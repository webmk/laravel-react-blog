import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];

export default function Index({ cates }) {
    const handleDelete = (id) => {
        if(confirm("Are you sure to delete this category?")){
        router.delete(route('category.delete', id));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category" />
            <div className="flex-col gap-4 rounded-xl p-4">
                <Link href={route('category.create')}><Button>Create</Button></Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cates.map((cate)=>(
                        <TableRow>
                        <TableCell className="font-medium">{cate.id}</TableCell>
                        <TableCell>{cate.name}</TableCell>
                        <TableCell>{cate.description}</TableCell>
                        <TableCell><Link href={route('category.edit', cate.id)}><Button>Edit</Button></Link>
                        <Button className='ml-2' onClick={()=>{handleDelete(cate.id)}}>Delete</Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </AppLayout>
    );
}