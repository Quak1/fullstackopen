const Languages = ({ languages }) => {
  let langList = [];

  for (const lang in languages) {
    langList.push(<li key={lang}>{languages[lang]}</li>);
  }

  return <ul>{langList}</ul>;
};

export default Languages;
