'use client'

import React from 'react';
import TipTap from './TipTap';
import InputWithIcon from '@/components/shared/InputWithIcon';
import { HiAtSymbol, HiOutlineCloudArrowUp, HiXMark } from 'react-icons/hi2';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { uploadImage } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { deleteCloudinaryImages } from '@/lib/actions/deleteProfileImage';
import { LucideImagePlus } from 'lucide-react';
import LoadingButton from '@/components/shared/LoadingButton';
import { userProps } from '@/lib/types';
import { createPost } from '@/lib/actions/blog-action';


type Props = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
  user: userProps
}

const CreatePost = ({setActiveTab, user}: Props) => {

  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState(false)

  const [content, setContent] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [intro, setIntro] = React.useState('');

  const getWordCount = (text:string) => {
    const words = text.split(/\s+/).filter(Boolean)
    const wordsCount = words.length;

    return wordsCount;
  };

  const wordsCounts = getWordCount(content);
  const wordPerMinute = 200;

  const [imageFile, setImageFile] = React.useState<File| null>(null);
  const [postBanner, setPostBanner] = React.useState({secure_url: '', public_id: ''});
  const [imageUploaded, setImageUploaded] = React.useState(false);


  const onChangeImageFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostBanner({...postBanner, secure_url: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadBannerImage = async() => {
    const data = {image: imageFile, uploadPreset: 'postImages'}
    try {
      const imageData = await uploadImage(data)
      const imageUrls = {public_id: imageData?.public_id, secure_url: imageData?.secure_url};
      setPostBanner(imageUrls);
      toast({
        title: 'Success',
        variant: 'success',
        description: 'Banner image successfully uploaded'
      });
      setImageUploaded(true);
    } catch (error) {
      console.error(error)
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Banner image not uploaded'
      });
    }
  };

  const resetImageFile = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setImageFile(null)
    setPostBanner({...postBanner, secure_url: ''})
  };

  const deleteImageFile = () => {
    if (postBanner.public_id !== '') {
      deleteCloudinaryImages(postBanner.public_id)
      setImageFile(null)
      setPostBanner({...postBanner, secure_url: ''})
    }
  };

  const handleContentChange = (value:any) => {
    setContent(value);
  };

  const create = async (event:React.FormEvent) => {
    event.preventDefault();

    if (title === '') {
      return;
    }

    if (intro === '') {
      return;
    }

    if (imageFile === null) {
      toast({
        variant: 'destructive',
        title:'Error',
        description: 'Blog post banner is required! Add one'
      });

      return;
    }

    if (postBanner.secure_url && !imageUploaded) {
      toast({
        variant: 'destructive',
        title:'Error',
        description: 'Upload selected blog post banner!'
      });

      return;
    }

    if (title === '' && intro === '' && content === '') {
      toast({
        variant: 'destructive',
        title:'Error',
        description: 'You cannot submit empty fields! Add all intro, banner image and some post'
      });

      return;
    }

    const postData = {
      title: title,
      intro: intro,
      content: content,
      bannerImage: postBanner,
      readTime: (wordsCounts / wordPerMinute).toFixed(2)
    };

    try {
      setIsLoading(true);
      await createPost(postData).then((response) => {
        if (response?.success) {
          setIsLoading(false)
          toast({
            variant: 'success',
            title:'Success',
            description: response.success
          });
          setActiveTab('added-posts')   
        }

        if (response?.error) {
          setIsLoading(false)
          toast({
            variant: 'destructive',
            title:'Error',
            description: response.error
          });          
        }
      })
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title:'Error',
        description: 'Someting went wrong, try again later.'
      });
    }
  };

  return (
    <div className='w-full h-full flex slide-in-left'>
      <div className="flex flex-col lg:gap-4 gap-3 w-full lg:w-[85%] xl:w-[75%]">
        <div className='flex gap-4 lg:gap-6 cursor-pointer'>
          <h2 className='text-xl md:text-3xl font-semibold'>Create Post</h2>
          <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('added-posts')}>Added Posts</h2>
          { user.showLikedBlogs && <h2 className='text-xl md:text-3xl font-semibold text-gray-400' onClick={() =>setActiveTab('liked-posts')}>Liked Posts</h2> }
        </div>
        <form className="w-full overflow-hidden flex flex-col gap-3" onSubmit={create}>
          <InputWithIcon
            className='border rounded'
            placeholder='title of blog post'
            icon={HiAtSymbol}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            placeholder='give a brief intro to your post'
            className='focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 outline-none focus:outline-none rounded bg-inherit text-base resize-none h-36'
          />
          <div className="w-full">
            <label htmlFor="postBannerImage" className='w-full'>
              <div className="overflow-hidden relative w-full aspect-video bg-gray-300 rounded flex items-center justify-center flex-col text-neutral-600 lg:text-lg cursor-pointer group">
                { postBanner.secure_url ? 
                  <Image src={postBanner.secure_url} priority fill alt='imageBanner' className='object-cover'/> : 
                  <Image src={'/images/default_banner.png'} priority fill alt='imageBanner' className='object-contain'/>
                }
                <div className="z-[200] absolute left-0 top-0 w-full h-full flex flex-col bg-black/40 text-white opacity-0 group-hover:opacity-100 justify-center items-center">
                  { postBanner.secure_url && !imageUploaded ?
                    <div className='flex items-center gap-5 p-3'>
                      <button className='md:p-2.5 p-2 rounded-full bg-green-600 text-white' onClick={uploadBannerImage} type='button'>
                        <HiOutlineCloudArrowUp size={25} className='hidden md:block'/>
                        <HiOutlineCloudArrowUp size={22} className='md:hidden'/>
                      </button>
                      <button className='md:p-2.5 p-2 rounded-full bg-red-400' onClick={resetImageFile} type='button'>
                        <HiXMark size={25} className='hidden md:block'/>
                        <HiXMark size={22} className='md:hidden'/>
                      </button>
                    </div> :
                    imageUploaded && postBanner.secure_url ?
                    <button className='md:p-2.5 p-2 rounded-full bg-red-400' onClick={deleteImageFile} type='button'>
                      <HiXMark size={25} className='hidden md:block'/>
                      <HiXMark size={22} className='md:hidden'/>
                    </button> :
                    <React.Fragment>
                      <LucideImagePlus size={100} className='lg:block hidden'/>
                      <LucideImagePlus size={80} className='hidden md:block lg:hidden'/>
                      <LucideImagePlus size={60} className='md:hidden'/>
                      <span>Add post banner</span>
                    </React.Fragment>
                  }
                </div>
                <input type='file' id='postBannerImage'  hidden  accept=".png, .jpg, .jpeg" className='cursor-pointer' onChange={onChangeImageFile} />
              </div>
            </label>
          </div>
          <TipTap content={content} onChange={(newContent:string) => handleContentChange(newContent)}/>
          <div className='mt-8'>
            <LoadingButton loading={isLoading} disabled={isLoading} className='rounded-full' type='submit'>
              <p className='text-base'>{isLoading ? 'Creating post...' : 'Create post'}</p>
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost