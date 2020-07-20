import useSwr from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function Home() {
    const { data, error } = useSwr('/api/medium/posts', fetcher);

    if (error) return <div>Failed to load posts</div>;
    if (!data) return <div>Loading...</div>;

    console.log('data', data);

    return (
        <div className="container">
            {data.map(post => {
                return (
                    <a
                        href={post.link}
                        rel="noopener noreferrer"
                        target="_blank"
                        key={post.id}
                        className="column"
                    >
                        <article className="article" key={post.id}>
                            {post.title}
                        </article>
                    </a>
                );
            })}
        </div>
    );
}
