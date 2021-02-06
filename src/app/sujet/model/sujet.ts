import { TimeStamp } from "src/app/models/timeStamp";

export class PaginationMeta{
  currentPage: number
  itemsPerPage: number
  totalPages: number

}


export class Sujets extends PaginationMeta{
  items: Sujet[]
}


export class Sujet extends TimeStamp{

  id: number;
  titre: string;
  dateLimiteDepot: Date;
  description: string;
  rapportPfe:RapportPfe;
  fichePropositionPfe: FicheProposition;
  //don't get confused by the name (affirmation or affectation is the same thing)
  lettreAffectationPfe : LettreAffirmation;
  etudiant : Student;
  encadrant: Encadrant;
  approved:boolean;

}

class Encadrant extends TimeStamp {
  id: number;
  userDetails: UserDetails;
}

class Student extends TimeStamp {
  id: number;
  cin: number;
  idEtudiant: number;
  filiere: string;
  userDetails: UserDetails;
}

export class UserDetails{
  nom: string
  prenom: string
  email: string;
  filiere : string;
}
export class RapportPfe extends TimeStamp{
  id: number;
  path: string;
}

export class FicheProposition extends TimeStamp{
  id: number;
  path: string;
}

export class LettreAffirmation extends TimeStamp{
  id: number;
  path: string;
}

