import React from 'react';
import { Story } from '../types';

interface StoryBubbleProps {
  story: Story;
  onClick: () => void;
}

const StoryBubble: React.FC<StoryBubbleProps> = ({ story, onClick }) => {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 flex-shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D9FF] rounded-full">
      <div className="relative w-20 h-20 p-1 rounded-full bg-gradient-to-tr from-[#FF2E97] to-[#00D9FF]">
        <div className="bg-[#0A0E27] p-1 rounded-full">
          <img src={story.avatarUrl} alt={story.username} className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
      <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300 truncate w-20 text-center">{story.username}</p>
    </button>
  );
};

export default StoryBubble;