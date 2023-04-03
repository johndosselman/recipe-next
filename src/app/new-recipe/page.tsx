"use client";
import { AuthContext } from "@/context/AuthContext";
import AddRecipe from "@/firestore/addRecipe";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItem from "../components/sortableItem/sortableItem";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {
  direction,
  identifiable,
  ingredient,
  note,
} from "../interfaces/interfaces";
import Box from "@mui/material/Box";
import spacing from "@mui/system";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

export default function Page() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const credential = useContext(AuthContext);
  const router = useRouter();
  const [recipeName, setRecipeName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState<ingredient[]>([
    { id: 1, ingredientName: "" },
  ]);
  const [directions, setDirections] = useState<direction[]>([
    { id: 2, directionText: "" },
  ]);
  const [notes, setNotes] = useState<note[]>([]);
  const [uniqueId, setUniqueId] = useState<number>(3);
  const [servings, setServings] = useState("");
  const [cookTime, setCookTime] = useState("");
  // reroute user to home if they lack the credentials
  useEffect(() => {
    if (credential.user === null || !credential.user.emailVerified) {
      router.push("/");
    }
  }, [credential]);

  // submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await AddRecipe(recipeName);
  };

  // add ingredient to the ingredients list
  const handleAddIngredient = () => {
    const newIngredient: ingredient = { id: uniqueId, ingredientName: "" };
    setIngredients([...ingredients, newIngredient]);
    setUniqueId(uniqueId + 1);
  };

  // add direction to the directions list
  const handleAddDirection = () => {
    const newDirection: direction = { id: uniqueId, directionText: "" };
    setDirections([...directions, newDirection]);
    setUniqueId(uniqueId + 1);
  };

  // add note to the directions list
  const handleAddNote = () => {
    const newNote: note = { id: uniqueId, noteText: "" };
    setNotes([...notes, newNote]);
    setUniqueId(uniqueId + 1);
  };

  // item reordering after dragging
  function reorderItems<T extends identifiable>(
    event: DragEndEvent,
    setArray: Dispatch<SetStateAction<any>>
  ) {
    const { active, over } = event;
    if (active.id !== over?.id && over?.id) {
      setArray((items: T[]) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const handleIngredientsDragEnd = (e: DragEndEvent) => {
    reorderItems(e, setIngredients);
  };

  const handleDirectionsDragEnd = (e: DragEndEvent) => {
    reorderItems(e, setDirections);
  };

  const handleNotesDragEnd = (e: DragEndEvent) => {
    reorderItems(e, setNotes);
  };

  // handle removing an item from a list
  const handleRemove = <T extends identifiable>(
    setArray: Dispatch<SetStateAction<any>>,
    id: number
  ) => {
    setArray((array: T[]) => array.filter((item) => item.id !== id));
  };

  return (
    <>
      {credential.user?.emailVerified && (
        <>
          <Box
            textAlign={"center"}
            display={"flex"}
            flexDirection={"column"}
            rowGap={3}
            mx={2}
          >
            <Typography variant="h3" my={3}>
              New Recipe
            </Typography>
            <Link href="/">Home</Link>
            <Divider />
            <Paper sx={{ p: 1 }}>
              <Stack rowGap={2}>
                <Paper sx={{ p: 1 }} elevation={3}>
                  <TextField
                    InputProps={{ style: { fontSize: "1.5em" } }}
                    onChange={(e) => setRecipeName(e.target.value)}
                    id="title-field"
                    label="Recipe Title"
                    variant="standard"
                    fullWidth
                    required
                  />
                </Paper>

                <Paper sx={{ p: 1 }} elevation={3}>
                  <TextField
                    onChange={(e) => setDescription(e.target.value)}
                    id="description-field"
                    label="Optional description"
                    variant="standard"
                    multiline
                    fullWidth
                  ></TextField>
                </Paper>
                <Stack direction={"row"} spacing={2}>
                  <Paper sx={{ p: 1, width: "100%" }} elevation={3}>
                    <TextField
                      onChange={(e) => setServings(e.target.value)}
                      id="servings-field"
                      label="Servings"
                      variant="standard"
                      fullWidth
                      type="number"
                      inputProps={{
                        min: 1,
                        max: 100,
                        step: 1,
                      }}
                    />
                  </Paper>
                  <Paper sx={{ p: 1, width: "100%" }} elevation={3}>
                    <TextField
                      onChange={(e) => setCookTime(e.target.value)}
                      id="cook-time-field"
                      label="Cook time"
                      variant="standard"
                      type="number"
                      fullWidth
                      inputProps={{
                        min: 1,
                        max: 100,
                        step: 1,
                      }}
                    />
                  </Paper>
                </Stack>
              </Stack>
            </Paper>
            <Divider />
            <Paper>
              <Typography variant="h4">Ingredients</Typography>
              <DndContext
                modifiers={[restrictToParentElement]}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleIngredientsDragEnd}
              >
                <SortableContext
                  items={ingredients}
                  strategy={verticalListSortingStrategy}
                >
                  {" "}
                  <Stack rowGap={1}>
                    {ingredients.map((ingredient) => (
                      <SortableItem
                        key={ingredient.id}
                        id={ingredient.id}
                        onRemove={() =>
                          handleRemove(setIngredients, ingredient.id)
                        }
                        removable={ingredients.length > 1}
                      />
                    ))}
                  </Stack>
                </SortableContext>
              </DndContext>
              <IconButton sx={{ m: "auto" }} onClick={handleAddIngredient}>
                <AddCircleIcon />
              </IconButton>
            </Paper>
            <Divider>Directions</Divider>
            <DndContext
              modifiers={[restrictToParentElement]}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDirectionsDragEnd}
            >
              <SortableContext
                items={directions}
                strategy={verticalListSortingStrategy}
              >
                {directions.map((direction, index) => (
                  <SortableItem
                    key={direction.id}
                    id={direction.id}
                    index={index}
                    onRemove={() => handleRemove(setDirections, direction.id)}
                    label
                    multiline
                    removable={directions.length > 1}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <IconButton sx={{ m: "auto" }} onClick={handleAddDirection}>
              <AddCircleIcon />
            </IconButton>
            <Divider>Notes</Divider>
            <DndContext
              modifiers={[restrictToParentElement]}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleNotesDragEnd}
            >
              <SortableContext
                items={notes}
                strategy={verticalListSortingStrategy}
              >
                {notes.map((note) => (
                  <SortableItem
                    key={note.id}
                    id={note.id}
                    onRemove={() => handleRemove(setNotes, note.id)}
                    removable
                  />
                ))}
              </SortableContext>
            </DndContext>
            <IconButton sx={{ m: "auto" }} onClick={handleAddNote}>
              <AddCircleIcon />
            </IconButton>
            <Paper>
              <Typography variant="h5" my={2}>
                Image URL
              </Typography>
              <Paper sx={{ p: 1, mx: 1 }} elevation={3}>
                <TextField
                  onChange={(e) => setImageUrl(e.target.value)}
                  id="imageURL-field"
                  type="url"
                  label="Optional URL"
                  variant="standard"
                  fullWidth
                ></TextField>
              </Paper>
            </Paper>
          </Box>
        </>
      )}
    </>
  );
}
