import Head from 'next/head';
import useSwr from 'swr';
import renderPostCard from '../src/post-card';

const fetcher = url => fetch(url).then(res => res.text());

export default function Home() {
    const { data, error } = useSwr('/api/medium/posts', fetcher);

    if (error) return <div>Failed to load posts</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div className="container">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main dangerouslySetInnerHTML={{ __html: data }} />
        </div>
    );
}
