import React from 'react';
import qs from 'qs';

const ListOfTags = (props) => {
  const { tags, removeTag } = props;
  
  return (
    <ul>
      {tags && tags.map((tag, index) => (
        <li onClick={() => removeTag(index)} key={index}>
          {tag}
        </li>
      ))}
    </ul>
  )};

const TagBox = () => {
  const [tags, setTags] = React.useState([]);
  const [newTag, setNewTag] = React.useState('');

  const urlHash = (() => {
    const hash = window.location.hash;
    const parsedString = qs.parse(hash.replace('#', ''));
    return parsedString;
  })();

  React.useEffect(() => {
    setTags(urlHash.tags && urlHash.tags.split(','));
  }, [urlHash]);
  
  const constructHash = (updatedTags) => {
    // By constructing the whole hash string we will allow the potential use of other attributes in string
    window.location.hash = `tags=${updatedTags.join(',')}`;
  };

  const removeTag = (index) => {
    constructHash([
      ...tags.slice(0, index),
      ...tags.slice(index + 1, tags.length)
    ]);
  }

  const handleClick = (e) => {
    setNewTag('');

    constructHash([
      ...tags,
      newTag
    ]);
  };

  const handleChange = (e) => {
    setNewTag(e.target.value);
  };

  return (
    <div className="App">
      <ListOfTags tags={tags} removeTag={removeTag}/>
      <form>
        <input type={'text'} value={newTag} onChange={handleChange} />
        <button type={'submit'} onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default TagBox;
