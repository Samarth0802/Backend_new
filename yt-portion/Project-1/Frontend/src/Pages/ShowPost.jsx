import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import '../styles/ShowPost.css'
import {useNavigate} from 'react-router-dom'

const ShowPost = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await axios.get('http://localhost:3000/create-post')
                console.log(response.data)
                setPosts(response.data.posts)
            } catch (error) {
                console.error('Error fetching posts:', error)
            } finally {
                setLoading(false)
            }
        }
        
        fetchPosts()
    }, [])
    
    if (loading) {
        return <div className="loading">Loading posts...</div>
    }

    return (
        <div className='show-post'>
            <div className="posts-container">
                <h1 className="posts-title">All Posts</h1>
                <button onClick={() => navigate('/create-post')}>Back to create post</button>
                
                {posts.length === 0 ? (
                    <p className="no-posts">No posts available</p>
                ) : (
                    <div className="posts-grid">
                        {posts.map((post) => (
                            <div key={post._id} className="post-card">
                                <div className="post-image-container">
                                    <img 
                                        src={`${post.image}`} 
                                        alt={post.caption} 
                                        className="post-image"
                                    />
                                </div>
                                <div className="post-content">
                                    <p className="post-caption">{post.caption}</p>
                                    <div className="post-footer">
                                        <span className="post-date">
                                            {new Date(post.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ShowPost
