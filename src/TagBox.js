import React from 'react';
import qs from 'qs';
import ListOfTags from './ListOfTags';

const constructHash = (updatedTags) => {
  // By constructing the whole hash string we will allow the potential use of other attributes in string
  if (updatedTags.length === 0) {
    window.location.hash = '';
  } else {
    window.location.hash = `tags=${updatedTags.join(',')}`
  }
};

const TagBox = () => {
  const [tags, setTags] = React.useState([]);
  const [newTag, setNewTag] = React.useState('');

  const getUrlHash = () => {
    const hash = window.location.hash;
    const parsedHash = qs.parse(hash.replace('#', ''));
    return parsedHash;
  };

  React.useEffect(() => {
    setTags(getUrlHash().tags ? getUrlHash().tags.split(',') : []);

    window.addEventListener(
      "hashchange", 
      () => {
        setTags(getUrlHash().tags ? getUrlHash().tags.split(',') : [])
      },
      false
    );
  }, []);

  const addTag = () => {
    constructHash([
      ...tags,
      newTag,
    ]);
    setNewTag('');
  };

  const removeTag = (index) => {
    constructHash([
      ...tags.slice(0, index),
      ...tags.slice(index + 1, tags.length)
    ]);
  };

  const handleInputChange = (e) => {
    setNewTag(e.target.value);
  };

  return (
    <div className={'TagBox'}>
      <div className={'TagBoxHeader'}>List of tags</div>
      <ListOfTags tags={tags} removeTag={removeTag}/>
      <div className={'TagInputContainer'}>
        <input 
          className={'TagInput'}
          type={'text'}
          value={newTag}
          onChange={handleInputChange}
          placeholder={'Add new tag'}
        />
        <button className={'TagInputButton'} type={'button'} onClick={addTag}>
          Add
        </button>
      </div>
    </div>
  );
};

export default TagBox;
