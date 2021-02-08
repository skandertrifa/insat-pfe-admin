import { Sujet } from './../soutenance/models/soutenance';
import { Enseignant } from './enseignant';
export class event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  student: string; //nom + prenom
  filiere: string;
  salle: any;
  jury: any;
  sujet: any;
  color? =  '#ad2121';
  draggable? = false;
}
