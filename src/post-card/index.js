import { fallbackColor } from '../utils';

const renderPostCard = (posts, options = {}) => {
    const { title_color, icon_color, text_color, bg_color } = options;

    const height = 120;

    const titleColor = fallbackColor(title_color, '#2f80ed');
    const iconColor = fallbackColor(icon_color, '#586069');
    const textColor = fallbackColor(text_color, '#333');
    const bgColor = fallbackColor(bg_color, '#FFFEFE');

    return (
        <div className="container">
            {posts.map(post => {
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
};

export default renderPostCard;
