import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import IconButton from "@mui/material/IconButton";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

export default function SortableItem(props: any) {
  const { listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Paper ref={setNodeRef} style={style} sx={{ p: 1, mx: 1 }} elevation={3}>
      <Stack direction={"row"}>
        <IconButton ref={setActivatorNodeRef} {...listeners} sx={{ m: "auto" }}>
          <DragHandleIcon />
        </IconButton>
        <TextField
          fullWidth
          variant="standard"
          label={props.label ? "step " + (props.index + 1) : null}
          multiline={props.multiline}
          InputProps={{
            endAdornment: props.removable && (
              <InputAdornment position="end">
                <IconButton onClick={props.onRemove}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        ></TextField>
      </Stack>
    </Paper>
  );
}
