import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { render } from "storyblok-rich-text-react-renderer";

// @ts-ignore
const Table = ({ blok }) => {
  // console.log("table blok", blok);
  const { content } = blok;

  return (
    <table className="mb-5">
      <thead className="bg-blue-300">
        <tr>
          {/* @ts-ignore */}
          {content.thead.map((th, index) => (
            <th key={index} className="py-4 text-black">{th.value}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* @ts-ignore */}
        {content.tbody.map((tr, index) => (
          <tr key={index} className="even:bg-gray-100">
            {/* @ts-ignore */}
            {tr.body.map((td, index) => (
              <td key={index} className="text-black p-4 text-base">{td.value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
