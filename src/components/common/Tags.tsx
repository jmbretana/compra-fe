// component tags
import React, { useState } from "react";
import { Box, Chip } from "@mui/material";
import { COLORS } from "@values/colors";
import { InputComponent } from "@common";
import { ButtonIcon } from "@common/button";
import AddIcon from "@mui/icons-material/Add";

interface TagsProps {
  tags: string[] | undefined;
  //
  onChange: (tags: string[]) => void;
}

const TagsComponent: React.FC<TagsProps> = ({ tags, onChange }) => {
  const [tagSelect, setTagSelect] = useState<string>("");

  const handleDelete = (tagToDelete: string) => {
    if (tags) onChange(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagSelect(event.target.value);
  };

  const handleAddTag = () => {
    if (tagSelect.trim() !== "") {
      const newTag = tagSelect.trim();

      if (tags && !tags.includes(newTag)) {
        onChange([...tags, newTag]);
      } else if (!tags) {
        onChange([newTag]);
      }
      setTagSelect("");
    }
  };

  return (
    <Box display="flex" flexDirection={"column"} gap={1}>
      <Box display="flex" alignItems="center" gap={1}>
        <InputComponent
          id="tags-input"
          name="tagssss"
          value={tagSelect}
          //
          onChange={handleChange}
        />
        <ButtonIcon icon={<AddIcon />} onClick={handleAddTag} />
      </Box>

      <Box gap={1} display="flex" flexWrap="wrap">
        {tags &&
          tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDelete(tag)}
              sx={{ backgroundColor: COLORS.grey_light }}
            />
          ))}
      </Box>
    </Box>
  );
};

export default TagsComponent;
