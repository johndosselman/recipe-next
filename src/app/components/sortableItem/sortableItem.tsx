import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconButton from "@mui/material/IconButton";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function SortableItem(props: any) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box ref={setNodeRef} style={style}>
      <Stack direction={"row"}>
        <IconButton ref={setActivatorNodeRef} {...listeners}>
          <DragHandleIcon />
        </IconButton>
        <TextField
          margin="dense"
          fullWidth
          label={props.label ? "step " + (props.index + 1) : null}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={props.onRemove}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Stack>
    </Box>
  );
}
