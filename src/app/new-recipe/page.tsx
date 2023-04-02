"use client";
import { AuthContext } from "@/context/AuthContext";
import { db } from "@/firebase/config";
import AddRecipe from "@/firestore/addRecipe";

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
import NonSSRWrapper from "../components/nonSSRWrapper";
import Container from "@mui/material/Container";

export default function Page() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);
  const credential = useContext(AuthContext);
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState(["one", "two", "three"]);

  useEffect(() => {
    if (credential.user === null || !credential.user.emailVerified) {
      router.push("/");
    }
  }, [credential]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await AddRecipe(recipeName);
  };

  function handleDragEnd(event: DragEndEvent) {
    console.log("drag end called");
  }

  return (
    <>
      {credential.user?.emailVerified && (
        <>
          <h1>New Recipe</h1>
          <Link href="/">Home</Link>

          <Stepper orientation="vertical" activeStep={activeStep} nonLinear>
            <Step key={0} onClick={() => setActiveStep(0)}>
              <StepLabel>Recipe Title</StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <TextField
                  onChange={(e) => setRecipeName(e.target.value)}
                  id="recipe-name-field"
                  label="Recipe Name"
                  variant="outlined"
                  required
                ></TextField>
              </StepContent>
            </Step>
            <Step key={1} onClick={() => setActiveStep(1)}>
              <StepLabel>Description</StepLabel>
              <StepContent TransitionProps={{ unmountOnExit: false }}>
                <TextField
                  onChange={(e) => setDescription(e.target.value)}
                  id="description-field"
                  label="Description (Optional)"
                  variant="outlined"
                  multiline
                ></TextField>
              </StepContent>
            </Step>
            <Step key={2} onClick={() => setActiveStep(2)}>
              <StepLabel>Ingredients</StepLabel>
              <StepContent
                TransitionProps={{ unmountOnExit: false }}
              ></StepContent>
            </Step>
          </Stepper>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <Container
              style={{
                backgroundColor: "blue",
                width: "50%",
                margin: "auto",
              }}
            >
              <SortableContext
                items={ingredients}
                strategy={verticalListSortingStrategy}
              >
                {ingredients.map((ingredient) => (
                  <SortableItem key={ingredient} id={ingredient} />
                ))}
              </SortableContext>
            </Container>
          </DndContext>
        </>
      )}
    </>
  );
}
