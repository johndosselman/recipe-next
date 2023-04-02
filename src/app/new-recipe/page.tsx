"use client";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import AddRecipe from "@/firestore/addRecipe";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
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
  MeasuringStrategy,
} from "@dnd-kit/core";
import Container from "@mui/material/Container";
import {
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import NonSSRWrapper from "../components/nonSSRWrapper";
import Divider from "@mui/material/Divider";

export default function Page() {
  const ingredientList = [
    { id: 10, ingredient: "steak" },
    { id: 11, ingredient: "salmon" },
    { id: 12, ingredient: "egg" },
  ];

  const directionsList = [
    { id: 0, text: "" },
    { id: 1, text: "" },
  ];

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const credential = useContext(AuthContext);
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState(ingredientList);
  const [directions, setDirections] = useState(directionsList);
  const [directionId, setDirectionId] = useState<number>(10);
  useEffect(() => {
    if (credential.user === null || !credential.user.emailVerified) {
      router.push("/");
    }
  }, [credential]);

  const handleAddDirection = () => {
    const newDirection = { id: directionId, text: "" };
    setDirections([...directions, newDirection]);
    setDirectionId(directionId + 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await AddRecipe(recipeName);
  };

  function handleDragEndIngredient(event: DragEndEvent) {
    const { active, over } = event;
    console.log(active);
    if (active.id !== over?.id) {
      setIngredients((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleDragEndDirection(event: DragEndEvent) {
    const { active, over } = event;
    console.log(active);
    if (active.id !== over?.id) {
      setDirections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleRemoveDirection(id: number) {
    setDirections((direction) =>
      directions.filter((direction) => direction.id !== id)
    );
  }

  return (
    <>
      {credential.user?.emailVerified && (
        <>
          <Typography variant="h1">New Recipe</Typography>
          <Link href="/">Home</Link>

          <Stepper orientation="vertical" activeStep={activeStep} nonLinear>
            <Step key={0} onClick={() => setActiveStep(0)}>
              <StepLabel>
                <Divider>Recipe Title</Divider>
              </StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <TextField
                  onChange={(e) => setRecipeName(e.target.value)}
                  id="title-field"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                ></TextField>
              </StepContent>
            </Step>
            <Step key={1} onClick={() => setActiveStep(1)}>
              <StepLabel>
                <Divider>Recipe Description</Divider>
              </StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  id="description-field"
                  label="Description (Optional)"
                  variant="outlined"
                  multiline
                  fullWidth
                ></TextField>
              </StepContent>
            </Step>
            <Step key={2} onClick={() => setActiveStep(2)}>
              <StepLabel>
                <Divider>Ingredients</Divider>
              </StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <DndContext
                  modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndIngredient}
                >
                  <SortableContext
                    items={ingredients}
                    strategy={verticalListSortingStrategy}
                  >
                    {ingredients.map((ingredient) => (
                      <SortableItem key={ingredient.id} id={ingredient.id} />
                    ))}
                  </SortableContext>
                </DndContext>
              </StepContent>
            </Step>
            <Step key={3} onClick={() => setActiveStep(3)}>
              <StepLabel>
                <Divider>Directions</Divider>
              </StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <DndContext
                  modifiers={[restrictToVerticalAxis, restrictToParentElement]}
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndDirection}
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
                        onRemove={() => handleRemoveDirection(direction.id)}
                        label
                        last={index === directions.length - 1}
                      />
                    ))}
                  </SortableContext>
                </DndContext>

                <IconButton onClick={handleAddDirection}>
                  <AddCircleIcon />
                </IconButton>
              </StepContent>
            </Step>
          </Stepper>
        </>
      )}
    </>
  );
}
