import "./quizz.scss";
import "../../shared/custom-elements/pc-window/pc-window";
import { RoverXpDog } from "./elements/rover-xp-dog/rover-xp-dog";

/* Exports to access elements inside html */
(window as any).RoverXpDog = new RoverXpDog("background-wrapper");
