import { Fragment, type ReactNode } from "react";
import type { LegalBlock } from "@/lib/legal";

const URL_RE = /(https?:\/\/[^\s]+)/g;

function linkify(text: string): ReactNode {
  return text.split(URL_RE).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} target="_blank" rel="noreferrer">
        {part}
      </a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

export function LegalContent({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <div className="prose-legal max-w-3xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return <h2 key={i}>{block.text}</h2>;
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "h4":
            return (
              <h3 key={i} className="!mt-5 !text-sm">
                {block.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{linkify(item)}</li>
                ))}
              </ul>
            );
          case "lines":
            return (
              <p key={i}>
                {block.lines.map((line, j) => (
                  <Fragment key={j}>
                    {linkify(line)}
                    {j < block.lines.length - 1 ? <br /> : null}
                  </Fragment>
                ))}
              </p>
            );
          default:
            return <p key={i}>{linkify(block.text)}</p>;
        }
      })}
    </div>
  );
}
