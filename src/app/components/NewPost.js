import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createPost, toggleModalVisibility } from "../store/actions";

const NewPost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [tags, setTags] = useState("");
	const [coverUrl, setCoverUrl] = useState("");

	const history = useHistory();
	const dispatch = useDispatch();

	const handleTitleChange = (e) => setTitle(e.target.value);
	const handleContentChange = (e) => setContent(e.target.value);
	const handleTagsChange = (e) => setTags(e.target.value);
	const handleCoverUrlChange = (e) => setCoverUrl(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newPost = { title, content, tags, coverUrl };
		dispatch(createPost(newPost, history));
	};

	const handleCloseModal = () => dispatch(toggleModalVisibility());

	return (
		<div className="new-post">
			<form className="new-post__form" onSubmit={(e) => e.preventDefault()}>
				<fieldset className="new-post__group">
					<legend className="new-post__legend">Create a new post</legend>
					<p className="new-post__input title">
						<label htmlFor="title">Title:	<input type="text" id="title" name="title" value={title} onChange={handleTitleChange} /></label>
					</p>
					<p className="new-post__input content">
						<label htmlFor="content">Content:	<input type="text" id="content" name="content" value={content} onChange={handleContentChange} /></label>
					</p>
					<p className="new-post__input tags">
						<label htmlFor="tags">Tags:	<input type="text" id="tags" name="tags" value={tags} onChange={handleTagsChange} /></label>
					</p>
					<p className="new-post__input coverUrl">
						<label htmlFor="coverUrl">Cover URL:	<input type="text" id="coverUrl" name="coverUrl" value={coverUrl} onChange={handleCoverUrlChange} /></label>
					</p>
				<button type="submit" className="new-post__button btn" onClick={handleSubmit}>Create Post</button>
				<button type="button" className="new-post__button btn" onClick={handleCloseModal}>Close</button>
				</fieldset>
			</form>
		</div>
	);
};

export default NewPost;
