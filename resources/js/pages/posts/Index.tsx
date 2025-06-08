import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/post',
    },
];

interface Posts {
    id: BigInteger,
    title: string,
    category: string,
    description: string
}

interface PageProps {
    posts: Posts[];
}
export default function Index({ posts }: PageProps) {

    const handleDeletePost = (id) => {
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route('post.delete', id), {
                onSuccess: () => {
                    alert("Post deleted successfully");
                },
                onError: (errors) => {
                    console.error(errors);
                }
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex-row gap-4 rounded-xl p-4">
                <div className='float-right'>
                    <Link href={route('post.create')}><Button>Create Post</Button></Link>
                </div>
            </div>
            <div className="flex-row gap-4 rounded-xl p-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.data.map((post) => (
                            <TableRow>
                                <TableCell className="font-medium">{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.categories.map((category) => category.name).join(', ')}</TableCell>
                                <TableCell>{post.description}</TableCell>
                                <TableCell><Link href={route('post.edit', post.id)} className='mr-2'><Button>Edit</Button></Link>
                                    <Button onClick={() => handleDeletePost(post.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {/* Pagination Links */}
                <div className="flex justify-end items-center gap-2">
                    {posts.links.map((link) => (
                        <Button
                            key={link.label}
                            variant={link.active ? "default" : "outline"}
                            size="sm"
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}