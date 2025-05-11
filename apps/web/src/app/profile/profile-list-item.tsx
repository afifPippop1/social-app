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
      gap="1.5rem"
      sx={{
        cursor: "pointer",
        ":hover": {
          bgcolor: "#FAFAFA",
        },
      }}
      onClick={onClick}
    >
      <Typography flex={1} minWidth="50%">
        {label}
      </Typography>
      <Box
        display="flex"
        justifyContent="end"
        alignItems="center"
        gap="1rem"
        flex={1}
        minWidth={0}
      >
        <Typography noWrap>{value}</Typography>
        <IconButton>
          <MdChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};
