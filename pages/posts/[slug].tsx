import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

import Button from '../../components/button';
import DisqusComments from '../../components/disqusComments/disqusComments';
import PostPageLayout from '../../components/layouts/postPageLayout';
import { MdToHtml } from '../../components/markdown';
import { getPostData } from '../../service/postHandler';
import { getAllPostSlugs } from '../../service/postMetadata';
import { postData } from '../../types';

const PostPage = ({ postMetadata, content }: postData) => {
  const { title, language, category, slug, description, image, calories, time } = postMetadata;
  const ingridientsDiv = useRef<HTMLDivElement | null>(null);
  const directionsDiv = useRef<HTMLDivElement | null>(null);
  const ingridientsBtn = useRef<HTMLButtonElement | null>(null);
  const directionsBtn = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    ingridientsDiv.current = document.getElementById('ingridients') as HTMLDivElement;
    directionsDiv.current = document.getElementById('directions') as HTMLDivElement;
    ingridientsBtn.current = document.getElementById('ingridients_btn') as HTMLButtonElement;
    directionsBtn.current = document.getElementById('directions_btn') as HTMLButtonElement;
  }, []);

  function handleClick(e) {
    if (e.target.id === 'ingridients_btn') {
      e.target.classList.add('active');
      directionsBtn.current?.classList.remove('active');
      ingridientsDiv.current?.classList.add('block');
      ingridientsDiv.current?.classList.remove('hidden');
      directionsDiv.current?.classList.remove('block');
      directionsDiv.current?.classList.add('hidden');
    }

    if (e.target.id === 'directions_btn') {
      e.target.classList.add('active');
      ingridientsBtn.current?.classList.remove('active');
      directionsDiv.current?.classList.add('block');
      directionsDiv.current?.classList.remove('hidden');
      ingridientsDiv.current?.classList.remove('block');
      ingridientsDiv.current?.classList.add('hidden');
    }
  }

  return (
    <PostPageLayout postMetadata={postMetadata}>
      <main className="my-2 text-black sm:grid-cols-5">
        <div className="max-w-screen-lg">
          <article lang={language} className="my-1 bg-white text-gray-800 ">
            <div>
              <div className="relative flex min-h-[280px] w-full flex-col gap-y-6 rounded-none pl-6 pr-24 pt-6 sm:pr-96 sm:pt-12 md:gap-y-8 md:rounded-3xl">
                <div className="absolute inset-x-0 top-0 z-10 h-full w-full rounded-none bg-black/50 md:rounded-3xl"></div>
                <Link href={'/'}>
                  <Button className="relative z-20 px-3 py-2 hover:bg-black-400" type="rounded">
                    <img
                      src="/assets/icons/arrowBack.svg"
                      className="relative z-20 h-5 w-4"
                      alt=""
                    />
                  </Button>
                </Link>
                <Image
                  src={image}
                  alt={slug}
                  fill
                  objectFit="cover"
                  className="rounded-none md:rounded-3xl"
                />
                <div>
                  <h1 className="relative z-20 mb-0 text-2xl text-white">{title}</h1>
                  <p className="relative z-20 text-xs text-white/80">{description}</p>
                </div>
                <div className="relative z-20 flex max-w-[300px] justify-between text-white">
                  <div>
                    <h6 className="text-xs text-white/80">Калории</h6>
                    <p className="text-xs text-white/80">{calories}</p>
                  </div>
                  <div>
                    <h6 className="text-xs text-white/80">Время</h6>
                    <p className="text-xs text-white/80">{time} минут</p>
                  </div>
                  <div>
                    <h6 className="text-xs text-white/80">Категория</h6>
                    <p className="text-xs text-white/80">{category}</p>
                  </div>
                </div>
              </div>
              <div className="p-6" onClick={handleClick}>
                <MdToHtml mdSource={content} />
              </div>
            </div>
          </article>
          <DisqusComments postMetadata={postMetadata} />
        </div>
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
