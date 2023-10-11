import React from 'react';

import AdvertisingContentBottom from '../../components/advertising/contentBottom';
import Aside from '../../components/aside';
import DisqusComments from '../../components/disqusComments/disqusComments';
import PostPageLayout from '../../components/layouts/postPageLayout';
import { MdToHtml } from '../../components/markdown';
import { getPostData } from '../../service/postHandler';
import { getAllPostSlugs } from '../../service/postMetadata';
import { MetadatObj } from '../../types';

type PostPageProps = { postMetadata: MetadatObj; content: string };

const PostPage = ({ postMetadata, content }: PostPageProps) => {
  const { title, subtitle, date, author, language, category, taxonomy, ingredients, weight, slug } =
    postMetadata;
  return (
    <PostPageLayout postMetadata={postMetadata}>
      {/*<header></header>*/}
      <main className="my-2 grid grid-cols-1 gap-2 rounded-lg text-black sm:grid-cols-5">
        <div className="sm:col-start-1 sm:col-end-5">
          <article lang={language} className="my-1 rounded-md bg-white p-2 text-gray-800 shadow-md">
            <AdvertisingContentBottom />
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
            </header>
            <hr />
            <MdToHtml mdSource={content} />
          </article>
          <DisqusComments postMetadata={postMetadata} />
        </div>
        <Aside />
      </main>
    </PostPageLayout>
  );
};

export async function getStaticPaths() {
  const postSlugs: { slug: string }[] = await getAllPostSlugs();

  const paths = postSlugs.map(({ slug }) => ({
    // Извлекаем slug из каждого объекта
    params: { slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  try {
    const { content, postMetadata }: PostPageProps = await getPostData(params.slug);
    return { props: { content, postMetadata } };
  } catch (error) {
    return { notFound: true };
  }
}

export default PostPage;
