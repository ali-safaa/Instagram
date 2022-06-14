import React from 'react';
import stories from '../stories';
function StoryFeed() {
  return (
    <div className="border flex bg-white items-center space-x-3 px-4 w-max mx-auto mt-5">
      {stories.map((story) => (
        <div key={story.id} className="grid items-center my-3">
          <img
            className="w-[50px] h-[50px] object-cover rounded-full"
            src={story.image}
            alt=""
          />
          <h3 className="ml-3 font-semibold text-sm">{story.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default StoryFeed;
