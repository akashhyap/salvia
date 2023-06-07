import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const Table = ({ blok }) => {
  // console.log("table blok", blok);
  const { content } = blok;

  return (
    <table>
      <thead>
        <tr>
          {/* @ts-ignore */}
          {content.thead.map((th, index) => (
            <th key={index}>{th.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* @ts-ignore */}
        {content.tbody.map((tr, index) => (
          <tr key={index}>
            {/* @ts-ignore */}
            {tr.body.map((td, index) => (
              <td key={index}>{td.value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
