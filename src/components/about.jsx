import React from "react";
import "./about.css";
{/*import "../ThemeContext.jsx";*/}
export default function About() {
  return (
    <div className="about">
      <div className="about-header">
        <h2 className="about-title">About AlgoVisualizer</h2>
        <div className="about-divider"></div>
      </div>

      <div className="about-section">
        <p className="about-text">
          AlgoVisualizer is an interactive web application designed to help
          students, developers, and algorithm enthusiasts understand how sorting
          and searching algorithms work through real-time visualization. By
          breaking down complex algorithms into step-by-step animations,
          AlgoVisualizer makes learning intuitive and engaging.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">Why AlgoVisualizer?</h2>
        <p className="about-text">
          Understanding algorithms can be challenging, especially when dealing
          with abstract concepts. Traditional learning methods rely on static
          diagrams or pseudocode, which may not fully demonstrate how an
          algorithm processes data.
        </p>
        <h3 className="about-small-title">AlgoVisualizer bridges this gap by:</h3>
        <ul className="about-list">
          <li>Providing real-time animations of how algorithms manipulate data.</li>
          <li>
            Allowing users to interact with different inputs and observe
            algorithmic behavior.
          </li>
          <li>
            Simplifying complex concepts through visual step-by-step execution.
          </li>
        </ul>
      </div>

      <div className="about-section">
        <h2 className="about-subtitle">Our Mission</h2>
        <p className="about-text">
          Our goal is to make algorithm learning accessible, interactive, and
          fun. Whether you're a beginner exploring sorting techniques or an
          experienced programmer refining your knowledge, AlgoVisualizer helps
          you grasp the mechanics behind essential algorithms efficiently.
        </p>
      </div>

      <div className="about-feature-section">
        <h2 className="about-subtitle">Features</h2>
        <div className="about-card-container">
          <div className="about-card">
            <h3 className="about-card-title">Sorting Algorithms</h3>
            <ul className="about-list">
              <li>Bubble Sort – Elements "bubble up" to their positions.</li>
              <li>
                Insertion Sort – Builds a sorted array one element at a time.
              </li>
              <li>Selection Sort – Repeatedly selects the smallest element.</li>
              <li>Merge Sort – Divide-and-conquer sorting approach.</li>
              <li>Quick Sort – Partitioning and recursive sorting.</li>
            </ul>
          </div>

          <div className="about-card">
            <h3 className="about-card-title">Searching Algorithms</h3>
            <ul className="about-list">
              <li>Linear Search – Sequentially checks each element.</li>
              <li>Binary Search – Halves the search space efficiently.</li>
              <li>
                Jump Search – Optimized block-based searching technique.
              </li>
              <li>
                Exponential Search – Combines binary search with exponential
                ranges.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="about-button-container">
        <a
          href="https://github.com/RhythmPahwa14/AlgoVisualizer"
          target="_blank"
          rel="noopener noreferrer"
          className="about-button"
        >
          Visit GitHub
        </a>
      </div>
    </div>
  );
}
