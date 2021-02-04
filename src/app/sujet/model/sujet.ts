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
  etudiant : Student;

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



