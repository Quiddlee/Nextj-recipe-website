import Markdown from "markdown-to-jsx";

export const MdArticle = ({content}) => {
  const overrides = {
    div: {component: "div", props: {className: "mb-4"}},
    p: {component: "p", props: {className: "my-4"}},
    a: {component: "a", props: {className: "text-blue-500 hover:underline"}},
    h2: {component: "h2", props: {className: "text-2xl font-bold my-4"}},
    h3: {component: "h3", props: {className: "text-xl font-bold my-2"}},
    pre: {
      component: "pre",
      props: {className: "bg-gray-100 p-4 rounded-md overflow-x-auto"},
    },
    code: {component: "code", props: {className: "text-gray-800"}},
    ul: {component: "ul", props: {className: "list-disc my-4 ml-8"}},
    li: {component: "li", props: {className: "my-2"}},
    img: {
      component: "img",
      props: {className: "my-4 rounded-md", alt: "Альтернативный текст"},
    },
    figcaption: {
      component: "figcaption",
      props: {className: "text-sm text-gray-500 mt-2"},
    },
  };

  return (
    <article className="bg-white shadow-md rounded-md p-4 text-gray-800">
      <Markdown options={{overrides}}>{content}</Markdown>
    </article>
  );
};
