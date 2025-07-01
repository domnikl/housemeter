import React from "react";
import classes from "./Tag.module.css";
import { MeasurementType, MeasurementTag } from "../MeasurementInterface";

interface TagProps {
  type: MeasurementType;
  className?: string;
}

const measurementTags: Record<MeasurementType, MeasurementTag> = {
  Electricity: {
    type: "Electricity",
    label: "⚡ Electricity",
    color: "#ffffff",
    backgroundColor: "#ff6b35",
  },
  Water: {
    type: "Water",
    label: "💧 Water",
    color: "#ffffff",
    backgroundColor: "#4ecdc4",
  },
  Gas: {
    type: "Gas",
    label: "🔥 Gas",
    color: "#ffffff",
    backgroundColor: "#45b7d1",
  },
};

const Tag: React.FC<TagProps> = ({ type, className }) => {
  const tag = measurementTags[type];

  if (!tag) {
    return <span className={classes.defaultTag}>{type}</span>;
  }

  const tagStyle = {
    color: tag.color,
    backgroundColor: tag.backgroundColor,
  };

  return (
    <span className={`${classes.tag} ${className || ""}`} style={tagStyle}>
      {tag.label}
    </span>
  );
};

export default Tag;
