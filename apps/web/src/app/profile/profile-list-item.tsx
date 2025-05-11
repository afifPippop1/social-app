import { Box, IconButton, Typography } from "@mui/material";
import { MdChevronRight } from "react-icons/md";

type Primitive = string | number | boolean | null | undefined;

export const ProfileItem = ({
  label,
  value,
  onClick,
}: {
  label: string;
  value: Primitive;
  onClick?: () => void;
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py="0.5rem"
      px="1rem"
      sx={{
        cursor: "pointer",
        ":hover": {
          bgcolor: "#FAFAFA",
        },
      }}
      onClick={onClick}
    >
      <Typography>{label}</Typography>
      <Box display="flex" alignItems="center" gap="1rem">
        <Typography>{value}</Typography>
        <IconButton>
          <MdChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};
