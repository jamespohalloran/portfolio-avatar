import { useGithubEditing } from "react-tinacms-github";
import React from "react";

export interface EditLinkProps {
  isEditing: boolean;
}

export const EditLink = ({ isEditing }: EditLinkProps) => {
  const github = useGithubEditing();

  return (
    <button onClick={isEditing ? github.exitEditMode : github.enterEditMode}>
      {isEditing ? "Exit Edit Mode" : "Edit This Site"}
    </button>
  );
};
