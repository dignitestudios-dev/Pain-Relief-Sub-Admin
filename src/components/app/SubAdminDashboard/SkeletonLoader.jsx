import React from "react";

const SkeletonLoader = ({ type }) => {
  // Base skeleton styles
  const skeletonStyle = {
    backgroundColor: "#e0e0e0", // Light gray background
    borderRadius: "4px", // Rounded corners
    marginBottom: "10px", // Space between skeleton elements
    animation: "shimmer 1.5s infinite linear", // Animation for shimmer effect
  };

  // Conditional width based on 'type'
  const width = type === "small" ? "60%" : type === "medium" ? "80%" : "100%";
  const height = "20px"; // Height of the skeleton element

  // Adding styles dynamically
  const skeletonStyles = {
    ...skeletonStyle,
    width: width,
    height: height,
  };

  // CSS keyframes for shimmer effect (can be applied inline or via `style`)
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% {
        background-position: -500px 0;
      }
      50% {
        background-position: 500px 0;
      }
      100% {
        background-position: 500px 0;
      }
    }
  `;

  // Create a style tag for the shimmer animation if it's inline
  const styleTag = <style>{shimmerKeyframes}</style>;

  return (
    <>
      {styleTag} {/* Inject the shimmer animation keyframes */}
      <div className="skeleton" style={skeletonStyles}></div>
    </>
  );
};

export default SkeletonLoader;
