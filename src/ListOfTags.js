import React from 'react';

const ListOfTags = (props) => {
  const { tags, removeTag } = props;

  return (
    <ul>
      {tags && tags.map((tag, index) => (
        <li key={index}>
          <span 
            className={'TagName'}
            title={'Click to delete'}
            onClick={() => removeTag(index)} 
          >
            {tag}
          </span>
        </li>
      ))}
    </ul>
  )
};

export default ListOfTags;
