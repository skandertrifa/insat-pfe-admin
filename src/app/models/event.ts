import { Sujet } from './../soutenance/models/soutenance';
import { Enseignant } from './enseignant';
export class event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  student: string; //nom + prenom
  filiere: string;
  salle: number;
  jury: any;
  sujet: Sujet;
  color? =  '#ad2121';
  draggable? = false;
}
