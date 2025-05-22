import { useEffect, useState } from "react";
import logics from "../../logic";
import Btn from "../../components/lib/Btn";
import CreatePostModal from "../../components/CreatePostModal";
import PostCard from "../../components/PostCard";
import locales from "../../locales";

const Home = ({ locale }) => {
    const [translations, setTranslations] = useState(locales[locale]['home']);
    const [posts, setPosts] = useState([]);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [refreshPosts, setRefreshPosts] = useState(Date.now());

    useEffect(() => {
        setTranslations(locales[locale]['home']);
    }, [locale]);

    useEffect(() => {
        logics.posts.getAllPosts((error, posts) => {
            if (error) {
                alert(translations.errorMsg);
                console.error(error);
            } else {
                setPosts(posts);
            }
        });
    }, [refreshPosts]);

    const openModal = () => setShowCreatePostModal(true);
    const closeModal = () => setShowCreatePostModal(false);

    return (
        <div className="main-container">
            <h1>{translations.title}</h1>

            <Btn
                btnClassnames={"home__create-post--button"}
                btnContent={translations.newPost}
                btnCallback={openModal}
            />

            {showCreatePostModal &&
                <CreatePostModal
                    locale={locale}
                    setRefreshPosts={setRefreshPosts}
                    closeModal={closeModal}
                />
            }

            <div className="home__posts-list">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Home;

