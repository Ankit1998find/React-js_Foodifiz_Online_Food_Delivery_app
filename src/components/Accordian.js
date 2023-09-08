import React, { useState } from 'react';

const Accordion = ({ sections }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleSection = (index) => {
    if (index === expandedIndex) {
      setExpandedIndex(null); // Collapse if clicked again
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <div className="accordion">
      {sections.map((section, index) => (
        <div className="accordion-section" key={index}>
          <div
            className={`accordion-header ${index === expandedIndex ? 'expanded' : ''}`}
            onClick={() => toggleSection(index)}
          >
            {section.header}
          </div>
          {index === expandedIndex && (
            <div className="accordion-content">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
