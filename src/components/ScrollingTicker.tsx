import React, { useEffect, useRef, useState } from "react";

interface ScrollingTickerProps {
  messages: string[];
  speed?: number; // pixels per second
}

const ScrollingTicker: React.FC<ScrollingTickerProps> = ({ 
  messages,
  speed = 50 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [combinedMessage, setCombinedMessage] = useState("");

  // Combine all messages with clearer separator
  useEffect(() => {
    if (messages.length === 0) {
      setCombinedMessage("Aucune annonce pour le moment");
    } else {
      setCombinedMessage(messages.join("   ❖   "));
    }
  }, [messages]);

  // Setup scrolling animation
  useEffect(() => {
    if (!scrollRef.current) return;

    const scrollElement = scrollRef.current;
    const scrollWidth = scrollElement.scrollWidth;
    const clientWidth = scrollElement.clientWidth;

    // Calculate animation duration based on content length and speed
    const duration = scrollWidth / speed;

    scrollElement.style.animationDuration = `${duration}s`;
    scrollElement.classList.add("animate-ticker");

    return () => {
      scrollElement.classList.remove("animate-ticker");
    };
  }, [combinedMessage, speed]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0F172A] text-white py-4 px-6 flex items-center min-h-[100px] z-50 overflow-hidden font-inter shadow-lg">
      <div
        ref={scrollRef}
        className="whitespace-nowrap text-6xl font-semibold tracking-wide"
        style={{
          paddingRight: "100vw",
        }}
      >
        {combinedMessage}
      </div>
    </div>
  );
};

export default ScrollingTicker;
