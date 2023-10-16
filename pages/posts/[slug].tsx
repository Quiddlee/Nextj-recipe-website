import React, { useEffect, useRef } from 'react';

import AdvertisingContentBottom from '../../components/advertising/contentBottom';
import Aside from '../../components/aside';
import DisqusComments from '../../components/disqusComments/disqusComments';
import PostPageLayout from '../../components/layouts/postPageLayout';
import { MdToHtml } from '../../components/markdown';
import { getPostData } from '../../service/postHandler';
import Image from 'next/image';
import postMetadata, { getAllPostSlugs } from '../../service/postMetadata';
import { resultObj, postData } from '../../types';

const PostPage = ({ postMetadata, content }: postData) => {
  const { title, subtitle, date, author, language, category, taxonomy, ingredients, weight, slug, description, image } =
    postMetadata;
  const first = useRef<HTMLDivElement | null>(null)
  const second = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    first.current = document.getElementById("ingridients") as HTMLDivElement;
    second.current = document.getElementById("directions") as HTMLDivElement;
  }, []);

  function handleClick(e) {
    console.log(e.target)
    e.stopPropagation();
    if (e.target.id === "ingridients") {
      e.target.classList.add("hidden");
      second.current?.classList.add("block");
      second.current?.classList.remove("hidden");
    }

    if (e.target.id === "directions") {
      e.target.classList.add("hidden");
      first.current?.classList.add("block");
      first.current?.classList.remove("hidden");
    }
  }

  return (
    <PostPageLayout postMetadata={postMetadata}>
      {/*<header></header>*/}
      <main className="my-2 grid grid-cols-1 gap-2 text-black sm:grid-cols-5">
        <div className="sm:col-start-1 sm:col-end-5">
          <article lang={language} className="my-1 bg-white text-gray-800 ">
            {/* <AdvertisingContentBottom />
            <header>
              <p>title: {title}</p>
              <p>subtitle: {subtitle}</p>
              <p>date: {date}</p>
              <p>author: {author}</p>
              <p>category: {category}</p>
              <p>ingredients: {ingredients}</p>
              <p>weight: {weight}</p>
              <p>slug: {slug}</p>
              <p>taxonomy: {taxonomy}</p>
              <p>language: {language}</p>
              <p>img: {imageUrl}</p>
            </header>
            <hr /> */}
            <div>
              <div className="min-h-[280px] w-full relative pl-6 pt-16 pr-24">
                <div className="w-full h-full absolute inset-x-0 top-0 bg-black/60 z-10"></div>
                  <Image src={image} alt={slug} fill />
                  <h1 className="relative z-20 text-white text-2xl mb-0">{title}</h1>
                  <p className="relative z-20 text-white/80 text-xs">{description}</p>
                </div>
            <div className="p-2" onClick={handleClick}>
              <MdToHtml mdSource={content} />
            </div>
            </div>
          </article>
          <DisqusComments postMetadata={postMetadata} />
        </div>
        {/* <Aside /> */}
      </main>
    </PostPageLayout>
  );
};

export async function getStaticPaths() {
  const postSlugs = await getAllPostSlugs();

  const paths = postSlugs.map(({ slug }) => ({
    // Извлекаем slug из каждого объекта
    params: { slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const res: postData = await getPostData(params.slug);
    const { content, postMetadata } = res;
    return { props: { content, postMetadata } };
  } catch (error) {
    return { notFound: true };
  }
}

export default PostPage;
