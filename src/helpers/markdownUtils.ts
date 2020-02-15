import removeMarkdown from "remove-markdown";

export function formatExcerpt(content: string) {
  const plainTextExcerpt = removeMarkdown(content, {
    stripListLeaders: true,
    gfm: true
  })
    .replace(/(\r\n|\n|\r)/gm, "")
    .substring(0, 200)
    .trimEnd();

  return `${plainTextExcerpt}...`;
}
