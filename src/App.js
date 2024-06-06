import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://www.reddit.com/r/reactjs.json")
        .then((res) => {
          setData(res.data.data.children);
        })
        .catch((err) => console.error(err));
    };
    fetchData();
  }, []);
  const createMarkup = (htmlContent) => {
    if (htmlContent) {
      const withoutSCOffAndOn = htmlContent?.replace(
        /&lt;!-- SC_OFF --&gt;|&lt;!-- SC_ON --&gt;/g,
        ""
      );
      const finalHtmlText = withoutSCOffAndOn?.replace(
        /&amp;|&lt;|&gt;|&quot;|&apos;/g,
        (match) => {
          const htmlEntities = {
            "&amp;": "&",
            "&lt;": "<",
            "&gt;": ">",
            "&quot;": '"',
            "&apos;": "'",
          };
          return htmlEntities[match];
        }
      );
      return { __html: finalHtmlText };
    } else {
      return { __html: "No SelfText_HTML" };
    }
  };

  return (
    <div className="app">
      {data?.map((item) => {
        return (
          <div className="outer-card" key={item.data.id}>
            <div className="card-title">
              <p>{item.data.title}</p>
            </div>
            <div
              className="card-selftext_html"
              dangerouslySetInnerHTML={createMarkup(item.data.selftext_html)}
            />
            <div>
              <span className="url">
                URL : <a href={item.data.url}>{item.data.url}</a>{" "}
              </span>{" "}
              <br />
              <span className="score">Score: {item.data.score}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
