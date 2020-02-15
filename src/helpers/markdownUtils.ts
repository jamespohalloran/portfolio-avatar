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

export function formatDate(fullDate: string) {
  const date = new Date(fullDate);
  const dateOptions = {
    formatMatcher: "best fit",
    month: "long",
    year: "numeric",
    day: "numeric"
  };
  return date.toLocaleDateString("en-US", dateOptions);
}
