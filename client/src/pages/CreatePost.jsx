
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import React, { useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CreatePost = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const isDarkMode = useSelector((state) => state.theme.theme === 'dark' );
    const [formData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const navigate = useNavigate();

    const config = useMemo(()=>(
        {
      readonly: false,
      placeholder: "Type here...",
      height: 600,
      toolbarButtonSize: "large",
      toolbarAdaptive: false,
      toolbarSticky: false,
      theme: isDarkMode ? "dark" : "default", // Jodit’s built-in themes: "default", "dark"
      // Customize specific buttons shown in the toolbar
      toolbar: true,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "ul",
        "ol",
        "outdent",
        "indent",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "image",
        "link",
        "undo",
        "redo",
      ],
    }
    ),[isDarkMode])

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-3xl text-center my-7 font-semibold roboto">
        Create a Post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            name="title"
            className="flex-1"
            onChange={(e)=>setFormData({...formData, title: e.target.value})}
          />
          <Select onChange={(e)=> setFormData({...formData, category: e.target.value})}
           id="category" name="category" required className="flex-1">
            <option value="">Select Category</option>
            <option value={"javascript"}>Javascript</option>
            <option value={"reactjs"}>React.js</option>
            <option value={"nextjs"}>Next.js</option>
            <option value={"mongodb"}>Mongo Db</option>
          </Select>
        </div>
        {/* <div
          className="flex gap-4 items-center justify-between border-4
            border-blue-500 border-dotted p-3"
        >
          <FileInput id="file" name="file" required accept="image/*" />
          <Button color="blue" className="whitespace-nowrap">
            Upload Image
          </Button>
        </div>
        <div className="px-3">
          <Alert color="info" className="!mb-0 !rounded-md !p-2 !text-sm">
            Image size should be less than 1MB
          </Alert>
        </div> */}
        <div className="border-4
            border-blue-500 border-dotted p-3">
          <TextInput
            type="url"
            placeholder="link of the image"
            id="image"
            name="image"
            className="flex-1"
            onChange={(e)=> setFormData({...formData, image: e.target.value})}
          />
        </div>
        <div className="mt-4 ">
          <JoditEditor
            config={config}
            ref={editor}
            value={content}
            // onChange={setContent}
            onChange={(value) => setFormData({...formData, content: value})}
          />
          <div className="mt-4 border p-2 bg-gray-100 dark:bg-gray-800">
            <strong>Preview:</strong>
            <div dangerouslySetInnerHTML={{ __html: formData.content }} />
          </div>
          <button className="mt-4 w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative w-full px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Publish
            </span>
          </button>
        </div>
        {
          publishError && (
            <Alert color='failure' className='!mb-0 !rounded-md !p-2 !text-sm'>
              {publishError}
            </Alert>
          )
        }
      </form>
    </div>
  );
}

export default CreatePost